"use client";

import Link from "next/link";
import { useI18n } from "./i18n-provider";

function Svg({ children }: { children: React.ReactNode }) {
  return <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/50">{children}</span>;
}
function PathIcon({ d }: { d: string }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-[1.8]"><path d={d} /></svg>;
}

export default function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="bg-[#ece4d7] px-5 py-14 pb-28 sm:px-8 lg:px-12 lg:pb-14">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="text-2xl font-black">MENU SHISH</div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-black/55">{t("footer.tag")}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[.25em] text-[#b68a42]">{t("footer.nav")}</p>
          <div className="mt-5 grid gap-3 text-sm font-semibold">
            <Link href="/menu">{t("nav.menu")}</Link><Link href="/commande">{t("nav.order")}</Link><Link href="/reserver">{t("nav.reserve")}</Link><Link href="/contact">{t("nav.contact")}</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[.25em] text-[#b68a42]">{t("footer.contact")}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="tel:+2250140555666" aria-label={t("nav.call")} title={t("nav.call")}><Svg><PathIcon d="M6.5 4.5l2 4-1.7 1.4a13 13 0 0 0 7.3 7.3l1.4-1.7 4 2c.3.2.5.6.4.9-.5 1.8-2.2 2.9-4 2.3A17 17 0 0 1 2.9 7c-.6-1.8.5-3.5 2.3-4 .3-.1.7.1.9.4z" /></Svg></a>
            <a href="https://wa.me/2250140555666" aria-label="WhatsApp" title="WhatsApp" target="_blank" rel="noreferrer"><Svg><span className="text-xs font-black">WA</span></Svg></a>
            <a href="https://instagram.com/restaurantlashish" aria-label="Instagram" title="Instagram" target="_blank" rel="noreferrer"><Svg><PathIcon d="M7 3.5h10A3.5 3.5 0 0 1 20.5 7v10a3.5 3.5 0 0 1-3.5 3.5H7A3.5 3.5 0 0 1 3.5 17V7A3.5 3.5 0 0 1 7 3.5zM12 8a4 4 0 1 0 0 8 4 4 0 0 0-0-8zm5.2-1.3h.01" /></Svg></a>
            <a href="https://www.google.com/maps/search/?api=1&query=La+Shish+Riviera+Bonoumin+Abidjan" aria-label={t("nav.find")} title={t("nav.find")} target="_blank" rel="noreferrer"><Svg><PathIcon d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11zm0-8.2a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6z" /></Svg></a>
          </div>
          <div className="mt-5 space-y-1 text-sm text-black/55"><p>+225 01 40 55 56 66</p><p>lashish2@bonoumin.ci</p><p>Riviera Bonoumin • Voie de la Djibi • Abidjan</p></div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-black/10 pt-5 text-xs text-black/45">{t("footer.legal")}</div>
    </footer>
  );
}
