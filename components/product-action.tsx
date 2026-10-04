"use client";

import { useState } from "react";
import { useCart } from "./cart-store";
import { useI18n } from "./i18n-provider";
import { productName } from "../lib/product-localization";

type Size = { nom: string; prix: number };
type Product = { id: number; nom: string; prix: number; photo?: string; tailles?: Size[] };

export default function ProductAction({ product }: { product: Product }) {
  const { add } = useCart();
  const { t, money, locale } = useI18n();
  const [added, setAdded] = useState(false);
  const [selected, setSelected] = useState<Size | null>(product.tailles?.[0] ?? null);
  const price = selected?.prix ?? product.prix;
  const displayName = selected ? productName(product.nom, locale) + " — " + productName(selected.nom, locale) : productName(product.nom, locale);

  return (
    <div className="flex flex-col items-end gap-3">
      {product.tailles?.length ? (
        <div className="flex flex-wrap justify-end gap-2">
          {product.tailles.map((size) => (
            <button key={size.nom} type="button" onClick={() => setSelected(size)}
              className={"rounded-full border px-3 py-1.5 text-xs font-bold transition " + (selected?.nom === size.nom ? "border-[#b68a42] bg-[#b68a42]/10 text-[#7a5a19]" : "border-black/10 bg-white/60 hover:border-[#b68a42]")}>
              {productName(size.nom, locale)} · {money(size.prix)}
            </button>
          ))}
        </div>
      ) : null}
      <button type="button" disabled={!price}
        onClick={() => { if (!price) return; add({ id: product.id, nom: displayName, prix: price, photo: product.photo }); setAdded(true); window.setTimeout(() => setAdded(false), 900); }}
        className="rounded-full bg-[#11100e] px-6 py-3 text-sm font-black text-white transition hover:bg-[#b68a42] hover:text-[#11100e] disabled:opacity-40">
        {added ? t("product.added") : t("product.add")}
      </button>
    </div>
  );
}
