import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import Breadcrumbs from "../components/breadcrumbs";

export const metadata: Metadata = {
  metadataBase: new URL("https://menushish.ci"),
  title: {
    default: "Menu Shish — La Shish Abidjan",
    template: "%s — Menu Shish",
  },
  description: "Le menu digital premium de La Shish à Abidjan : découvrez, commandez, réservez et profitez de vos favoris.",
  alternates: {
    canonical: "https://menushish.ci",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <SiteHeader />
        <Breadcrumbs />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
