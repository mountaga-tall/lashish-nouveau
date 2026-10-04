import { apiMessage } from "../../../../lib/server-locale";
import { getDatabase } from "../../../../lib/db";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDatabase();
  if (!db) return Response.json({ persisted: false, orderId: id, status: "received", message: apiMessage(_,"trackingCloudflare") });
  const order = await db.prepare("SELECT id,status,total,fulfillment_type,created_at,updated_at FROM orders WHERE id = ?").bind(id).first();
  if (!order) return Response.json({ error: apiMessage(_,"orderMissing") }, { status: 404 });
  const items = await db.prepare("SELECT name_snapshot,unit_price,quantity FROM order_items WHERE order_id = ? ORDER BY id").bind(id).all();
  return Response.json({ persisted: true, order, items: items.results });
}