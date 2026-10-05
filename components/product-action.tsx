"use client";

import { useEffect, useMemo, useState } from "react";
import { useCart } from "./cart-store";
import { useI18n } from "./i18n-provider";
import { productName } from "../lib/product-localization";

type Size = { nom: string; prix: number };
type Choice = { label: string; options: string[]; required?: boolean; max?: number };
type Product = { id: number; nom: string; prix: number; photo?: string; tailles?: Size[]; choix?: Choice };

export default function ProductAction({ product }: { product: Product }) {
  const { add } = useCart();
  const { t, money, locale } = useI18n();
  const [added, setAdded] = useState(false);
  const [selected, setSelected] = useState<Size | null>(product.tailles?.[0] ?? null);
  const [choice, setChoice] = useState<string[]>([]);

  useEffect(() => {
    const first = product.choix?.options?.[0];
    setChoice(product.choix && first ? [first] : []);
  }, [product.choix]);

  const price = selected?.prix ?? product.prix;
  const maxChoices = Math.max(1, Math.min(product.choix?.max ?? 1, product.choix?.options?.length ?? 1));
  const choiceRequired = Boolean(product.choix);
  const canAdd = Boolean(price) && (!choiceRequired || choice.length > 0);
  const displayName = useMemo(() => {
    const parts = [product.nom];
    if (selected) parts.push(selected.nom);
    if (choice.length) parts.push(choice.join(", "));
    return parts.filter(Boolean).join(" — ");
  }, [product.nom, selected, choice]);

  return (
    <div className="flex w-full flex-col items-end gap-3">
      {product.tailles?.length ? (
        <div className="flex w-full flex-wrap justify-end gap-2">
          {product.tailles.map((size) => (
            <button key={size.nom} type="button" onClick={() => setSelected(size)}
              className={"rounded-full border px-3 py-1.5 text-xs font-bold transition " + (selected?.nom === size.nom ? "border-[#b68a42] bg-[#b68a42]/10 text-[#7a5a19]" : "border-black/10 bg-white/60 hover:border-[#b68a42]")}>
              {productName(size.nom, locale)} · {money(size.prix)}
            </button>
          ))}
        </div>
      ) : null}

      {product.choix?.options?.length ? (
        <div className="w-full rounded-2xl border border-black/10 bg-white/55 p-4">
          <p className="text-xs font-black uppercase tracking-[.16em] text-[#b68a42]">{product.choix.label}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.choix.options.map((option) => {
              const active = choice.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    if (active) {
                      setChoice(current => current.filter(value => value !== option));
                    } else if (maxChoices === 1) {
                      setChoice([option]);
                    } else if (choice.length < maxChoices) {
                      setChoice(current => [...current, option]);
                    }
                  }}
                  className={"rounded-full border px-3 py-2 text-xs font-bold transition " + (active ? "border-[#b68a42] bg-[#b68a42]/12 text-[#7a5a19]" : "border-black/10 bg-white hover:border-[#b68a42]")}
                  aria-pressed={active}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-[11px] text-black/40">
            {maxChoices > 1 ? (locale === "fr" ? "Jusqu’à " + maxChoices + " choix." : locale === "en" ? "Up to " + maxChoices + " choices." : "حتى " + maxChoices + " اختيارات.") : (locale === "fr" ? "Choix requis." : locale === "en" ? "Choice required." : "الاختيار مطلوب.")}
          </p>
        </div>
      ) : null}

      <div className="flex w-full items-center justify-end gap-3">
        <span className="text-xl font-black">{money(price)}</span>
        <button
          type="button"
          disabled={!canAdd}
          onClick={() => {
            if (!canAdd) return;
            add({ id: product.id, nom: displayName, prix: price, photo: product.photo, options: choice });
            setAdded(true);
            window.setTimeout(() => setAdded(false), 900);
          }}
          className="rounded-full bg-[#11100e] px-6 py-3 text-sm font-black text-white transition hover:bg-[#b68a42] hover:text-[#11100e] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {added ? t("product.added") : t("product.add")}
        </button>
      </div>
    </div>
  );
}
