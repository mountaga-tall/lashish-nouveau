'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./cart-store";
import { useFavorites } from "./favorite-store";

function IconMenu({ open }: { open: boolean }) {
  return (
    <span className="relative block h-5 w-6">
      <span className={`absolute left-0 top-1 block h-px w-6 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
      <span className={`absolute left-0 top-3 block h-px w-6 bg-current transition ${open ? "opacity-0" : ""}`} />
      <span className={`absolute left-0 top-5 block h-px w-6 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
    </span>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { ids: favoriteIds } = useFavorites();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-[#11100e]/85 px-4 py-3 text-white shadow-2xl backdrop-blur-xl sm:px-5">
          <Link href="/" onClick={() => setOpen(false)} className="group flex items-center gap-3">
            <Image src="https://raw.githubusercontent.com/mountaga-tall/menushish/main/images/logo.webp" alt="La Shish" width={88} height={58} priority className="h-14 w-[78px] object-contain transition duration-500 group-hover:scale-110 group-hover:-rotate-1 sm:h-16 sm:w-[92px]" />
            <span className="hidden text-sm font-black tracking-[.18em] sm:block">MENU SHISH</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-white/75 md:flex">
            <Link href="/menu" className="transition hover:text-[#d4b273]">Menu</Link>
            <Link href="/reserver" className="transition hover:text-[#d4b273]">Réserver</Link>
            <Link href="/favoris" className="relative transition hover:text-[#d4b273]">Favoris{favoriteIds.length ? <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-[#d4b273] px-1.5 py-0.5 text-[10px] font-black text-[#11100e]">{favoriteIds.length}</span> : null}</Link>
            <Link href="/commande" className="relative transition hover:text-[#d4b273]">Ma commande{count > 0 ? <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-[#d4b273] px-1.5 py-0.5 text-[10px] font-black text-[#11100e]">{count}</span> : null}</Link>
            <Link href="/contact" className="transition hover:text-[#d4b273]">Contact</Link>
          </nav>

          <Link href="/commande" className="mr-2 hidden items-center rounded-full border border-[#d4b273]/40 bg-[#d4b273]/10 px-3 py-2 text-xs font-black text-[#d4b273] sm:flex">Panier {count > 0 ? `(${count})` : ""}</Link>
          <button
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:scale-105 hover:border-[#d4b273]/50 hover:text-[#d4b273]"
          >
            <IconMenu open={open} />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-[#11100e] px-5 pb-10 pt-28 text-white">
          <div className="mx-auto flex h-full max-w-7xl flex-col justify-between">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Le menu", "/menu"],
                ["Commander", "/commande"],
                ["Réserver", "/reserver"],
                ["Mon espace", "/compte"],
                ["Mes favoris", "/favoris"],
                ["Fidélité", "/fidelite"],
                ["Promotions", "/promotions"],
                ["Nous trouver", "/contact"],
              ].map(([label, href], i) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="rounded-3xl border border-white/10 bg-white/[.03] p-6 transition hover:-translate-y-1 hover:border-[#d4b273]/50 hover:bg-[#d4b273]/10"
                >
                  <span className="text-xs font-bold text-[#d4b273]">0{i + 1}</span>
                  <span className="mt-8 block text-2xl font-black">{label}</span>
                </Link>
              ))}
            </div>
            <div className="border-t border-white/10 pt-7 text-sm text-white/50">La Shish • Abidjan • Riviera Bonoumin</div>
          </div>
        </div>
      )}
    </>
  );
}
