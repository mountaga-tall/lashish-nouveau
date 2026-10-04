import type { Metadata } from "next";
import type { Locale } from "../../../../lib/menu-localization";
import { localizedMetadata } from "../../../../lib/seo";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;const meta=localizedMetadata(locale as Locale,"suivi","/"+locale+"/commande/suivi");return {...meta,robots:{index:false,follow:false}};}
export default function TrackingLayout({children}:{children:React.ReactNode}){return children;}
