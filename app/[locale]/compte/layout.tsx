import type { Metadata } from "next";
import type { Locale } from "../../../lib/menu-localization";
import { localizedMetadata } from "../../../lib/seo";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;return localizedMetadata(locale as Locale,"compte",`/${locale}/compte`);}
export default function Layout({children}:{children:React.ReactNode}){return children;}