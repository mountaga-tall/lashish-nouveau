"use client";
import { useI18n } from "./i18n-provider";
import { contactMessage,whatsappUrl } from "../lib/whatsapp";
export default function WhatsAppFloat(){
  const {locale}=useI18n();
  const label=locale==="ar"?"التواصل مع LA SHISH عبر واتساب":locale==="en"?"Contact LA SHISH on WhatsApp":"Contacter LA SHISH sur WhatsApp";
  return <a href={whatsappUrl(contactMessage(locale))} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}
    className="whatsapp-float group fixed end-4 bottom-[calc(92px+env(safe-area-inset-bottom))] z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_55px_rgba(37,211,102,.38)] transition duration-300 hover:-translate-y-1 hover:scale-105 sm:bottom-6 sm:end-6 sm:h-16 sm:w-16">
    <span className="whatsapp-float-ring absolute inset-0 rounded-full border-2 border-white/20" aria-hidden="true"/>
    <svg viewBox="0 0 32 32" aria-hidden="true" className="relative h-7 w-7 sm:h-8 sm:w-8 fill-current"><path d="M16 3.2A12.8 12.8 0 0 0 5.2 22.4L3.5 28.5l6.4-1.7A12.8 12.8 0 1 0 16 3.2Zm0 22.9a10.1 10.1 0 0 1-5.1-1.4l-.4-.2-3.8 1 1-3.7-.2-.4A10.1 10.1 0 1 1 16 26.1Zm5.5-7.5c-.3-.2-1.9-.9-2.2-1s-.5-.2-.8.2l-.9 1.1c-.2.3-.5.3-.8.1a8.2 8.2 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.2-.7l.5-.6c.2-.2.2-.4.3-.6 0-.2-.1-.5-.2-.7s-.8-1.9-1-2.6c-.3-.7-.5-.6-.8-.6h-.7c-.3 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 3s1.2 3.4 1.4 3.6c.2.3 2.4 3.7 5.8 5.2.8.3 1.6.2 2.2.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.9-.1-.2-.3-.3-.6-.5Z"/></svg>
    <span className="pointer-events-none absolute bottom-full end-0 mb-3 hidden rounded-full bg-[#17130f] px-3 py-2 text-[10px] font-black text-white shadow-xl sm:block sm:translate-y-1 sm:opacity-0 sm:transition sm:duration-300 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">WhatsApp · LA SHISH</span>
  </a>;
}