'use client';

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "./cart-store";

type Product = {
  id: number;
  categorie: string;
  sousCategorie?: string;
  nom: string;
  description?: string;
  prix: number;
  disponible: boolean;
  photo?: string;
  type?: string;
  tailles?: { nom: string; prix: number }[];
  supplement?: { label: string; prix: number };
};

const raw = "https://raw.githubusercontent.com/mountaga-tall/lashish-nouveau/v2-nextjs/images/";

export default function MenuBrowser({ products, categories }: { products: Product[]; categories: string[] }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("Tous");
  const [addedId, setAddedId] = useState<number | null>(null);
  const { add } = useCart();

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const categoryOk = active === "Tous" || p.categorie === active;
      const queryOk = !q || [p.nom, p.description, p.sousCategorie].filter(Boolean).join(" ").toLowerCase().includes(q);
      return categoryOk && queryOk;
    });
  }, [products, active, query]);

  return (
    <div className="mt-10">
      <div className="sticky top-[84px] z-30 rounded-3xl border border-black/10 bg-[#f5f0e7]/90 p-4 backdrop-blur-xl">
        <div className="flex flex-col gap-3 lg:flex-row">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher un plat, une pizza, une boisson..." className="min-w-0 flex-1 rounded-2xl border border-black/10 bg-white/60 px-5 py-3.5 text-sm outline-none placeholder:text-black/35 focus:border-[#b68a42]" />
          <div className="flex gap-2 overflow-x-auto pb-1">
            {["Tous", ...categories].map((category) => (
              <button key={category} onClick={() => setActive(category)} className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition ${active === category ? "bg-[#11100e] text-white" : "bg-white/70 hover:bg-white"}`}>
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between text-sm text-black/50">
        <span>{visible.length} résultat{visible.length > 1 ? "s" : ""}</span>
        <Link href="/commande" className="font-bold text-[#b68a42]">Voir ma commande →</Link>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <article key={p.id} className="overflow-hidden rounded-3xl border border-black/8 bg-white/60 transition hover:-translate-y-1 hover:bg-white">
            <div className="relative aspect-[4/3] bg-black/[.04]">
              {p.photo ? <Image src={raw + p.photo} alt={p.nom} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /> : null}
            </div>
            <div className="p-5">
              <div className="flex gap-4 justify-between">
                <div>
                  <h2 className="text-lg font-black">{p.nom}</h2>
                  {p.sousCategorie ? <p className="mt-1 text-xs font-semibold text-[#b68a42]">{p.sousCategorie}</p> : null}
                </div>
                <span className="shrink-0 text-sm font-black">{p.prix.toLocaleString("fr-FR")} F</span>
              </div>
              <p className="mt-3 min-h-12 text-sm leading-6 text-black/55">{p.description}</p>
              <button onClick={() => { add({ id: p.id, nom: p.nom, prix: p.prix, photo: p.photo }); setAddedId(p.id); window.setTimeout(() => setAddedId(null), 700); }} className="mt-5 w-full rounded-2xl bg-[#11100e] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#b68a42] hover:text-[#11100e]">{addedId === p.id ? "Ajouté ✓" : "Ajouter au panier"}</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
