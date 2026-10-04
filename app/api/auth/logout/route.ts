import { getDatabase } from "../../../../lib/db";
import { clearSessionCookie, deleteCurrentSession } from "../../../../lib/auth";

export async function POST(request: Request) {
  const db = getDatabase();
  if (db) await deleteCurrentSession(db, request).catch(() => undefined);
  return Response.json({ ok: true }, { headers: { "Set-Cookie": clearSessionCookie() } });
}
