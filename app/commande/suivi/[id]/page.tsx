"use client";

import { useEffect, useState } from "react";

const labels: Record<string, string> = { received: "Commande reçue", preparing: "En préparation", ready: "Prête", delivering: "En livraison", completed: "Terminée" };

export default function TrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState("");
  const [order, setOrder] = useState<any>(null);
  useEffect(() => { params.then(({ id: orderId }) => { setId(orderId); fetch("/api/orders/" + orderId).then((r) => r.json()).then(setOrder).catch(() => setOrder({ error: "Impossible de charger le suivi." })); }); }, [params]);
  return (
    <main className="min-h-screen bg-[#f5f0e7] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[.3em] text-[#b68a42]">Suivi</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">Commande {id}</h1>
        {order?.error ? <p className="mt-8 text-red-700">{order.error}</p> : <div className="mt-10 rounded-[2rem] bg-[#11100e] p-8 text-white sm:p-12"><p className="text-white/45">Statut</p><p className="mt-2 text-3xl font-black text-[#d4b273]">{labels[order?.order?.status] ?? "Commande reçue"}</p><p className="mt-4 text-sm text-white/50">Total : {Number(order?.order?.total ?? 0).toLocaleString("fr-FR")} F</p><div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-5">{Object.entries(labels).map(([key, label]) => <div key={key} className={`rounded-2xl border p-4 text-xs font-bold ${key === order?.order?.status ? "border-[#d4b273] bg-[#d4b273]/10 text-[#d4b273]" : "border-white/10 text-white/35"}`}>{label}</div>)}</div></div>}
      </div>
    </main>
  );
}