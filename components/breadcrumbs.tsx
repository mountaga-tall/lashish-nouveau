'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const labels: Record<string, string> = {
  menu: "Menu",
  contact: "Contact",
  reserver: "Réserver",
  commande: "Ma commande",
  compte: "Mon espace",
  favoris: "Mes favoris",
  fidelite: "Fidélité",
  promotions: "Promotions",
  produit: "Produit",
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  const parts = pathname.split("/").filter(Boolean);
  let href = "";
  return (
    <div className="fixed left-5 top-[86px] z-30 hidden text-[11px] font-semibold text-black/45 sm:block">
      <div className="rounded-full border border-black/10 bg-[#f5f0e7]/85 px-3 py-1.5 backdrop-blur-md">
        <Link href="/" className="hover:text-[#b68a42]">Accueil</Link>
        {parts.map((part) => {
          href += "/" + part;
          return (
            <span key={href}>
              <span className="mx-2 text-black/25">/</span>
              <Link href={href} className="hover:text-[#b68a42]">{labels[part] ?? part}</Link>
            </span>
          );
        })}
      </div>
    </div>
  );
}
