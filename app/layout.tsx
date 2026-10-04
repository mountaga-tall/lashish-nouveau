import type { Metadata,Viewport } from "next";
import "./globals.css";
export const metadata:Metadata={metadataBase:new URL("https://menushish.ci"),title:{default:"Menu Shish — La Shish Abidjan",template:"%s — Menu Shish"},description:"Menu digital de La Shish à Abidjan.",manifest:"/manifest.webmanifest",applicationName:"Menu Shish",icons:{icon:"/icon.svg",apple:"/apple-icon.svg"},appleWebApp:{capable:true,title:"Menu Shish",statusBarStyle:"black-translucent"}};
export const viewport:Viewport={width:"device-width",initialScale:1,viewportFit:"cover",themeColor:"#11100e",colorScheme:"dark"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr" dir="ltr" suppressHydrationWarning><body>{children}</body></html>;}