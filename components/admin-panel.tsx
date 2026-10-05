"use client";

import { useCallback, useEffect, useState } from "react";

type Order = {
  id: string;
  status: string;
  total: number;
  fulfillment_type: string;
  customer_name: string | null;
  customer_phone: string | null;
  delivery_address: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

type Reservation = {
  id: string;
  status: string;
  customer_name: string;
  customer_phone: string;
  reservation_date: string;
  reservation_time: string;
  party_size: number;
  notes: string | null;
  created_at: string;
};

const orderStatuses = ["received", "preparing", "ready", "delivering", "completed", "cancelled"];
const reservationStatuses = ["pending", "confirmed", "completed", "cancelled"];

const labels: Record<string, string> = {
  received: "Reçue",
  preparing: "En préparation",
  ready: "Prête",
  delivering: "En livraison",
  completed: "Terminée",
  cancelled: "Annulée",
  pending: "En attente",
  confirmed: "Confirmée",
};

export default function AdminPanel() {
  const [token, setToken] = useState("");
  const [connected, setConnected] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const api = useCallback(async (url: string, init?: RequestInit) => {
    const response = await fetch(url, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok) throw new Error(payload?.error || "Erreur.");
    return payload;
  }, [token]);

  const refresh = useCallback(async () => {
    if (!token) return;
    setBusy(true);
    setError("");
    try {
      const [orderData, reservationData] = await Promise.all([
        api("/api/admin/orders?limit=50"),
        api("/api/admin/reservations?limit=50"),
      ]);
      setOrders(orderData.orders || []);
      setReservations(reservationData.reservations || []);
      setConnected(true);
    } catch (e) {
      setConnected(false);
      setError(e instanceof Error ? e.message : "Impossible de charger.");
    } finally {
      setBusy(false);
    }
  }, [api, token]);

  useEffect(() => {
    if (connected) void refresh();
  }, [connected, refresh]);

  const updateOrder = async (id: string, status: string) => {
    setBusy(true);
    setError("");
    try {
      await api("/api/admin/orders/" + encodeURIComponent(id), {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Impossible de modifier la commande.");
      setBusy(false);
    }
  };

  const updateReservation = async (id: string, status: string) => {
    setBusy(true);
    setError("");
    try {
      await api("/api/admin/reservations/" + encodeURIComponent(id), {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Impossible de modifier la réservation.");
      setBusy(false);
    }
  };

  if (!connected) {
    return (
      <section className="mt-10 max-w-2xl rounded-[2rem] border border-black/10 bg-white/70 p-6 sm:p-10">
        <p className="text-xs font-black uppercase tracking-[.25em] text-[#b68a42]">Accès sécurisé</p>
        <h2 className="mt-3 text-3xl font-black">Gestion LA SHISH</h2>
        <p className="mt-4 text-sm leading-7 text-black/55">
          Entre le jeton administrateur Cloudflare. Il reste uniquement en mémoire dans cette page et n’est pas enregistré dans le navigateur.
        </p>
        <label className="mt-6 block text-sm font-bold">
          Jeton
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            autoComplete="off"
            className="mt-2 min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]"
          />
        </label>
        {error ? <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700" role="alert">{error}</p> : null}
        <button
          type="button"
          disabled={!token || busy}
          onClick={() => void refresh()}
          className="mt-6 min-h-12 rounded-full bg-[#11100e] px-6 py-3 text-sm font-black text-white disabled:opacity-40"
        >
          {busy ? "Connexion…" : "Ouvrir la gestion"}
        </button>
      </section>
    );
  }

  return (
    <div className="mt-10 space-y-6 pb-20">
      <div className="flex flex-col justify-between gap-4 rounded-[2rem] bg-[#11100e] p-6 text-white sm:flex-row sm:items-center sm:p-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[.25em] text-[#d4b273]">Centre opérations</p>
          <h2 className="mt-2 text-3xl font-black">Commandes & réservations</h2>
          <p className="mt-2 text-sm text-white/50">La validation d’une commande terminée déclenche automatiquement les points fidélité du compte client.</p>
        </div>
        <button type="button" onClick={() => void refresh()} disabled={busy} className="rounded-full bg-[#d4b273] px-5 py-3 text-xs font-black text-[#11100e] disabled:opacity-40">
          {busy ? "Actualisation…" : "Actualiser"}
        </button>
      </div>

      {error ? <p className="rounded-2xl bg-red-50 px-5 py-4 text-sm font-semibold text-red-700" role="alert">{error}</p> : null}

      <section className="rounded-[2rem] border border-black/10 bg-white/70 p-5 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-2xl font-black">Commandes</h3>
          <span className="rounded-full bg-black/[.04] px-3 py-1.5 text-xs font-bold">{orders.length}</span>
        </div>
        <div className="mt-5 space-y-4">
          {orders.length ? orders.map((order) => (
            <article key={order.id} className="rounded-3xl border border-black/8 bg-white p-5">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[.14em] text-[#b68a42]">{order.id}</p>
                  <h4 className="mt-2 text-xl font-black">{order.customer_name || "Client web"}</h4>
                  <p className="mt-1 text-sm text-black/50">{order.customer_phone || "Téléphone non renseigné"} · {order.fulfillment_type}</p>
                  {order.delivery_address ? <p className="mt-1 text-sm text-black/50">{order.delivery_address}</p> : null}
                  {order.notes ? <p className="mt-2 text-sm text-black/55">{order.notes}</p> : null}
                  <p className="mt-3 text-xs text-black/40">{new Date(order.created_at).toLocaleString("fr-FR")}</p>
                </div>
                <div className="shrink-0 lg:text-right">
                  <p className="text-2xl font-black">{new Intl.NumberFormat("fr-FR").format(Number(order.total))} F CFA</p>
                  <span className="mt-2 inline-flex rounded-full bg-[#d4b273]/15 px-3 py-1.5 text-xs font-black text-[#7a5a19]">{labels[order.status] || order.status}</span>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {orderStatuses.map((status) => (
                  <button
                    key={status}
                    type="button"
                    disabled={busy || order.status === status}
                    onClick={() => void updateOrder(order.id, status)}
                    className={"rounded-full border px-3 py-2 text-[11px] font-black transition " + (order.status === status ? "border-[#b68a42] bg-[#b68a42]/12 text-[#7a5a19]" : "border-black/10 hover:border-[#b68a42]")}
                  >
                    {labels[status] || status}
                  </button>
                ))}
              </div>
            </article>
          )) : <p className="rounded-2xl bg-black/[.03] p-5 text-sm text-black/45">Aucune commande enregistrée.</p>}
        </div>
      </section>

      <section className="rounded-[2rem] border border-black/10 bg-white/70 p-5 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-2xl font-black">Réservations</h3>
          <span className="rounded-full bg-black/[.04] px-3 py-1.5 text-xs font-bold">{reservations.length}</span>
        </div>
        <div className="mt-5 space-y-4">
          {reservations.length ? reservations.map((reservation) => (
            <article key={reservation.id} className="rounded-3xl border border-black/8 bg-white p-5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-black uppercase tracking-[.14em] text-[#b68a42]">{reservation.id}</p>
                  <h4 className="mt-2 text-xl font-black">{reservation.customer_name}</h4>
                  <p className="mt-1 text-sm text-black/50">{reservation.customer_phone} · {reservation.party_size} personne{reservation.party_size > 1 ? "s" : ""}</p>
                  {reservation.notes ? <p className="mt-2 text-sm text-black/55">{reservation.notes}</p> : null}
                </div>
                <div className="shrink-0 sm:text-right">
                  <p className="text-lg font-black">{reservation.reservation_date} · {reservation.reservation_time}</p>
                  <span className="mt-2 inline-flex rounded-full bg-[#d4b273]/15 px-3 py-1.5 text-xs font-black text-[#7a5a19]">{labels[reservation.status] || reservation.status}</span>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {reservationStatuses.map((status) => (
                  <button
                    key={status}
                    type="button"
                    disabled={busy || reservation.status === status}
                    onClick={() => void updateReservation(reservation.id, status)}
                    className={"rounded-full border px-3 py-2 text-[11px] font-black transition " + (reservation.status === status ? "border-[#b68a42] bg-[#b68a42]/12 text-[#7a5a19]" : "border-black/10 hover:border-[#b68a42]")}
                  >
                    {labels[status] || status}
                  </button>
                ))}
              </div>
            </article>
          )) : <p className="rounded-2xl bg-black/[.03] p-5 text-sm text-black/45">Aucune réservation enregistrée.</p>}
        </div>
      </section>
    </div>
  );
}
