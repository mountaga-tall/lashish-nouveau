import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteHeader from "../components/site-header";
import { CartProvider } from "../components/cart-store";
import { FavoriteProvider } from "../components/favorite-store";
import SiteFooter from "../components/site-footer";
import Breadcrumbs from "../components/breadcrumbs";
import PwaRegister from "../components/pwa-register";
import MobileBar from "../components/mobile-bar";
import I18nProvider from "../components/i18n-provider";
import I18nProvider from "../components/i18n-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://menushish.ci"),
  title: { default: "Menu Shish — La Shish Abidjan", template: "%s — Menu Shish" },
  description: "Le menu digital premium de La Shish à Abidjan : découvrez, commandez, réservez et profitez de vos favoris.",
  alternates: { canonical: "https://menushish.ci" },
  manifest: "/manifest.webmanifest",
  applicationName: "Menu Shish",
  icons: { icon: "/icon.svg", apple: "/apple-icon.svg" },
  appleWebApp: { capable: true, title: "Menu Shish", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#11100e",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context":"https://schema.org","@type":"Restaurant","name":"La Shish","url":"https://menushish.ci","telephone":"+2250140555666","email":"lashish2@bonoumin.ci",
    "address":{"@type":"PostalAddress","streetAddress":"Voie de la Djibi","addressLocality":"Riviera Bonoumin, Cocody","addressCountry":"CI"},
    "sameAs":["https://instagram.com/restaurantlashish"],"menu":"https://menushish.ci/menu"
  };
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <body>
        <script id="restaurant-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <I18nProvider>
          <FavoriteProvider>
            <CartProvider>
              <SiteHeader />
              <Breadcrumbs />
              {children}
              <SiteFooter />
              <PwaRegister />
              <MobileBar />
            </CartProvider>
          </FavoriteProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
