"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./cart-store";

export default function OrderPanel() {
  const { items, total, remove, clear } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [fulfillment, setFulfillment] = useState("pickup");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const checkout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) return;
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerName: name, customerPhone: phone, fulfillmentType: fulfillment, address, notes, items: items.map((item) => ({ id: item.id, quantity: item.qty })) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Impossible de préparer la commande.");
      const orderId = data.orderId || "LOCAL";
      const lines = items.map((item) => "- " + item.qty + "× " + item.nom + " — " + (item.qty * item.prix).toLocaleString("fr-FR") + " F").join("\n");
      const tracking = orderId !== "LOCAL" ? "\nSuivi : https://menushish.ci/commande/suivi/" + orderId : "";
      const message = "Bonjour La Shish, je souhaite passer cette commande.\n\n" + lines + "\n\nTotal estimé : " + total.toLocaleString("fr-FR") + " F\nCommande : " + orderId + tracking + "\n\nNom : " + name + "\nTéléphone : " + phone + "\nMode : " + fulfillment + (address ? "\nAdresse : " + address : "") + (notes ? "\nNotes : " + notes : "");
      window.open("https://wa.me/2250140555666?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally { setBusy(false); }
  };

  if (!items.length) return (
    <div className="mt-10 rounded-[2rem] bg-[#11100e] p-8 text-white sm:p-12">
      <p className="text-white/50">Aucun article pour le moment.</p>
      <h2 className="mt-3 text-3xl font-black">Votre prochaine commande commence avec le menu.</h2>
      <Link href="/menu" className="mt-7 inline-flex rounded-full bg-[#d4b273] px-6 py-3 text-sm font-bold text-[#11100e]">Explorer le menu</Link>
    </div>
  );

  return (
    <form onSubmit={checkout} className="mt-10 grid gap-5 lg:grid-cols-[1fr_360px]">
      <section className="rounded-[2rem] border border-black/10 bg-white/70 p-6 sm:p-8">
        <div className="flex items-center justify-between"><h2 className="text-2xl font-black">Votre sélection</h2><button type="button" onClick={clear} className="text-sm font-bold text-black/45 hover:text-red-700">Vider</button></div>
        <div className="mt-6 divide-y divide-black/8">
          {items.map((item) => <div key={item.key} className="flex items-center justify-between gap-4 py-5"><div><p className="font-black">{item.nom}</p><p className="mt-1 text-sm text-black/45">{item.qty} × {item.prix.toLocaleString("fr-FR")} F</p></div><button type="button" onClick={() => remove(item.id)} className="rounded-full border border-black/10 px-4 py-2 text-xs font-bold">− 1</button></div>)}
        </div>
        <div className="mt-6 border-t border-black/8 pt-6">
          <h3 className="text-lg font-black">Informations de commande</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom complet" className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]" />
            <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Téléphone" inputMode="tel" className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]" />
            <select value={fulfillment} onChange={(e) => setFulfillment(e.target.value)} className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]"><option value="pickup">À emporter</option><option value="onsite">Sur place</option><option value="delivery">Livraison</option></select>
            <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Adresse / quartier" className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]" />
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Note pour le restaurant" rows={3} className="sm:col-span-2 resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]" />
          </div>
          {error ? <p className="mt-4 text-sm font-semibold text-red-700">{error}</p> : null}
        </div>
      </section>
      <aside className="h-fit rounded-[2rem] bg-[#11100e] p-7 text-white sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[.25em] text-[#d4b273]">Récapitulatif</p>
        <div className="mt-6 flex items-center justify-between text-white/60"><span>Sous-total</span><strong className="text-white">{total.toLocaleString("fr-FR")} F</strong></div>
        <div className="mt-3 flex items-center justify-between text-white/60"><span>Livraison</span><span>À confirmer</span></div>
        <div className="mt-6 border-t border-white/10 pt-6"><div className="flex items-end justify-between"><span className="text-white/60">Total</span><strong className="text-3xl">{total.toLocaleString("fr-FR")} F</strong></div></div>
        <button disabled={busy} type="submit" className="mt-7 w-full rounded-full bg-[#d4b273] px-5 py-3.5 text-sm font-black text-[#11100e] hover:bg-white disabled:opacity-50">{busy ? "Préparation..." : "Commander sur WhatsApp"}</button>
      </aside>
    </form>
  );
}