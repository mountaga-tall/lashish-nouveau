import { getDatabase } from "../../../../lib/db";
import { validPhone, validEmail, domainHasMailRecords } from "../../../../lib/contact-validation";
import { apiMessage } from "../../../../lib/server-locale";
import { createSession, hashPassword, normalizeEmail, normalizePhone, sessionCookie, validatePassword } from "../../../../lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    emailConfirm?: string;
    phoneCountry?: string;
  } | null;

  const name = body?.name?.trim() ?? "";
  const email = normalizeEmail(body?.email);
  const emailConfirm = normalizeEmail(body?.emailConfirm);
  const phoneCountry = (body?.phoneCountry || "CI").toUpperCase();
  const phoneE164 = body?.phone ? validPhone(body.phone, phoneCountry) : null;
  const phone = normalizePhone(phoneE164, phoneCountry);

  if (name.length < 2 || name.length > 80) return Response.json({ error: apiMessage(request,"nameInvalid") }, { status: 400 });
  if (!email && !phone) return Response.json({ error: apiMessage(request,"contactRequired") }, { status: 400 });
  if (email && !validEmail(email)) return Response.json({ error: apiMessage(request,"emailInvalid") }, { status: 400 });
  if (email && emailConfirm !== email) return Response.json({ error: apiMessage(request,"emailConfirm") }, { status: 400 });
  if (email && !(await domainHasMailRecords(email))) return Response.json({ error: apiMessage(request,"emailDomain") }, { status: 400 });
  if (body?.phone && !phoneE164) return Response.json({ error: apiMessage(request,"phoneFormat") }, { status: 400 });
  if (!validatePassword(body?.password)) return Response.json({ error: apiMessage(request,"passwordInvalid") }, { status: 400 });

  const db = getDatabase();
  if (!db) return Response.json({ error: apiMessage(request,"dbAccount") }, { status: 503 });

  const existing = email
    ? await db.prepare("SELECT id FROM users WHERE email=? LIMIT 1").bind(email).first()
    : null;
  const existingPhone = phone
    ? await db.prepare("SELECT id FROM users WHERE phone=? LIMIT 1").bind(phone).first()
    : null;

  if (existing || existingPhone) {
    return Response.json({ error: apiMessage(request,"accountExists") }, { status: 409 });
  }

  const { salt, hash } = await hashPassword(body!.password!);
  const userId = "CUS-" + crypto.randomUUID().slice(0, 12).toUpperCase();

  await db.batch([
    db.prepare("INSERT INTO users (id,email,phone,display_name) VALUES (?,?,?,?)")
      .bind(userId, email, phone, name),
    db.prepare("INSERT INTO user_credentials (user_id,password_hash,password_salt) VALUES (?,?,?)")
      .bind(userId, hash, salt),
    db.prepare("INSERT INTO loyalty_accounts (user_id,points,lifetime_points) VALUES (?,0,0)")
      .bind(userId),
  ]);

  const token = await createSession(db, userId);
  return Response.json(
    { ok: true, user: { id: userId, email, phone, display_name: name } },
    { headers: { "Set-Cookie": sessionCookie(token, request) } }
  );
}
