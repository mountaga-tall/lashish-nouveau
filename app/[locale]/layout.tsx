import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "../../lib/menu-localization";
import { localizedMetadata } from "../../lib/seo";
const locales=["fr","en","ar"] as const;
export function generateStaticParams(){return locales.map(locale=>({locale}))}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const {locale}=await params;
  if(!locales.includes(locale as Locale))return {};
  return {...localizedMetadata(locale as Locale,"home","/"+locale),authors:[{name:"La Shish Abidjan"}],creator:"Menu Shish",publisher:"La Shish Abidjan",robots:{index:true,follow:true}};
}
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){
  const {locale}=await params;
  if(!locales.includes(locale as Locale))notFound();
  return children;
}