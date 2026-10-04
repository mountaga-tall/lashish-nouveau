"use client";

import Link from "next/link";
import { useCart } from "./cart-store";

export default function OrderPanel() {
  const { items, total, remove, clear } = useCart();
  const checkout = () => {
    const lines = items.map((item) => `- ${item.qty}× ${item.nom} — ${(item.qty * item.prix).toLocaleString("fr-FR")} F`).join("\\n");
    const message = `Bonjour La Shish, je souhaite passer cette commande :\\n\\n${lines}\\n\\nTotal estimé : ${total.toLocaleString("fr-FR")} F\\n\\nNom :\\nTéléphone :\\nLivraison / retrait :`;
    window.open(`https://wa.me/2250140555666?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  if (!items.length) {
    return (
      <div className="mt-10 rounded-[2rem] bg-[#11100e] p-8 text-white sm:p-12">
        <p className="text-white/50">Aucun article pour le moment.</p>
        <h2 className="mt-3 text-3xl font-black">Votre prochaine commande commence avec le menu.</h2>
        <Link href="/menu" className="mt-7 inline-flex rounded-full bg-[#d4b273] px-6 py-3 text-sm font-bold text-[#11100e]">Explorer le menu</Link>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_360px]">
      <section className="rounded-[2rem] border border-black/10 bg-white/70 p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black">Votre sélection</h2>
          <button onClick={clear} className="text-sm font-bold text-black/45 hover:text-red-700">Vider</button>
        </div>
        <div className="mt-6 divide-y divide-black/8">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4 py-5">
              <div>
                <p className="font-black">{item.nom}</p>
                <p className="mt-1 text-sm text-black/45">{item.qty} × {item.prix.toLocaleString("fr-FR")} F</p>
              </div>
              <button onClick={() => remove(item.id)} className="rounded-full border border-black/10 px-4 py-2 text-xs font-bold hover:border-[#b68a42]">− 1</button>
            </div>
          ))}
        </div>
      </section>

      <aside className="h-fit rounded-[2rem] bg-[#11100e] p-7 text-white sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[.25em] text-[#d4b273]">Récapitulatif</p>
        <div className="mt-6 flex items-center justify-between text-white/60"><span>Sous-total</span><strong className="text-white">{total.toLocaleString("fr-FR")} F</strong></div>
        <div className="mt-3 flex items-center justify-between text-white/60"><span>Livraison</span><span>À confirmer</span></div>
        <div className="mt-6 border-t border-white/10 pt-6"><div className="flex items-end justify-between"><span className="text-white/60">Total</span><strong className="text-3xl">{total.toLocaleString("fr-FR")} F</strong></div></div>
        <button onClick={checkout} className="mt-7 w-full rounded-full bg-[#d4b273] px-5 py-3.5 text-sm font-black text-[#11100e] hover:bg-white">Commander sur WhatsApp</button>
      </aside>
    </div>
  );
}
