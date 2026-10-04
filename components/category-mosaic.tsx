"use client";
import Image from "next/image";
import Link from "./locale-link";
import { useI18n } from "./i18n-provider";
import { menuLabel } from "../lib/menu-localization";
import { imageUrl,slugify } from "../lib/catalog";
const catalog={"Boisson":{"photo":"132.webp","sub":["Boisson Chaude","Boisson Froide","Jus de fruit naturel"]},"Cocktail":{"photo":"186.webp","sub":["Smoothie","Milkshake et frappé","Thé glacé","Special Mojito","Special Limonade","Cocktail et Mocktails","Shooters"]},"Dessert":{"photo":"171.webp","sub":["Crêpe","Coupe de glace"]},"Entrée froide":{"photo":"18.webp","sub":["Mezzah froide","Mezzah chaude","Salades"]},"Petit Déjeuner":{"photo":"1.webp","sub":["Formule","Omelette","Croque & Club","Manaiche"]},"Pizza":{"photo":"113.webp","sub":["Pizzas"]},"Nos plats":{"photo":"60.webp","sub":["Nos pâtes","Nos riz","Nos brochettes","Plats snack"]},"Snack gourmand":{"photo":"39.webp","sub":["Burgers","Hot dog","Kebab","Sandwich"]},"Spécialités":{"photo":"76.webp","sub":["Spécialités","Africaine"]},"French Tacos":{"photo":"128.webp","sub":["French Tacos"]},"Vin Et Liqueur":{"photo":"223.webp","sub":["Vin Rouge","Vin Blanc","Vin Rosé","Liqueur","Champagne Et Mousseux"]}};
export default function CategoryMosaic(){
 const {locale}=useI18n(); const entries=Object.entries(catalog) as Array<[string,{photo:string;sub:string[]}]>;
 return <div className="category-mosaic mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
 {entries.map(([category,data],i)=>{const label=menuLabel(category)[locale];return <Link key={category} href={"/menu/"+slugify(category)} className="category-tile card-shine group relative aspect-square overflow-hidden rounded-[1.6rem] border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[0_20px_55px_rgba(0,0,0,.08)]">
 <Image src={imageUrl(data.photo)} alt={label} fill unoptimized sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw" className="object-cover transition duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"/>
 <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"/>
 <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5"><div className="flex items-center justify-between gap-2"><span className="text-[9px] font-black tracking-[.28em] text-[#e4c98f]">{String(i+1).padStart(2,"0")}</span><span className="rounded-full border border-white/20 bg-black/20 px-2 py-1 text-[9px] font-bold backdrop-blur">{data.sub.length}</span></div><h3 className="mt-2 text-lg font-black leading-tight sm:text-2xl">{label}</h3><p className="mt-2 line-clamp-2 text-[10px] leading-4 text-white/65">{data.sub.slice(0,3).map(s=>menuLabel(s)[locale]).join(" · ")}</p></div>
 </Link>})}
 </div>;
}
