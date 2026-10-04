import { getDatabase } from "../../../../lib/db";
import { createSession, hashPassword, normalizeEmail, normalizePhone, sessionCookie, validatePassword } from "../../../../lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
  } | null;

  const name = body?.name?.trim() ?? "";
  const email = normalizeEmail(body?.email);
  const phone = normalizePhone(body?.phone);

  if (name.length < 2 || name.length > 80) return Response.json({ error: "Indiquez votre nom complet." }, { status: 400 });
  if (!email && !phone) return Response.json({ error: "Ajoutez un email ou un numéro de téléphone." }, { status: 400 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ error: "Adresse email invalide." }, { status: 400 });
  if (phone && (phone.length < 8 || phone.length > 15)) return Response.json({ error: "Numéro de téléphone invalide." }, { status: 400 });
  if (!validatePassword(body?.password)) return Response.json({ error: "Le mot de passe doit contenir entre 8 et 128 caractères." }, { status: 400 });

  const db = getDatabase();
  if (!db) return Response.json({ error: "Le compte client nécessite la base Cloudflare D1." }, { status: 503 });

  const existing = email
    ? await db.prepare("SELECT id FROM users WHERE email=? LIMIT 1").bind(email).first<{ id: string }>()
    : null;
  const existingPhone = phone
    ? await db.prepare("SELECT id FROM users WHERE phone=? LIMIT 1").bind(phone).first<{ id: string }>()
    : null;

  if (existing || existingPhone) {
    return Response.json({ error: "Un compte existe déjà avec cet email ou ce téléphone. Connectez-vous." }, { status: 409 });
  }

  const { salt, hash } = await hashPassword(body!.password!);
  const userId = "CUS-" + crypto.randomUUID().slice(0, 12).toUpperCase();

  await db.batch([
    db.prepare("INSERT INTO users (id,email,phone,display_name,password_hash,password_salt) VALUES (?,?,?,?,?,?)")
      .bind(userId, email, phone, name, hash, salt),
    db.prepare("INSERT INTO loyalty_accounts (user_id,points,lifetime_points) VALUES (?,0,0)").bind(userId),
  ]);

  const token = await createSession(db, userId);
  return Response.json(
    { ok: true, user: { id: userId, email, phone, display_name: name } },
    { headers: { "Set-Cookie": sessionCookie(token) } }
  );
}
