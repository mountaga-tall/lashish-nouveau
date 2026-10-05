"use client";

import Link from "./locale-link";
import { useCart } from "./cart-store";
import { useI18n } from "./i18n-provider";

export default function MobileBar() {
  const { count } = useCart();
  const { t, number } = useI18n();
  return (
    <div className="fixed inset-x-2 bottom-[max(8px,env(safe-area-inset-bottom))] z-40 grid grid-cols-4 gap-1 rounded-2xl border border-black/10 bg-[color:var(--panel)]/95 p-1.5 shadow-2xl backdrop-blur-xl sm:hidden">
      <Link href="/menu" className="min-h-11 rounded-xl px-2 py-2.5 text-center text-[11px] font-black">{t("nav.menu")}</Link>
      <Link href="/commande" className="min-h-11 rounded-xl bg-[color:var(--header)] px-2 py-2.5 text-center text-[11px] font-black text-[color:var(--header-text)]">{t("nav.cart")}{count ? " " + number(count) : ""}</Link>
      <a href="tel:+2250140555666" className="min-h-11 rounded-xl px-2 py-2.5 text-center text-[11px] font-black">{t("nav.call")}</a>
      <a href="https://wa.me/2250140555666" target="_blank" rel="noreferrer" className="min-h-11 rounded-xl px-2 py-2.5 text-center text-[11px] font-black text-[#7a5a19]">{t("nav.whatsapp")}</a>
    </div>
  );
}
