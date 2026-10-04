"use client";

import { useEffect, useState } from "react";
import { useI18n } from "./i18n-provider";

type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed" }> };

export default function PwaInstall() {
  const { locale } = useI18n();
  const [event, setEvent] = useState<InstallEvent | null>(null);

  useEffect(() => {
    const onBeforeInstall = (e: Event) => { e.preventDefault(); setEvent(e as InstallEvent); };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  if (!event) return null;

  const label = locale === "ar" ? "تثبيت التطبيق" : locale === "en" ? "Install app" : "Installer l’app";
  return (
    <button type="button" onClick={async () => { await event.prompt(); await event.userChoice.catch(() => undefined); setEvent(null); }}
      className="inline-flex items-center justify-center rounded-full border border-[#d4b273]/40 bg-[#d4b273]/10 px-3 py-2 text-[10px] font-black text-[#d4b273] sm:block">
      {label}
    </button>
  );
}
