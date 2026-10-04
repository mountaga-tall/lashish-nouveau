import { getDatabase } from "../../../lib/db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as {
    userId?: string; customerName?: string; customerPhone?: string; fulfillmentType?: string; address?: string; notes?: string;
    items?: Array<{ id: number; quantity: number }>;
  } | null;
  if (!body?.customerName || !body.customerPhone || !Array.isArray(body.items) || body.items.length === 0) {
    return Response.json({ error: "Informations de commande incomplètes." }, { status: 400 });
  }
  const db = getDatabase();
  if (!db) return Response.json({ persisted: false, message: "Commande prête pour WhatsApp." });

  const ids = [...new Set(body.items.map((item) => Number(item.id)).filter(Number.isInteger))];
  const placeholders = ids.map(() => "?").join(",");
  const result = await db.prepare("SELECT id, name, price, available FROM products WHERE id IN (" + placeholders + ")").bind(...ids).all();
  const products = result.results as Array<{ id: number; name: string; price: number | null; available: number }>;
  const byId = new Map(products.map((product) => [Number(product.id), product]));
  let total = 0;
  const normalized = body.items.map((item) => {
    const p = byId.get(Number(item.id));
    const quantity = Math.max(1, Math.min(50, Math.floor(Number(item.quantity))));
    if (!p || !p.available || typeof p.price !== "number") return null;
    total += p.price * quantity;
    return { productId: p.id, name: p.name, price: p.price, quantity };
  }).filter(Boolean) as Array<{ productId: number; name: string; price: number; quantity: number }>;
  if (!normalized.length) return Response.json({ error: "Aucun article disponible." }, { status: 400 });

  const id = "LS-" + crypto.randomUUID().slice(0, 8).toUpperCase();
  const statements = [db.prepare("INSERT INTO orders (id,user_id,status,channel,fulfillment_type,total,customer_name,customer_phone,delivery_address,notes) VALUES (?,?,?,?,?,?,?,?,?,?)")
    .bind(id, body.userId ?? null, "received", "web", body.fulfillmentType ?? "pickup", total, body.customerName, body.customerPhone, body.address ?? null, body.notes ?? null),
    ...normalized.map((item) => db.prepare("INSERT INTO order_items (order_id,product_id,name_snapshot,unit_price,quantity) VALUES (?,?,?,?,?)").bind(id, item.productId, item.name, item.price, item.quantity))
  ];
  await db.batch(statements);
  return Response.json({ persisted: true, orderId: id, total, status: "received" });
}