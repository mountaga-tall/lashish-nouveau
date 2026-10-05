import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "../../lib/menu-localization";
import { localizedMetadata } from "../../lib/seo";
import I18nProvider from "../../components/i18n-provider";
import { CartProvider } from "../../components/cart-store";
import { FavoriteProvider } from "../../components/favorite-store";
import SiteHeader from "../../components/site-header";
import Breadcrumbs from "../../components/breadcrumbs";
import SiteFooter from "../../components/site-footer";
import PwaRegister from "../../components/pwa-register";
import MobileBar from "../../components/mobile-bar";
import WhatsAppFloat from "../../components/whatsapp-float";
const locales=["fr","en","ar"] as const;
export function generateStaticParams(){return locales.map(locale=>({locale}))}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params;
 if(!locales.includes(locale as Locale))return {};
 return {...localizedMetadata(locale as Locale,"home","/"+locale),authors:[{name:"La Shish Abidjan"}],creator:"LA SHISH",publisher:"La Shish Abidjan",robots:{index:true,follow:true}};
}
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){
 const {locale}=await params;
 if(!locales.includes(locale as Locale))notFound();
 const selected=locale as Locale;
 const url="https://menushish.ci/"+selected;
 const structuredData={"@context":"https://schema.org","@type":"Restaurant","name":"La Shish","url":url,"telephone":"+2250140555666","email":"lashish2@bonoumin.ci","servesCuisine":["Lebanese","Ivorian","Pizza","Grill"],"address":{"@type":"PostalAddress","streetAddress":"Voie de la Djibi","addressLocality":"Riviera Bonoumin, Cocody","addressCountry":"CI"},"sameAs":["https://instagram.com/restaurantlashish"],"menu":url+"/menu"};
 const jsonLd={"@context":"https://schema.org","@type":"WebSite","name":"LA SHISH","url":url,"inLanguage":selected,"potentialAction":{"@type":"SearchAction","target":url+"/menu?query={search_term_string}","query-input":"required name=search_term_string"}};
 return <I18nProvider initialLocale={selected}><FavoriteProvider><CartProvider><SiteHeader/><Breadcrumbs/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/>{children}<SiteFooter/><PwaRegister/><MobileBar/><WhatsAppFloat/></CartProvider></FavoriteProvider></I18nProvider>;
}