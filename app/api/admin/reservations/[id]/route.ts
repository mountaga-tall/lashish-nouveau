import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDatabase } from "../../../../../lib/db";
import { apiMessage } from "../../../../../lib/server-locale";

const STATUSES = new Set(["pending", "confirmed", "cancelled", "completed"]);

function isAuthorized(request: Request) {
  try {
    const token = String(getCloudflareContext().env.LA_SHISH_ADMIN_TOKEN || "").trim();
    return Boolean(token) && request.headers.get("authorization") === "Bearer " + token;
  } catch {
    return false;
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthorized(request)) {
    return Response.json({ error: apiMessage(request, "adminUnauthorized") }, { status: 401 });
  }

  const { id } = await params;
  if (!/^RSV-[A-Z0-9]{12}$/.test(id)) {
    return Response.json({ error: apiMessage(request, "invalidReservation") }, { status: 400 });
  }

  const body = await request.json().catch(() => null) as { status?: string } | null;
  const status = typeof body?.status === "string" ? body.status.trim().toLowerCase() : "";
  if (!STATUSES.has(status)) {
    return Response.json({ error: apiMessage(request, "statusInvalid") }, { status: 400 });
  }

  const db = getDatabase();
  if (!db) return Response.json({ error: apiMessage(request, "dbReservation") }, { status: 503 });

  try {
    const result = await db.prepare(
      "UPDATE reservations SET status=? WHERE id=? AND status<>?"
    ).bind(status, id, status).run();

    if (!result.meta?.changes) {
      const existing = await db.prepare("SELECT id,status FROM reservations WHERE id=? LIMIT 1").bind(id).first();
      if (!existing) return Response.json({ error: apiMessage(request, "orderMissing") }, { status: 404 });
    }

    return Response.json({ ok: true, reservationId: id, status });
  } catch {
    return Response.json({ error: apiMessage(request, "reservationPersistence") }, { status: 503 });
  }
}
