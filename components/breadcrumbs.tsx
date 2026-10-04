"use client";
import Link from "./locale-link";
import { usePathname } from "next/navigation";
import { useI18n } from "./i18n-provider";
export default function Breadcrumbs(){
  const pathname=usePathname();
  const {locale,t}=useI18n();
  const clean=pathname.replace(/^\/(fr|en|ar)(?=\/|$)/,"")||"/";
  if(clean==="/")return null;
  const labels:Record<string,string>={menu:t("nav.menu"),contact:t("nav.contact"),reserver:t("nav.reserve"),commande:t("nav.order"),compte:t("nav.accountSpace"),favoris:t("nav.favorites"),fidelite:t("nav.loyalty"),produit:locale==="ar"?"المنتج":locale==="en"?"Product":"Produit",suivi:locale==="ar"?"تتبع":locale==="en"?"Tracking":"Suivi"};
  let href="";
  return <div className="relative z-20 mx-auto hidden max-w-7xl px-5 pt-2 text-[11px] font-semibold text-black/45 sm:block"><div className="w-fit rounded-full border border-black/10 bg-[#f5f0e7]/90 px-3 py-1.5 backdrop-blur-md"><Link href={"/"+locale}>{locale==="ar"?"الرئيسية":locale==="en"?"Home":"Accueil"}</Link>{clean.split("/").filter(Boolean).map((part,index)=>{href+="/"+part;const last=index===clean.split("/").filter(Boolean).length-1;return <span key={href}><span className="mx-2 text-black/25">/</span>{last?<span>{labels[part]??part}</span>:<Link href={href}>{labels[part]??part}</Link>}</span>})}</div></div>;
}