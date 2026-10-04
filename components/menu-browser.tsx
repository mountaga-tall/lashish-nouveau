"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo,useState } from "react";
import { useCart } from "./cart-store";
import FavoriteButton from "./favorite-button";
import { useI18n } from "./i18n-provider";
import { menuLabel } from "../lib/menu-localization";
import { imageUrl } from "../lib/catalog";

type Product={id:number;categorie:string;sousCategorie?:string;nom:string;description?:string;prix?:number;disponible:boolean;photo?:string;type?:string;tailles?:{nom:string;prix:number}[]};

export default function MenuBrowser({products,categories}:{products:Product[];categories:string[]}) {
  const [query,setQuery]=useState(""); const [active,setActive]=useState("Tous"); const [addedId,setAddedId]=useState<number|null>(null);
  const {add}=useCart(); const {t,money,locale}=useI18n();
  const visible=useMemo(()=>{const q=query.trim().toLowerCase();return products.filter(p=>{const categoryOk=active==="Tous"||p.categorie===active;const queryOk=!q||[p.nom,p.description,p.sousCategorie].filter(Boolean).join(" ").toLowerCase().includes(q);return categoryOk&&queryOk})},[products,active,query]);
  return <div className="mt-10">
    <div className="sticky top-[84px] z-30 rounded-3xl border border-black/10 bg-[#f5f0e7]/90 p-3 backdrop-blur-xl sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row">
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t("menu.search")} aria-label={t("menu.search")} className="min-h-12 min-w-0 flex-1 rounded-2xl border border-black/10 bg-white/60 px-5 py-3.5 text-sm outline-none placeholder:text-black/35 focus:border-[#b68a42]"/>
        <div className="flex gap-2 overflow-x-auto pb-1" aria-label={t("menu.all")}>
          {["Tous",...categories].map(category=>{const label=category==="Tous"?t("menu.all"):menuLabel(category)[locale];return <button key={category} onClick={()=>setActive(category)} className={"min-h-10 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition "+(active===category?"bg-[#11100e] text-white":"bg-white/70 hover:bg-white")}>{label}</button>})}
        </div>
      </div>
    </div>
    <div className="mt-8 flex items-center justify-between gap-4 text-sm text-black/50"><span>{visible.length} {visible.length>1?t("menu.results"):t("menu.result")}</span><Link href="/commande" className="font-bold text-[#b68a42]">{t("menu.myOrder")}</Link></div>
    {visible.length===0?<div className="mt-8 rounded-[2rem] border border-black/10 bg-white/60 p-8 text-sm font-semibold text-black/55">{locale==="ar"?"لا توجد نتائج مطابقة.":locale==="en"?"No matching results.":"Aucun résultat correspondant."}</div>:<div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {visible.map(p=>{const price=p.prix??p.tailles?.reduce((min,size)=>Math.min(min,size.prix),Infinity);const sub=p.sousCategorie?menuLabel(p.sousCategorie)[locale]:"";return <article key={p.id} className="overflow-hidden rounded-3xl border border-black/8 bg-white/60 transition hover:-translate-y-1 hover:bg-white">
        <div className="relative aspect-[4/3] bg-black/[.04]"><FavoriteButton id={p.id}/><Image src={imageUrl(p.photo)} alt={p.nom} fill unoptimized sizes="(max-width:768px) 100vw, 33vw" className="object-cover"/></div>
        <div className="p-5"><div className="flex justify-between gap-4"><div><h2 className="text-lg font-black">{p.nom}</h2>{sub?<p className="mt-1 text-xs font-semibold text-[#b68a42]">{sub}</p>:null}</div><span className="shrink-0 text-sm font-black">{money(Number.isFinite(price as number)?Number(price):0)}</span></div>
          <p className="mt-3 min-h-12 text-sm leading-6 text-black/55">{p.description}</p>
          <div className="mt-5 flex gap-2">{p.tailles?.length?<Link href={"/menu/produit/"+p.id} className="flex-1 rounded-2xl bg-[#11100e] px-4 py-3 text-center text-sm font-bold text-white hover:bg-[#b68a42] hover:text-[#11100e]">{t("menu.chooseSize")}</Link>:<button onClick={()=>{const value=Number(price);if(!Number.isFinite(value))return;add({id:p.id,nom:p.nom,prix:value,photo:p.photo});setAddedId(p.id);window.setTimeout(()=>setAddedId(null),700)}} className="flex-1 rounded-2xl bg-[#11100e] px-4 py-3 text-sm font-bold text-white hover:bg-[#b68a42] hover:text-[#11100e]">{addedId===p.id?t("menu.added"):t("menu.add")}</button>}<Link href={"/menu/produit/"+p.id} className="rounded-2xl border border-black/10 px-4 py-3 text-sm font-bold hover:border-[#b68a42] hover:text-[#7a5a19]">{t("menu.details")}</Link></div>
        </div>
      </article>})}
    </div>}
  </div>;
}
