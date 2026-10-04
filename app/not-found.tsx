"use client";

import Link from "next/link";
import { useI18n } from "../components/i18n-provider";

export default function NotFound(){
  const { t }=useI18n();
  return <main className="min-h-screen bg-[#11100e] px-5 py-32 text-white"><div className="mx-auto max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.35em] text-[#d4b273]">404</p><h1 className="mt-4 text-6xl font-black tracking-tight">{t("notfound.title")}</h1><p className="mt-5 max-w-xl text-white/55">{t("notfound.desc")}</p><Link href="/menu" className="mt-8 inline-flex rounded-full bg-[#d4b273] px-6 py-3 text-sm font-black text-[#11100e]">{t("notfound.back")}</Link></div></main>;
}
