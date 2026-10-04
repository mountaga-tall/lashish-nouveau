"use client";

import { useState } from "react";
import { useCart } from "./cart-store";

type Size = { nom: string; prix: number };
type Product = { id: number; nom: string; prix: number; photo?: string; tailles?: Size[] };

export default function ProductAction({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [selected, setSelected] = useState<Size | null>(product.tailles?.[0] ?? null);
  const price = selected?.prix ?? product.prix;
  const displayName = selected ? product.nom + " — " + selected.nom : product.nom;

  return (
    <div className="flex flex-col items-end gap-3">
      {product.tailles?.length ? (
        <div className="flex flex-wrap justify-end gap-2">
          {product.tailles.map((size) => <button key={size.nom} type="button" onClick={() => setSelected(size)} className={"rounded-full border px-3 py-1.5 text-xs font-bold transition " + (selected?.nom === size.nom ? "border-[#b68a42] bg-[#b68a42]/10 text-[#7a5a19]" : "border-black/10 bg-white/60 hover:border-[#b68a42]")}>{size.nom} · {size.prix.toLocaleString("fr-FR")} F</button>)}
        </div>
      ) : null}
      <button type="button" disabled={!price} onClick={() => { if (!price) return; add({ id: product.id, nom: displayName, prix: price, photo: product.photo }); setAdded(true); window.setTimeout(() => setAdded(false), 900); }} className="rounded-full bg-[#11100e] px-6 py-3 text-sm font-black text-white transition hover:bg-[#b68a42] hover:text-[#11100e] disabled:opacity-40">
        {added ? "Ajouté au panier ✓" : "Ajouter au panier"}
      </button>
    </div>
  );
}