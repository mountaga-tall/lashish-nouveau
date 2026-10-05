import Image from "next/image";
import Link from "../../../../../components/locale-link";
import ProductAction from "../../../../../components/product-action";
import { products,priceOf,imageUrl } from "../../../../../lib/catalog";
import { I18nText } from "../../../../../components/i18n-provider";
import { menuLabel } from "../../../../../lib/menu-localization";
import { ProductName, ProductDescription } from "../../../../../components/product-text";
import { localizedMetadata } from "../../../../../lib/seo";
import { productName, productDescription } from "../../../../../lib/product-localization";
export async function generateStaticParams(){return ["fr","en","ar"].flatMap(locale=>products.map(p=>({locale,id:String(p.id)})))}
export async function generateMetadata({params}:{params:Promise<{locale:string;id:string}>}) {
  const { id, locale } = await params;
  const p = products.find((item) => String(item.id) === id);
  if (!p) return { title: "Product" };
  const l = locale as "fr" | "en" | "ar";
  return {
    ...localizedMetadata(l, "menu", `/${locale}/menu/produit/${id}`),
    title: productName(p.nom, l) + " — LA SHISH",
    description: productDescription(p.description, l) || "La Shish Abidjan",
  };
}
export default async function ProductPage({params}:{params:Promise<{locale:string;id:string}>}){const {locale,id}=await params;const p=products.find(item=>String(item.id)===id);if(!p)return <main className="min-h-screen bg-[#f5f0e7] px-5 pb-20 pt-32"><div className="mx-auto max-w-5xl"><h1 className="text-5xl font-black"><I18nText fr="Produit introuvable" en="Product not found" ar="المنتج غير موجود"/></h1></div></main>;const price=priceOf(p);const numberFormat=new Intl.NumberFormat(locale==="ar"?"ar-CI-u-nu-arab":locale==="en"?"en-US":"fr-FR");return <main className="min-h-screen bg-[#f5f0e7] px-5 pb-20 pt-32 sm:px-8 lg:px-12"><div className="mx-auto max-w-6xl"><Link href="/menu" className="text-sm font-bold text-black/45 hover:text-[#b68a42]"><I18nText fr="← Retour au menu" en="← Back to menu" ar="← العودة إلى القائمة"/></Link><div className="mt-7 grid gap-8 lg:grid-cols-2"><div className="relative aspect-square overflow-hidden rounded-[2rem] bg-black/[.04]"><Image src={imageUrl(p.photo)} alt={p.nom} fill priority unoptimized sizes="(max-width:1024px) 100vw, 50vw" className="object-cover"/></div><div className="flex flex-col justify-center"><p className="text-xs font-bold uppercase tracking-[.3em] text-[#b68a42]"><I18nText {...menuLabel(p.sousCategorie||p.categorie)}/></p><h1 className="mt-3 text-5xl font-black tracking-tight sm:text-6xl"><ProductName value={p.nom}/></h1><p className="mt-6 max-w-xl text-base leading-7 text-black/60"><ProductDescription value={p.description}/></p>{p.tailles?.length?<div className="mt-8"><p className="text-sm font-bold"><I18nText fr="Choisir une taille" en="Choose a size" ar="اختر الحجم"/></p><div className="mt-3 flex flex-wrap gap-2">{p.tailles.map(size=><span key={size.nom} className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold">{size.nom} · {numberFormat.format(size.prix)} F</span>)}</div></div>:null}<div className="mt-8 flex items-end justify-between gap-6"><div><span className="text-xs font-bold uppercase tracking-[.2em] text-black/40"><I18nText fr="À partir de" en="Starting at" ar="ابتداءً من"/></span><p className="mt-1 text-4xl font-black">{price!==null?numberFormat.format(price):"—"} <span className="text-base">F</span></p></div><ProductAction product={{id:p.id,nom:p.nom,prix:price??0,photo:p.photo,tailles:p.tailles,choix:p.choix}}/></div><p className="mt-6 text-xs text-black/40"><I18nText fr="Référence produit #" en="Product reference #" ar="مرجع المنتج #"/>{p.id} · <span className={p.disponible?"text-emerald-700":"text-red-700"}>{p.disponible?<I18nText fr="Disponible" en="Available" ar="متوفر"/>:<I18nText fr="Indisponible" en="Unavailable" ar="غير متوفر"/>}</span></p></div></div></div></main>}
