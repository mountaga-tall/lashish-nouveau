import { apiMessage } from "../../../lib/server-locale";
import { getDatabase } from "../../../lib/db";
import { getAuthUser } from "../../../lib/auth";

const LOCALES = new Set(["fr", "en", "ar"]);

function cleanText(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function buildReservationId() {
  return "RSV-" + crypto.randomUUID().replace(/-/g, "").slice(0, 12).toUpperCase();
}

function validDateTime(date: string, time: string) {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const timeMatch = /^(\d{2}):(\d{2})$/.exec(time);
  if (!dateMatch || !timeMatch) return false;
  const year = Number(dateMatch[1]);
  const month = Number(dateMatch[2]);
  const day = Number(dateMatch[3]);
  const hour = Number(timeMatch[1]);
  const minute = Number(timeMatch[2]);
  if (month < 1 || month > 12 || day < 1 || day > 31 || hour > 23 || minute > 59) return false;

  const selected = Date.UTC(year, month - 1, day, hour, minute);
  const reconstructed = new Date(selected);
  if (
    reconstructed.getUTCFullYear() !== year ||
    reconstructed.getUTCMonth() !== month - 1 ||
    reconstructed.getUTCDate() !== day ||
    reconstructed.getUTCHours() !== hour ||
    reconstructed.getUTCMinutes() !== minute
  ) return false;

  return selected >= Date.now();
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as {
    customerName?: string;
    customerPhone?: string;
    reservationDate?: string;
    reservationTime?: string;
    partySize?: number;
    notes?: string;
    locale?: string;
    clientReservationId?: string;
  } | null;

  const customerName = cleanText(body?.customerName, 80);
  const customerPhone = cleanText(body?.customerPhone, 30);
  const reservationDate = cleanText(body?.reservationDate, 10);
  const reservationTime = cleanText(body?.reservationTime, 5);
  const notes = cleanText(body?.notes, 1000);
  const partySize = Math.max(1, Math.min(50, Math.floor(Number(body?.partySize ?? 2))));
  const locale = LOCALES.has(body?.locale || "") ? body!.locale! : "fr";
  const requestedId = /^RSV-[A-Z0-9]{12}$/.test(body?.clientReservationId || "") ? body!.clientReservationId! : buildReservationId();

  if (
    customerName.length < 2 ||
    customerPhone.length < 6 ||
    !validDateTime(reservationDate, reservationTime) ||
    !Number.isFinite(partySize) ||
    partySize < 1
  ) {
    return Response.json({ error: apiMessage(request, "invalidReservation") }, { status: 400 });
  }

  const db = getDatabase();
  if (!db) {
    return Response.json({ persisted: false, reservationId: requestedId, message: apiMessage(request, "dbReservation") }, { status: 503 });
  }

  try {
    const existing = await db.prepare(
      "SELECT id,status,reservation_date,reservation_time,party_size,created_at FROM reservations WHERE id=? LIMIT 1"
    ).bind(requestedId).first();

    if (existing) {
      return Response.json({ persisted: true, duplicate: true, reservationId: requestedId, reservation: existing });
    }

    const user = await getAuthUser(db, request);

    await db.prepare(
      "INSERT INTO reservations (id,user_id,customer_name,customer_phone,reservation_date,reservation_time,party_size,status,notes) VALUES (?,?,?,?,?,?,?,?,?)"
    ).bind(
      requestedId,
      user?.id ?? null,
      customerName,
      customerPhone,
      reservationDate,
      reservationTime,
      partySize,
      "pending",
      notes || null
    ).run();

    return Response.json({
      persisted: true,
      reservationId: requestedId,
      status: "pending",
      userId: user?.id ?? null,
    });
  } catch {
    return Response.json({ persisted: false, reservationId: requestedId, error: apiMessage(request, "reservationPersistence") }, { status: 503 });
  }
}
