import { getDatabase } from "../../../../lib/db";
import { createSession, sessionCookie, verifyPassword, normalizeEmail, normalizePhone } from "../../../../lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { identifier?: string; password?: string } | null;
  const identifier = body?.identifier?.trim() ?? "";
  const password = body?.password ?? "";

  if (!identifier || !password) return Response.json({ error: "Identifiant et mot de passe requis." }, { status: 400 });

  const db = getDatabase();
  if (!db) return Response.json({ error: "Le compte client nécessite la base Cloudflare D1." }, { status: 503 });

  const email = normalizeEmail(identifier);
  const phone = normalizePhone(identifier);
  const user = await db.prepare(
    "SELECT u.id,u.email,u.phone,u.display_name,c.password_hash,c.password_salt FROM users u JOIN user_credentials c ON c.user_id=u.id WHERE (u.email=? OR u.phone=?) LIMIT 1"
  ).bind(email, phone).first() as {
    id: string;
    email: string | null;
    phone: string | null;
    display_name: string | null;
    password_hash: string | null;
    password_salt: string | null;
  } | null;

  if (!user?.password_hash || !user.password_salt || !(await verifyPassword(password, user.password_salt, user.password_hash))) {
    return Response.json({ error: "Identifiants incorrects." }, { status: 401 });
  }

  const token = await createSession(db, user.id);
  return Response.json(
    { ok: true, user: { id: user.id, email: user.email, phone: user.phone, display_name: user.display_name } },
    { headers: { "Set-Cookie": sessionCookie(token, request) } }
  );
}
