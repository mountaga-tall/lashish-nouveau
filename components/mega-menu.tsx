"use client";
import Link from "./locale-link";
import { menuLabel } from "../lib/menu-localization";
import { slugify } from "../lib/catalog";
import { LanguageSwitcher,useI18n } from "./i18n-provider";
import ThemeSwitcher from "./theme-switcher";
import PwaInstall from "./pwa-install";
import menu from "../data/menu.json";
const groups=Array.from(new Set(menu.products.map(p=>p.categorie))).map(category=>({category,sub:[...new Set(menu.products.filter(p=>p.categorie===category&&p.sousCategorie).map(p=>p.sousCategorie))],count:menu.products.filter(p=>p.categorie===category).length}));
export default function MegaMenu({open,onClose}:{open:boolean;onClose:()=>void}){
 const {locale,t,number}=useI18n(); if(!open)return null;
 return <div className="fixed inset-0 z-[60] overflow-y-auto bg-[color:var(--overlay)] text-[color:var(--text)] backdrop-blur-xl">
  <div className="mx-auto min-h-full max-w-7xl px-4 pb-10 pt-24 sm:px-6 lg:px-8">
   <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel)] p-3 shadow-2xl backdrop-blur-xl">
    <div><p className="eyebrow">{t("menu.digital")}</p><h2 className="mt-1 text-xl font-black">{locale==="ar"?"القائمة الكاملة":locale==="en"?"Full menu":"Menu complet"}</h2></div>
    <div className="flex flex-wrap items-center gap-2"><ThemeSwitcher compact/><LanguageSwitcher compact/><PwaInstall/><button onClick={onClose} aria-label={t("nav.close")} className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] text-xl">×</button></div>
   </div>
   <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
    {groups.map(({category,sub,count},i)=>{const label=menuLabel(category)[locale];return <section key={category} className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--panel)] p-4 backdrop-blur-xl">
     <Link href={"/menu/"+slugify(category)} onClick={onClose} className="block rounded-2xl p-2 transition hover:bg-[color:var(--gold)]/10"><div className="flex items-center justify-between gap-3"><span className="text-[9px] font-black tracking-[.28em] text-[color:var(--gold)]">{String(i+1).padStart(2,"0")}</span><span className="text-[9px] font-bold text-[color:var(--muted)]">{number(count)}</span></div><span className="mt-1 block text-xl font-black">{label}</span></Link>
     {sub.length?<div className="mt-2 border-s-2 border-[color:var(--gold)]/25 ps-3">{sub.map(s=><Link key={s} href={"/menu/"+slugify(category)+"?sub="+encodeURIComponent(slugify(s))} onClick={onClose} className="flex min-h-9 items-center rounded-xl px-3 py-2 text-sm text-[color:var(--muted)] transition hover:bg-[color:var(--gold)]/10 hover:text-[color:var(--text)]">{menuLabel(s)[locale]}</Link>)}</div>:null}
    </section>})}
   </div>
  </div>
 </div>;
}
