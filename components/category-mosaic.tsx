"use client";

import Image from "next/image";
import Link from "./locale-link";
import { useI18n } from "./i18n-provider";
import { menuLabel } from "../lib/menu-localization";
import { imageUrl,slugify } from "../lib/catalog";
import menu from "../data/menu.json";

export default function CategoryMosaic(){
 const {locale}=useI18n();
 const groups=Array.from(new Set(menu.products.map(p=>p.categorie))).map(category=>{
   const items=menu.products.filter(p=>p.categorie===category);
   return {category,hero:items.find(p=>p.photo)?.photo||"no-image.webp",sub:[...new Set(items.map(p=>p.sousCategorie).filter(Boolean))] as string[],count:items.length};
 });
 return <div className="category-mosaic mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
 {groups.map(({category,hero,sub,count},i)=>{const label=menuLabel(category)[locale];return <Link key={category} href={"/menu/"+slugify(category)} className="category-tile card-shine group relative aspect-square overflow-hidden rounded-[1.6rem] border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[0_20px_55px_rgba(0,0,0,.08)]">
   <Image src={imageUrl(hero)} alt={label} fill unoptimized sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw" className="object-cover transition duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"/>
   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"/>
   <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
     <div className="flex items-center justify-between gap-2"><span className="text-[9px] font-black tracking-[.28em] text-[#e4c98f]">{String(i+1).padStart(2,"0")}</span><span className="rounded-full border border-white/20 bg-black/20 px-2 py-1 text-[9px] font-bold backdrop-blur">{count}</span></div>
     <h3 className="mt-2 text-lg font-black leading-tight sm:text-2xl">{label}</h3>
     <p className="mt-2 line-clamp-2 text-[10px] leading-4 text-white/70">{sub.map(s=>menuLabel(s)[locale]).join(" · ")}</p>
   </div>
 </Link>})}
 </div>;
}
