import { getDatabase } from "../../../lib/db";
import { getAuthUser } from "../../../lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as {
    customerName?: string;
    customerPhone?: string;
    reservationDate?: string;
    reservationTime?: string;
    partySize?: number;
    notes?: string;
  } | null;

  if (!body?.customerName || !body.customerPhone || !body.reservationDate || !body.reservationTime) {
    return Response.json({ error: "Informations de réservation incomplètes." }, { status: 400 });
  }

  const db = getDatabase();
  if (!db) return Response.json({ persisted: false, message: "Demande prête pour WhatsApp." });

  const user = await getAuthUser(db, request);
  const id = "RSV-" + crypto.randomUUID().slice(0, 8).toUpperCase();
  const partySize = Math.max(1, Math.min(50, Math.floor(Number(body.partySize ?? 2))));

  await db.prepare(
    "INSERT INTO reservations (id,user_id,customer_name,customer_phone,reservation_date,reservation_time,party_size,status,notes) VALUES (?,?,?,?,?,?,?,?,?)"
  ).bind(
    id,
    user?.id ?? null,
    body.customerName,
    body.customerPhone,
    body.reservationDate,
    body.reservationTime,
    partySize,
    "pending",
    body.notes ?? null
  ).run();

  return Response.json({ persisted: true, reservationId: id, status: "pending", userId: user?.id ?? null });
}