"use client";

import { useState } from "react";
import { useCart } from "./cart-store";

export default function ProductAction({ product }: { product: { id: number; nom: string; prix: number; photo?: string } }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  return (
    <button type="button" disabled={!product.prix} onClick={() => {
      if (!product.prix) return;
      add(product);
      setAdded(true);
      window.setTimeout(() => setAdded(false), 900);
    }} className="rounded-full bg-[#11100e] px-6 py-3 text-sm font-black text-white transition hover:bg-[#b68a42] hover:text-[#11100e] disabled:opacity-40">
      {added ? "Ajouté au panier ✓" : "Ajouter au panier"}
    </button>
  );
}