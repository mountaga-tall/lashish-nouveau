"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./cart-store";
import { useFavorites } from "./favorite-store";
import { LanguageSwitcher, PwaInstall, useI18n } from "./i18n-provider";

function IconMenu({ open }: { open: boolean }) {
  return (
    <span className="relative block h-5 w-6">
      <span className={"absolute left-0 top-1 block h-px w-6 bg-current transition " + (open ? "translate-y-2 rotate-45" : "")} />
      <span className={"absolute left-0 top-3 block h-px w-6 bg-current transition " + (open ? "opacity-0" : "")} />
      <span className={"absolute left-0 top-5 block h-px w-6 bg-current transition " + (open ? "-translate-y-2 -rotate-45" : "")} />
    </span>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { ids: favoriteIds } = useFavorites();
  const { t } = useI18n();

  const links = [
    [t("nav.menu"), "/menu"],
    [t("nav.reserve"), "/reserver"],
    [t("nav.favorites"), "/favoris"],
    [t("nav.order"), "/commande"],
    [t("nav.account"), "/compte"],
    [t("nav.contact"), "/contact"]
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 rounded-2xl border border-white/10 bg-[#11100e]/90 px-3 py-2.5 text-white shadow-2xl backdrop-blur-xl sm:px-5 sm:py-3">
          <Link href="/" onClick={() => setOpen(false)} className="group flex min-w-0 items-center gap-2.5">
            <span className="brand-logo-shell relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#d4b273]/55 bg-[#11100e] sm:h-14 sm:w-14">
              <Image src="https://raw.githubusercontent.com/mountaga-tall/menushish/main/images/logo.webp" alt="La Shish" width={72} height={72} priority unoptimized className="brand-logo h-11 w-11 rounded-full object-contain sm:h-12 sm:w-12" />
            </span>
            <span className="hidden text-sm font-black tracking-[.18em] sm:block">{t("brand")}</span>
          </Link>

          <nav className="hidden items-center gap-5 text-sm font-semibold text-white/75 lg:flex">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="transition hover:text-[#d4b273]">
                {label}{href === "/favoris" && favoriteIds.length ? <span className="ms-1 inline-flex min-w-5 items-center justify-center rounded-full bg-[#d4b273] px-1.5 py-0.5 text-[10px] font-black text-[#11100e]">{favoriteIds.length}</span> : null}
                {href === "/commande" && count > 0 ? <span className="ms-1 inline-flex min-w-5 items-center justify-center rounded-full bg-[#d4b273] px-1.5 py-0.5 text-[10px] font-black text-[#11100e]">{count}</span> : null}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <LanguageSwitcher />
            <PwaInstall />
            <Link href="/commande" className="rounded-full border border-[#d4b273]/40 bg-[#d4b273]/10 px-3 py-2 text-xs font-black text-[#d4b273] sm:block">
              {t("nav.cart")} {count > 0 ? "(" + count + ")" : ""}
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-2 md:hidden">
            <LanguageSwitcher compact />
            <button aria-label={open ? t("nav.close") : t("nav.open")} aria-expanded={open} onClick={() => setOpen((v) => !v)}
              className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:scale-105 hover:border-[#d4b273]/50 hover:text-[#d4b273]">
              <IconMenu open={open} />
            </button>
          </div>
          <button aria-label={open ? t("nav.close") : t("nav.open")} aria-expanded={open} onClick={() => setOpen((v) => !v)}
            className="hidden h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition md:flex hover:scale-105 hover:border-[#d4b273]/50 hover:text-[#d4b273]">
            <IconMenu open={open} />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-[#11100e] px-5 pb-10 pt-28 text-white">
          <div className="mx-auto flex min-h-full max-w-7xl flex-col justify-between">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [t("nav.menu"), "/menu"], [t("nav.order"), "/commande"], [t("nav.reserve"), "/reserver"], [t("nav.accountSpace"), "/compte"],
                [t("nav.favorites"), "/favoris"], [t("nav.loyalty"), "/fidelite"], [t("nav.promos"), "/promotions"], [t("nav.find"), "/contact"]
              ].map(([label, href], i) => (
                <Link key={href} href={href} onClick={() => setOpen(false)}
                  className="rounded-3xl border border-white/10 bg-white/[.03] p-5 transition hover:-translate-y-1 hover:border-[#d4b273]/50 hover:bg-[#d4b273]/10 sm:p-6">
                  <span className="text-xs font-bold text-[#d4b273]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-8 block text-2xl font-black">{label}</span>
                </Link>
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-7 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
              <span>La Shish • Abidjan • Riviera Bonoumin</span>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
