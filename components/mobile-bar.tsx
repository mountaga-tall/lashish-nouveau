"use client";

import Link from "next/link";
import { useCart } from "./cart-store";

export default function MobileBar() {
  const { count } = useCart();
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-4 gap-1 rounded-2xl border border-black/10 bg-[#fffaf2]/95 p-1.5 shadow-2xl backdrop-blur-xl sm:hidden">
      <Link href="/menu" className="rounded-xl px-2 py-2.5 text-center text-[11px] font-black">Menu</Link>
      <Link href="/commande" className="rounded-xl bg-[#11100e] px-2 py-2.5 text-center text-[11px] font-black text-white">Panier{count ? " " + count : ""}</Link>
      <a href="tel:+2250140555666" className="rounded-xl px-2 py-2.5 text-center text-[11px] font-black">Appeler</a>
      <a href="https://wa.me/2250140555666" target="_blank" rel="noreferrer" className="rounded-xl px-2 py-2.5 text-center text-[11px] font-black text-[#7a5a19]">WhatsApp</a>
    </div>
  );
}