"use client";

import Image from "next/image";
import Link from "./locale-link";
import { useCart } from "./cart-store";
import FavoriteButton from "./favorite-button";
import { useI18n } from "./i18n-provider";
import { imageUrl } from "../lib/catalog";
import { ProductName, ProductDescription } from "./product-text";

type Product = { id:number; nom:string; prix?:number; description?:string; photo?:string };

export default function FeaturedProducts({ products }:{ products:Product[] }) {
  const { add } = useCart();
  const { t, money } = useI18n();
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {products.map((p) => (
      <article key={p.id} className="card-shine overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <div className="relative aspect-[4/3] bg-white/5">
          <FavoriteButton id={p.id} />
          <Image src={imageUrl(p.photo)} alt={p.nom} fill unoptimized sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-700 hover:scale-105" />
          <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur">La Shish</span>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-black"><ProductName value={p.nom}/></h3>
            <span className="shrink-0 text-sm font-black text-[#d4b273]">{money(p.prix ?? 0)}</span>
          </div>
          <p className="mt-2 min-h-12 text-sm leading-6 text-white/55"><ProductDescription value={p.description}/></p>
          <div className="mt-5 flex gap-2">
            <button onClick={() => typeof p.prix === "number" && add({ id:p.id, nom:p.nom, prix:p.prix, photo:p.photo })} className="flex-1 rounded-full bg-[#d4b273] px-4 py-2.5 text-sm font-black text-[#11100e] hover:bg-white">{t("menu.add")}</button>
            <Link href={"/menu/produit/"+p.id} className="rounded-full border border-white/15 px-4 py-2.5 text-sm font-bold hover:border-[#d4b273] hover:text-[#d4b273]">{t("menu.details")}</Link>
          </div>
        </div>
      </article>
    ))}
  </div>;
}
