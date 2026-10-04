import { getDatabase } from "../../../lib/db";

export async function GET() {
  const db = getDatabase();
  if (!db) return Response.json({ ok: true, runtime: "nextjs", database: "not-configured" });
  try {
    const row = await db.prepare("SELECT 1 AS ok").first<{ ok: number }>();
    return Response.json({ ok: row?.ok === 1, runtime: "cloudflare-workers", database: "connected" });
  } catch {
    return Response.json({ ok: false, runtime: "cloudflare-workers", database: "error" }, { status: 503 });
  }
}