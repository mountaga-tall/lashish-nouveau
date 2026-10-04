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
 const selected=locale as Locale;
 return <I18nProvider initialLocale={selected}><FavoriteProvider><CartProvider><SiteHeader/><Breadcrumbs/>{children}<SiteFooter/><PwaRegister/><MobileBar/></CartProvider></FavoriteProvider></I18nProvider>;
}