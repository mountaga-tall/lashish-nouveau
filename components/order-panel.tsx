"use client";

import Link from "./locale-link";
import { useState } from "react";
import { useCart } from "./cart-store";
import { useI18n } from "./i18n-provider";
import { ProductName } from "./product-text";
import { productName } from "../lib/product-localization";

export default function OrderPanel() {
  const { items, total, remove, clear } = useCart();
  const { t, money, locale } = useI18n();
  const [name,setName]=useState(""); const [phone,setPhone]=useState(""); const [fulfillment,setFulfillment]=useState("pickup"); const [address,setAddress]=useState(""); const [notes,setNotes]=useState(""); const [busy,setBusy]=useState(false); const [error,setError]=useState("");

  const checkout=async(e:React.FormEvent)=>{
    e.preventDefault(); if(!items.length)return; setBusy(true); setError("");
    try {
      const response=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({customerName:name,customerPhone:phone,fulfillmentType:fulfillment,address,notes,items:items.map(item=>({id:item.id,quantity:item.qty}))})});
      const data=await response.json(); if(!response.ok)throw new Error(data.error||"Unable to prepare order.");
      const orderId=data.orderId||"LOCAL";
      const fulfillmentLabel=locale==="ar"?({pickup:"استلام خارجي",onsite:"في المطعم",delivery:"توصيل"} as Record<string,string>)[fulfillment]:locale==="en"?({pickup:"Takeaway",onsite:"Dine-in",delivery:"Delivery"} as Record<string,string>)[fulfillment]:({pickup:"À emporter",onsite:"Sur place",delivery:"Livraison"} as Record<string,string>)[fulfillment];
      const lines=items.map(item=>"- "+item.qty+"× "+productName(item.nom,locale)+" — "+money(item.qty*item.prix)).join("\n");
      const tracking=orderId!=="LOCAL"?"\n"+(locale==="ar"?"تتبع الطلب: ":locale==="en"?"Order tracking: ":"Suivi de commande : ")+"https://menushish.ci/"+locale+"/commande/suivi/"+orderId:"";
      const message=(locale==="ar"?"مرحباً LA SHISH، أريد تقديم هذا الطلب.":locale==="en"?"Hello LA SHISH, I would like to place this order.":"Bonjour LA SHISH, je souhaite passer cette commande.")+"\n\n"+lines+"\n\n"+(locale==="ar"?"الإجمالي: ":locale==="en"?"Estimated total: ":"Total estimé : ")+money(total)+"\n"+(locale==="ar"?"رقم الطلب: ":locale==="en"?"Order number: ":"N° de commande : ")+orderId+tracking+"\n\n"+(locale==="ar"?"الاسم: ":locale==="en"?"Name: ":"Nom : ")+name+"\n"+(locale==="ar"?"الهاتف: ":locale==="en"?"Phone: ":"Téléphone : ")+phone+"\n"+(locale==="ar"?"طريقة الاستلام: ":locale==="en"?"Fulfillment: ":"Mode de retrait : ")+(fulfillmentLabel||fulfillment)+(address?"\n"+(locale==="ar"?"العنوان: ":locale==="en"?"Address: ":"Adresse : ")+address:"")+(notes?"\n"+(locale==="ar"?"ملاحظات: ":locale==="en"?"Notes: ":"Notes : ")+notes:"")+"\n\n"+(locale==="ar"?"شكراً لكم — LA SHISH":locale==="en"?"Thank you — LA SHISH":"Merci — LA SHISH");
      window.open("https://wa.me/2250140555666?text="+encodeURIComponent(message),"_blank","noopener,noreferrer");
    } catch(err){setError(err instanceof Error?err.message:"Une erreur est survenue.");}
    finally{setBusy(false);}
  };

  if(!items.length)return <div className="mt-10 rounded-[2rem] bg-[#11100e] p-8 text-white sm:p-12"><p className="text-white/50">{t("order.empty")}</p><h2 className="mt-3 text-3xl font-black">{t("order.emptyTitle")}</h2><Link href="/menu" className="mt-7 inline-flex rounded-full bg-[#d4b273] px-6 py-3 text-sm font-bold text-[#11100e]">{t("order.explore")}</Link></div>;

  return <form onSubmit={checkout} className="mt-10 grid gap-5 pb-6 lg:grid-cols-[1fr_360px]">
    <section className="rounded-[2rem] border border-black/10 bg-white/70 p-6 sm:p-8">
      <div className="flex items-center justify-between"><h2 className="text-2xl font-black">{t("order.selection")}</h2><button type="button" onClick={clear} className="text-sm font-bold text-black/45 hover:text-red-700">{t("order.clear")}</button></div>
      <div className="mt-6 divide-y divide-black/8">
        {items.map(item=><div key={item.key} className="flex items-center justify-between gap-4 py-5"><div className="min-w-0"><p className="font-black"><ProductName value={item.nom}/></p><p className="mt-1 text-sm text-black/45">{item.qty} × {money(item.prix)}</p></div><button type="button" onClick={()=>remove(String(item.key))} className="min-h-10 min-w-10 rounded-full border border-black/10 px-4 py-2 text-xs font-bold">− 1</button></div>)}
      </div>
      <div className="mt-6 border-t border-black/8 pt-6">
        <h3 className="text-lg font-black">{t("order.info")}</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <input required value={name} onChange={e=>setName(e.target.value)} placeholder={t("order.name")} autoComplete="name" className="min-h-12 rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]"/>
          <input required value={phone} onChange={e=>setPhone(e.target.value)} placeholder={t("order.phone")} autoComplete="tel" inputMode="tel" className="min-h-12 rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]"/>
          <select value={fulfillment} onChange={e=>setFulfillment(e.target.value)} className="min-h-12 rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]"><option value="pickup">{t("order.pickup")}</option><option value="onsite">{t("order.onsite")}</option><option value="delivery">{t("order.delivery")}</option></select>
          <input value={address} onChange={e=>setAddress(e.target.value)} placeholder={t("order.address")} autoComplete="street-address" className="min-h-12 rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]"/>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder={t("order.notes")} rows={3} className="sm:col-span-2 resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]"/>
        </div>
        {error?<p className="mt-4 text-sm font-semibold text-red-700" role="alert">{error}</p>:null}
      </div>
    </section>
    <aside className="h-fit rounded-[2rem] bg-[#11100e] p-7 text-white sm:p-8 lg:sticky lg:top-[100px]">
      <p className="text-xs font-bold uppercase tracking-[.25em] text-[#d4b273]">{t("order.summary")}</p>
      <div className="mt-6 flex items-center justify-between text-white/60"><span>{t("order.subtotal")}</span><strong className="text-white">{money(total)}</strong></div>
      <div className="mt-3 flex items-center justify-between text-white/60"><span>{t("order.deliveryFee")}</span><span>{t("order.toConfirm")}</span></div>
      <div className="mt-6 border-t border-white/10 pt-6"><div className="flex items-end justify-between"><span className="text-white/60">{t("order.total")}</span><strong className="text-3xl">{money(total)}</strong></div></div>
      <button disabled={busy} type="submit" className="mt-7 w-full min-h-12 rounded-full bg-[#d4b273] px-5 py-3.5 text-sm font-black text-[#11100e] hover:bg-white disabled:opacity-50">{busy?t("order.prepare"):t("order.whatsapp")}</button>
    </aside>
  </form>;
}
