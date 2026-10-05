import { getDatabase } from "../../../lib/db";
import { getAuthUser } from "../../../lib/auth";

export async function GET(request: Request) {
  const db = getDatabase();
  if (!db) return Response.json({ error: "Base de données non configurée." }, { status: 503 });

  const user = await getAuthUser(db, request);
  if (!user) return Response.json({ user: null });

  const [orders, reservations, loyalty, orderItems] = await Promise.all([
    db.prepare(
      "SELECT id,status,total,fulfillment_type,created_at,updated_at FROM orders WHERE user_id=? ORDER BY created_at DESC LIMIT 20"
    ).bind(user.id).all(),
    db.prepare(
      "SELECT id,status,reservation_date,reservation_time,party_size,notes,created_at FROM reservations WHERE user_id=? ORDER BY reservation_date DESC,reservation_time DESC LIMIT 20"
    ).bind(user.id).all(),
    db.prepare("SELECT points,lifetime_points,updated_at FROM loyalty_accounts WHERE user_id=? LIMIT 1").bind(user.id).first(),
    db.prepare(
      "SELECT oi.order_id,oi.product_id,oi.name_snapshot,oi.unit_price,oi.quantity,oi.options_json FROM order_items oi JOIN orders o ON o.id=oi.order_id WHERE o.user_id=? AND o.id IN (SELECT id FROM orders WHERE user_id=? ORDER BY created_at DESC LIMIT 20) ORDER BY o.created_at DESC,oi.id ASC"
    ).bind(user.id, user.id).all(),
  ]);

  const grouped = new Map<string, Array<{
    product_id: number;
    name_snapshot: string;
    unit_price: number;
    quantity: number;
    options: string[];
  }>>();

  for (const raw of orderItems.results as Array<{
    order_id: string;
    product_id: number;
    name_snapshot: string;
    unit_price: number;
    quantity: number;
    options_json: string | null;
  }>) {
    let options: string[] = [];
    try {
      const parsed = raw.options_json ? JSON.parse(raw.options_json) : [];
      if (Array.isArray(parsed)) options = parsed.filter((value): value is string => typeof value === "string");
    } catch {
      options = [];
    }
    const current = grouped.get(raw.order_id) || [];
    current.push({
      product_id: Number(raw.product_id),
      name_snapshot: raw.name_snapshot,
      unit_price: Number(raw.unit_price),
      quantity: Number(raw.quantity),
      options,
    });
    grouped.set(raw.order_id, current);
  }

  return Response.json({
    user,
    orders: orders.results.map((order) => ({ ...order, items: grouped.get(String((order as { id: string }).id)) || [] })),
    reservations: reservations.results,
    loyalty: loyalty ?? { points: 0, lifetime_points: 0 },
  });
}
