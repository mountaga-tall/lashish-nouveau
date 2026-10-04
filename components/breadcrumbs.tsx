"use client";
import { usePathname } from "next/navigation";
import Link from "./locale-link";
import { useI18n } from "./i18n-provider";
import { menuLabel } from "../lib/menu-localization";
import { products,slugify } from "../lib/catalog";
import { productName } from "../lib/product-localization";

type Crumb={label:string;href?:string};

export default function Breadcrumbs(){
  const pathname=usePathname();
  const {locale,t}=useI18n();
  const clean=pathname.replace(/^\/(fr|en|ar)(?=\/|$)/,"")||"/";
  const parts=clean.split("/").filter(Boolean);
  const crumbs:Crumb[]=[{label:locale==="ar"?"الرئيسية":locale==="en"?"Home":"Accueil",href:"/"+locale}];
  const push=(label:string,href?:string)=>crumbs.push({label,href});

  if(parts[0]==="menu"){
    push(t("nav.menu"),"/menu");
    if(parts[1]==="produit"&&parts[2]){
      const p=products.find(x=>String(x.id)===parts[2]);
      if(p){push(menuLabel(p.categorie)[locale],"/menu/"+slugify(p.categorie));push(productName(p.nom,locale));}
      else push(locale==="ar"?"المنتج":locale==="en"?"Product":"Produit");
    }else if(parts[1]){
      const c=products.find(x=>slugify(x.categorie)===parts[1])?.categorie;
      push(c?menuLabel(c)[locale]:parts[1]);
    }
  }else if(parts[0]==="commande"){
    push(t("nav.order"),"/commande");
    if(parts[1]==="suivi")push(locale==="ar"?"تتبع الطلب":locale==="en"?"Order tracking":"Suivi de commande");
  }else{
    const labels:Record<string,string>={reserver:t("nav.reserve"),contact:t("nav.contact"),compte:t("nav.accountSpace"),favoris:t("nav.favorites"),fidelite:t("nav.loyalty")};
    push(labels[parts[0]]??parts[0]);
  }

  return <div className="site-breadcrumbs mx-auto max-w-7xl px-4 pb-2 pt-1" dir={locale==="ar"?"rtl":"ltr"}>
    <nav aria-label={t("breadcrumb.label")} className="flex max-w-full items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 text-[11px] font-semibold text-[color:var(--muted)]">
      {crumbs.map((crumb,i)=>crumb.href?<Link key={i} href={crumb.href} className="shrink-0 transition hover:text-[color:var(--gold)]">{crumb.label}</Link>:<span key={i} className={"shrink-0 "+(i===crumbs.length-1?"text-[color:var(--text)]":"")}>{crumb.label}</span>)}
    </nav>
  </div>;
}
