import { getDatabase } from "../../../../lib/db";
import { getAuthUser } from "../../../../lib/auth";

export async function GET(request: Request) {
  const db = getDatabase();
  if (!db) return Response.json({ user: null, configured: false });
  const user = await getAuthUser(db, request);
  return Response.json({ user: user ?? null, configured: true });
}
