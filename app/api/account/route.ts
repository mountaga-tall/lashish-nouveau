import { getDatabase } from "../../../lib/db";
import { getAuthUser } from "../../../lib/auth";

export async function GET(request: Request) {
  const db = getDatabase();
  if (!db) return Response.json({ error: "Base de données non configurée." }, { status: 503 });

  const user = await getAuthUser(db, request);
  if (!user) return Response.json({ user: null });

  const [orders, reservations, loyalty] = await Promise.all([
    db.prepare(
      "SELECT id,status,total,fulfillment_type,created_at,updated_at FROM orders WHERE user_id=? ORDER BY created_at DESC LIMIT 20"
    ).bind(user.id).all(),
    db.prepare(
      "SELECT id,status,reservation_date,reservation_time,party_size,notes,created_at FROM reservations WHERE user_id=? ORDER BY reservation_date DESC,reservation_time DESC LIMIT 20"
    ).bind(user.id).all(),
    db.prepare("SELECT points,lifetime_points,updated_at FROM loyalty_accounts WHERE user_id=? LIMIT 1").bind(user.id).first(),
  ]);

  return Response.json({
    user,
    orders: orders.results,
    reservations: reservations.results,
    loyalty: loyalty ?? { points: 0, lifetime_points: 0 },
  });
}
