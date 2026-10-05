import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDatabase } from "../../../../lib/db";
import { apiMessage } from "../../../../lib/server-locale";

function isAuthorized(request: Request) {
  try {
    const token = String(getCloudflareContext().env.LA_SHISH_ADMIN_TOKEN || "").trim();
    return Boolean(token) && request.headers.get("authorization") === "Bearer " + token;
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: apiMessage(request, "adminUnauthorized") }, { status: 401 });
  }

  const limitValue = Number(new URL(request.url).searchParams.get("limit") || 50);
  const limit = Math.max(1, Math.min(100, Number.isFinite(limitValue) ? Math.floor(limitValue) : 50));
  const db = getDatabase();
  if (!db) return Response.json({ error: apiMessage(request, "dbOrder") }, { status: 503 });

  try {
    const result = await db.prepare(
      "SELECT id,status,total,fulfillment_type,customer_name,customer_phone,delivery_address,notes,created_at,updated_at FROM orders ORDER BY created_at DESC LIMIT ?"
    ).bind(limit).all();
    return Response.json({ orders: result.results });
  } catch {
    return Response.json({ error: apiMessage(request, "orderPersistence") }, { status: 503 });
  }
}
