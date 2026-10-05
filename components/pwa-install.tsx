"use client";

import { useEffect,useState } from "react";
import { useI18n } from "./i18n-provider";

type InstallEvent=Event&{prompt:()=>Promise<void>;userChoice:Promise<{outcome:"accepted"|"dismissed"}>};

export default function PwaInstall(){
 const {locale}=useI18n();
 const [event,setEvent]=useState<InstallEvent|null>(null);
 const [ios,setIos]=useState(false);
 const [open,setOpen]=useState(false);
 useEffect(()=>{
  const onInstall=(e:Event)=>{e.preventDefault();setEvent(e as InstallEvent)};
  window.addEventListener("beforeinstallprompt",onInstall);
  const ua=navigator.userAgent;
  const isIOS=/iphone|ipad|ipod/i.test(ua)&&!("MSStream" in window);
  const standalone=window.matchMedia("(display-mode: standalone)").matches||("standalone" in navigator&&(navigator as Navigator&{standalone?:boolean}).standalone===true);
  setIos(isIOS&&!standalone);
  return()=>window.removeEventListener("beforeinstallprompt",onInstall);
 },[]);
 const label=locale==="ar"?"تثبيت التطبيق":locale==="en"?"Install app":"Installer l’application";
 const instructions=locale==="ar"?{title:"تثبيت LA SHISH",body:"على iPhone أو iPad: اضغط مشاركة في Safari ثم «إضافة إلى الشاشة الرئيسية».",close:"إغلاق"}:locale==="en"?{title:"Install LA SHISH",body:"On iPhone or iPad: tap Share in Safari, then choose “Add to Home Screen”.",close:"Close"}:{title:"Installer LA SHISH",body:"Sur iPhone ou iPad : appuyez sur Partager dans Safari, puis « Ajouter à l’écran d’accueil ».",close:"Fermer"};
 if(!event&&!ios)return null;
 if(ios)return <div className="relative"><button type="button" onClick={()=>setOpen(v=>!v)} className="inline-flex items-center justify-center rounded-full border border-[#d4b273]/40 bg-[#d4b273]/10 px-3 py-2 text-[10px] font-black text-[#d4b273]">{label}</button>{open?<div className="absolute end-0 top-full z-[80] mt-3 w-72 rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel)] p-4 text-[color:var(--text)] shadow-2xl backdrop-blur-xl"><p className="font-black">{instructions.title}</p><p className="mt-2 text-xs leading-5 text-[color:var(--muted)]">{instructions.body}</p><button type="button" onClick={()=>setOpen(false)} className="mt-3 text-xs font-bold text-[color:var(--gold)]">{instructions.close}</button></div>:null}</div>;
 return <button type="button" onClick={async()=>{if(!event)return;await event.prompt();await event.userChoice.catch(()=>undefined);setEvent(null)}} className="inline-flex items-center justify-center rounded-full border border-[#d4b273]/40 bg-[#d4b273]/10 px-3 py-2 text-[10px] font-black text-[#d4b273]">{label}</button>;
}