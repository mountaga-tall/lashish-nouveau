import { localizedMetadata } from "../../../lib/seo";
import type { Locale } from "../../../lib/menu-localization";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}){const {locale}=await params;const meta=localizedMetadata(locale as Locale,"commande","/"+locale+"/commande");return {...meta,robots:{index:false,follow:false}};}
import OrderPanel from "../../../components/order-panel";
import { I18nText } from "../../../components/i18n-provider";

export default function OrderPage(){return <main className="min-h-screen bg-[#f5f0e7] px-5 pb-20 pt-32 sm:px-8 lg:px-12"><div className="mx-auto max-w-6xl"><p className="text-xs font-bold uppercase tracking-[.3em] text-[#b68a42]"><I18nText fr="Ma commande" en="My order" ar="طلبي"/></p><h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl"><I18nText fr="Votre panier." en="Your cart." ar="سلتك."/></h1><p className="mt-5 max-w-2xl text-black/55"><I18nText fr="Le panier reste disponible pendant votre navigation et est conservé sur cet appareil." en="Your cart stays available while you browse and is saved on this device." ar="تبقى سلتك محفوظة أثناء التصفح وعلى هذا الجهاز."/></p><OrderPanel/></div></main>}
