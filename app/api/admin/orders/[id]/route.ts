import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDatabase } from "../../../../../lib/db";
import { apiMessage } from "../../../../../lib/server-locale";
import { pointsForAmount } from "../../../../../lib/loyalty";

const STATUSES = new Set(["received", "preparing", "ready", "delivering", "completed", "cancelled"]);

function isAuthorized(request: Request) {
  try {
    const token = String(getCloudflareContext().env.LA_SHISH_ADMIN_TOKEN || "").trim();
    const header = request.headers.get("authorization") || "";
    return Boolean(token) && header === "Bearer " + token;
  } catch {
    return false;
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthorized(request)) {
    return Response.json({ error: apiMessage(request, "adminUnauthorized") }, { status: 401 });
  }

  const { id } = await params;
  if (!/^LS-[A-Z0-9]{12}$/.test(id)) {
    return Response.json({ error: apiMessage(request, "invalidTracking") }, { status: 400 });
  }

  const body = await request.json().catch(() => null) as { status?: string } | null;
  const status = typeof body?.status === "string" ? body.status.trim().toLowerCase() : "";
  if (!STATUSES.has(status)) {
    return Response.json({ error: apiMessage(request, "statusInvalid") }, { status: 400 });
  }

  const db = getDatabase();
  if (!db) return Response.json({ error: apiMessage(request, "dbOrder") }, { status: 503 });

  try {
    const order = await db.prepare(
      "SELECT id,status,total,user_id,loyalty_awarded FROM orders WHERE id=? LIMIT 1"
    ).bind(id).first() as {
      id: string;
      status: string;
      total: number;
      user_id: string | null;
      loyalty_awarded: number;
    } | null;

    if (!order) return Response.json({ error: apiMessage(request, "orderMissing") }, { status: 404 });

    if (order.status === status) {
      return Response.json({ ok: true, orderId: id, status, loyaltyProcessed: Boolean(order.loyalty_awarded) });
    }

    const points = pointsForAmount(Number(order.total));
    const statements = [
      db.prepare("UPDATE orders SET status=?,updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(status, id),
    ];

    if (status === "completed" && order.user_id && !Number(order.loyalty_awarded)) {
      statements.push(
        db.prepare("INSERT OR IGNORE INTO loyalty_accounts (user_id,points,lifetime_points) VALUES (?,0,0)")
          .bind(order.user_id),
        db.prepare(
          "UPDATE loyalty_accounts SET points=points+?,lifetime_points=lifetime_points+?,updated_at=CURRENT_TIMESTAMP WHERE user_id=?"
        ).bind(points, points, order.user_id),
        db.prepare(
          "INSERT INTO loyalty_events (user_id,points,reason,reference_id) VALUES (?,?,?,?)"
        ).bind(order.user_id, points, "order_completed", id),
        db.prepare("UPDATE orders SET loyalty_awarded=1,updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(id),
      );
    }

    if (status === "cancelled" && order.user_id && Number(order.loyalty_awarded) === 1) {
      const award = await db.prepare(
        "SELECT points FROM loyalty_events WHERE user_id=? AND reference_id=? AND reason=? ORDER BY id DESC LIMIT 1"
      ).bind(order.user_id, id, "order_completed").first() as { points: number } | null;
      const awardedPoints = Math.max(0, Number(award?.points ?? points));

      statements.push(
        db.prepare(
          "UPDATE loyalty_accounts SET points=MAX(0,points-?),updated_at=CURRENT_TIMESTAMP WHERE user_id=?"
        ).bind(awardedPoints, order.user_id),
        db.prepare(
          "INSERT INTO loyalty_events (user_id,points,reason,reference_id) VALUES (?,?,?,?)"
        ).bind(order.user_id, -awardedPoints, "order_cancelled_refund", id + ":refund:" + Date.now()),
        db.prepare("UPDATE orders SET loyalty_awarded=0,updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(id),
      );
    }

    await db.batch(statements);

    return Response.json({
      ok: true,
      orderId: id,
      previousStatus: order.status,
      status,
      loyaltyPointsAwarded: status === "completed" && order.user_id && !Number(order.loyalty_awarded) ? points : 0,
    });
  } catch {
    return Response.json({ error: apiMessage(request, "orderPersistence") }, { status: 503 });
  }
}
