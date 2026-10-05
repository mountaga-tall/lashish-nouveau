"use client";

import { useState } from "react";
import { useI18n } from "../../../components/i18n-provider";
import { reservationMessage,whatsappUrl } from "../../../lib/whatsapp";

export default function ReservePage(){
  const {t,locale}=useI18n();
  const [name,setName]=useState(""); const [phone,setPhone]=useState(""); const [date,setDate]=useState(""); const [time,setTime]=useState(""); const [party,setParty]=useState("2"); const [notes,setNotes]=useState(""); const [busy,setBusy]=useState(false); const [error,setError]=useState("");
  const submit=(e:React.FormEvent)=>{
    e.preventDefault(); setBusy(true); setError("");
    const reservationId="WEB-"+crypto.randomUUID().slice(0,8).toUpperCase();
    const popup=window.open("about:blank","_blank","noopener,noreferrer");
    const when=new Intl.DateTimeFormat(locale==="ar"?"ar-CI":"fr-FR",{dateStyle:"medium",timeStyle:"short"}).format(new Date());
    const message=reservationMessage(locale,{name,phone,date,time,party,notes,reservationId,createdAt:when});
    const url=whatsappUrl(message);
    if(popup)popup.location.href=url;else window.location.assign(url);
    setBusy(false);

    void (async()=>{
      try{
        const controller=new AbortController();
        const timer=window.setTimeout(()=>controller.abort(),6500);
        await fetch("/api/reservations",{method:"POST",headers:{"Content-Type":"application/json"},keepalive:true,signal:controller.signal,body:JSON.stringify({customerName:name,customerPhone:phone,reservationDate:date,reservationTime:time,partySize:Number(party),notes})});
        window.clearTimeout(timer);
      }catch{/* WhatsApp is the primary reservation channel; persistence is best-effort. */}
    })();
  };
  return <main className="min-h-screen bg-[#f5f0e7] px-5 pb-20 pt-32 sm:px-8 lg:px-12"><div className="mx-auto max-w-4xl"><p className="text-xs font-bold uppercase tracking-[.3em] text-[#b68a42]">{t("reserve.eyebrow")}</p><h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">{t("reserve.title")}</h1><p className="mt-5 max-w-2xl text-black/55">{t("reserve.desc")}</p><form onSubmit={submit} className="mt-10 rounded-[2rem] border border-black/10 bg-white/70 p-6 sm:p-10"><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold">{t("reserve.name")}<input required value={name} onChange={e=>setName(e.target.value)} autoComplete="name" className="mt-2 min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none"/></label><label className="text-sm font-semibold">{t("reserve.phone")}<input required value={phone} onChange={e=>setPhone(e.target.value)} autoComplete="tel" inputMode="tel" className="mt-2 min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none"/></label><label className="text-sm font-semibold">{t("reserve.date")}<input required type="date" value={date} onChange={e=>setDate(e.target.value)} className="mt-2 min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none"/></label><label className="text-sm font-semibold">{t("reserve.time")}<input required type="time" value={time} onChange={e=>setTime(e.target.value)} className="mt-2 min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none"/></label><label className="text-sm font-semibold">{t("reserve.people")}<input required type="number" min="1" max="50" value={party} onChange={e=>setParty(e.target.value)} className="mt-2 min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none"/></label><label className="text-sm font-semibold sm:col-span-2">{t("reserve.special")}<textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={4} className="mt-2 w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none" placeholder={t("reserve.specialPlaceholder")}/></label></div>{error?<p className="mt-4 text-sm font-semibold text-red-700" role="alert">{error}</p>:null}<button disabled={busy} type="submit" className="mt-7 min-h-12 rounded-full bg-[#11100e] px-6 py-3 text-sm font-bold text-white hover:bg-[#b68a42] hover:text-[#11100e] disabled:opacity-50">{t("reserve.send")}</button></form></div></main>;
}
