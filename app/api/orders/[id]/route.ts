import { getDatabase } from "../../../../lib/db";
import { apiMessage } from "../../../../lib/server-locale";

function json(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!/^LS-[A-Z0-9]{12}$/.test(id)) {
    return json({ error: apiMessage(request, "invalidTracking") }, 400);
  }

  const db = getDatabase();
  if (!db) {
    return json({ persisted: false, orderId: id, status: "received", message: apiMessage(request, "trackingCloudflare") });
  }

  try {
    const order = await db.prepare(
      "SELECT id,status,total,fulfillment_type,created_at,updated_at FROM orders WHERE id=? LIMIT 1"
    ).bind(id).first();

    if (!order) return json({ error: apiMessage(request, "orderMissing") }, 404);

    return json({ persisted: true, order });
  } catch {
    return json({ error: apiMessage(request, "trackingCloudflare") }, 503);
  }
}
