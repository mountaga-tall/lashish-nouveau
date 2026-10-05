import { apiMessage } from "../../../lib/server-locale";
import { getDatabase } from "../../../lib/db";
import { getAuthUser } from "../../../lib/auth";

const ALLOWED_FULFILLMENT = new Set(["pickup", "onsite", "delivery"]);
const LOCALES = new Set(["fr", "en", "ar"]);

function cleanText(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function buildOrderId() {
  return "LS-" + crypto.randomUUID().replace(/-/g, "").slice(0, 12).toUpperCase();
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as {
    customerName?: string;
    customerPhone?: string;
    fulfillmentType?: string;
    address?: string;
    notes?: string;
    locale?: string;
    clientOrderId?: string;
    items?: Array<{ id: number; quantity: number }>;
  } | null;

  const customerName = cleanText(body?.customerName, 80);
  const customerPhone = cleanText(body?.customerPhone, 30);
  const fulfillmentType = cleanText(body?.fulfillmentType, 20);
  const address = cleanText(body?.address, 300);
  const notes = cleanText(body?.notes, 1000);
  const locale = LOCALES.has(body?.locale || "") ? body!.locale! : "fr";
  const requestedId = /^LS-[A-Z0-9]{12}$/.test(body?.clientOrderId || "") ? body!.clientOrderId! : buildOrderId();

  if (
    customerName.length < 2 ||
    customerPhone.length < 6 ||
    !ALLOWED_FULFILLMENT.has(fulfillmentType) ||
    (fulfillmentType === "delivery" && address.length < 5) ||
    !Array.isArray(body?.items) ||
    body.items.length === 0 ||
    body.items.length > 50
  ) {
    return Response.json({ error: apiMessage(request, "incompleteOrder") }, { status: 400 });
  }

  const db = getDatabase();
  if (!db) return Response.json({ persisted: false, orderId: requestedId, message: apiMessage(request, "dbOrder") }, { status: 503 });

  try {
    const existing = await db.prepare(
      "SELECT id,status,total,fulfillment_type,created_at,updated_at FROM orders WHERE id=? LIMIT 1"
    ).bind(requestedId).first() as { id: string; status: string; total: number; fulfillment_type: string; created_at: string; updated_at: string } | null;

    if (existing) {
      return Response.json({
        persisted: true,
        duplicate: true,
        orderId: existing.id,
        total: existing.total,
        status: existing.status,
        trackingUrl: new URL("/" + locale + "/commande/suivi/" + encodeURIComponent(existing.id), request.url).toString(),
      });
    }

    const user = await getAuthUser(db, request);
    const ids = [...new Set(body.items.map((item) => Number(item.id)).filter(Number.isInteger))];
    if (!ids.length) return Response.json({ error: apiMessage(request, "invalidItems") }, { status: 400 });

    const placeholders = ids.map(() => "?").join(",");
    const result = await db.prepare(
      "SELECT id, name, price, available FROM products WHERE id IN (" + placeholders + ")"
    ).bind(...ids).all();

    const products = result.results as Array<{ id: number; name: string; price: number | null; available: number }>;
    const byId = new Map(products.map((product) => [Number(product.id), product]));
    let total = 0;

    const normalized = body.items.map((item) => {
      const p = byId.get(Number(item.id));
      const quantity = Math.max(1, Math.min(50, Math.floor(Number(item.quantity))));
      if (!p || !p.available || typeof p.price !== "number" || !Number.isFinite(quantity)) return null;
      total += p.price * quantity;
      return { productId: p.id, name: p.name, price: p.price, quantity };
    }).filter(Boolean) as Array<{ productId: number; name: string; price: number; quantity: number }>;

    if (!normalized.length || !Number.isSafeInteger(total) || total <= 0) {
      return Response.json({ error: apiMessage(request, "noneAvailable") }, { status: 400 });
    }

    const id = requestedId;
    const statements = [
      db.prepare(
        "INSERT INTO orders (id,user_id,status,channel,fulfillment_type,total,customer_name,customer_phone,delivery_address,notes) VALUES (?,?,?,?,?,?,?,?,?,?)"
      ).bind(
        id,
        user?.id ?? null,
        "received",
        "web",
        fulfillmentType,
        total,
        customerName,
        customerPhone,
        fulfillmentType === "delivery" ? address : null,
        notes || null
      ),
      ...normalized.map((item) =>
        db.prepare(
          "INSERT INTO order_items (order_id,product_id,name_snapshot,unit_price,quantity) VALUES (?,?,?,?,?)"
        ).bind(id, item.productId, item.name, item.price, item.quantity)
      ),
    ];

    await db.batch(statements);

    return Response.json({
      persisted: true,
      orderId: id,
      total,
      status: "received",
      userId: user?.id ?? null,
      trackingUrl: new URL("/" + locale + "/commande/suivi/" + encodeURIComponent(id), request.url).toString(),
    });
  } catch {
    return Response.json({ persisted: false, orderId: requestedId, error: apiMessage(request, "orderPersistence") }, { status: 503 });
  }
}
