import type { Locale } from "./menu-localization";

export const WHATSAPP_NUMBER="2250140555666";
export const whatsappUrl=(message:string)=>"https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(message);

const site=(locale:Locale)=>locale==="ar"?"https://menushish.ci/ar":locale==="en"?"https://menushish.ci/en":"https://menushish.ci/fr";

export function contactMessage(locale:Locale){
  if(locale==="ar")return [
    "مرحباً LA SHISH، أتواصل معكم من الموقع الرسمي.",
    "",
    "أرغب في الاستفسار عن القائمة أو الأسعار أو الطلب أو الحجز.",
    "",
    "الموقع: "+site(locale),
    "واتساب: +225 01 40 55 56 66",
    "",
    "شكراً لكم،",
    "LA SHISH — أبيدجان"
  ].join("\n");
  if(locale==="en")return [
    "Hello LA SHISH, I am contacting you from the official website.",
    "",
    "I would like information about the menu, prices, an order or a reservation.",
    "",
    "Website: "+site(locale),
    "WhatsApp: +225 01 40 55 56 66",
    "",
    "Thank you,",
    "LA SHISH — Abidjan"
  ].join("\n");
  return [
    "Bonjour LA SHISH, je vous contacte depuis le site officiel.",
    "",
    "Je souhaite un renseignement sur le menu, les prix, une commande ou une réservation.",
    "",
    "Site : "+site(locale),
    "WhatsApp : +225 01 40 55 56 66",
    "",
    "Merci,",
    "LA SHISH — Abidjan"
  ].join("\n");
}

export function reservationMessage(locale:Locale,data:{name:string;phone:string;date:string;time:string;party:string|number;notes?:string;reservationId?:string;createdAt?:string}){
  const notes=data.notes?.trim();
  const id=data.reservationId||"À confirmer";
  const when=data.createdAt?.trim();
  if(locale==="ar")return [
    "مرحباً LA SHISH، أريد حجز طاولة.",
    "",
    "تفاصيل الحجز",
    "• الاسم: "+data.name,
    "• الهاتف: "+data.phone,
    "• التاريخ: "+data.date,
    "• الوقت: "+data.time,
    "• عدد الأشخاص: "+String(data.party),
    notes?"• ملاحظات خاصة: "+notes:"",
    "• رقم الحجز: "+id,
    when?"• تاريخ إرسال الطلب: "+when:"",
    "",
    "صفحة الحجز: "+site(locale)+"/reserver",
    "",
    "شكراً لكم،",
    "LA SHISH — أبيدجان"
  ].filter(Boolean).join("\n");
  if(locale==="en")return [
    "Hello LA SHISH, I would like to reserve a table.",
    "",
    "RESERVATION DETAILS",
    "• Name: "+data.name,
    "• Phone: "+data.phone,
    "• Date: "+data.date,
    "• Time: "+data.time,
    "• Guests: "+String(data.party),
    notes?"• Special request: "+notes:"",
    "• Reservation number: "+id,
    when?"• Request sent: "+when:"",
    "",
    "Reservation page: "+site(locale)+"/reserver",
    "",
    "Thank you,",
    "LA SHISH — Abidjan"
  ].filter(Boolean).join("\n");
  return [
    "Bonjour LA SHISH, je souhaite réserver une table.",
    "",
    "DÉTAILS DE LA RÉSERVATION",
    "• Nom : "+data.name,
    "• Téléphone : "+data.phone,
    "• Date : "+data.date,
    "• Heure : "+data.time,
    "• Personnes : "+String(data.party),
    notes?"• Demande particulière : "+notes:"",
    "• Numéro de réservation : "+id,
    when?"• Demande envoyée le : "+when:"",
    "",
    "Page réservation : "+site(locale)+"/reserver",
    "",
    "Merci,",
    "LA SHISH — Abidjan"
  ].filter(Boolean).join("\n");
}

export function orderMessage(locale:Locale,data:{lines:string[];total:string;orderId:string;trackingUrl?:string;name:string;phone:string;fulfillment:string;address?:string;notes?:string;createdAt?:string;persisted?:boolean}){
  const address=data.address?.trim(),notes=data.notes?.trim(),when=data.createdAt?.trim();
  const fallback=data.persisted===false?(locale==="ar"?"ملاحظة: لم يتم حفظ الطلب تلقائياً، يرجى تأكيده مع LA SHISH.":locale==="en"?"Note: the online save was unavailable; please confirm the order with LA SHISH.":"Note : l’enregistrement en ligne était indisponible ; merci de confirmer la commande avec LA SHISH."):"";
  const labels=locale==="ar"
    ?{header:"مرحباً LA SHISH، أريد تقديم هذا الطلب.",title:"تفاصيل الطلب",total:"الإجمالي: ",id:"رقم الطلب: ",track:"تتبع الطلب: ",date:"التاريخ والوقت: ",name:"الاسم: ",phone:"الهاتف: ",mode:"طريقة الاستلام: ",address:"العنوان: ",notes:"ملاحظات: ",page:"صفحة الطلب: "}
    :locale==="en"
    ?{header:"Hello LA SHISH, I would like to place this order.",title:"ORDER DETAILS",total:"TOTAL: ",id:"Order number: ",track:"Order tracking: ",date:"Date & time: ",name:"Name: ",phone:"Phone: ",mode:"Fulfillment: ",address:"Address: ",notes:"Notes: ",page:"Order page: "}
    :{header:"Bonjour LA SHISH, je souhaite passer cette commande.",title:"DÉTAILS DE LA COMMANDE",total:"TOTAL : ",id:"N° de commande : ",track:"Suivi de commande : ",date:"Date et heure : ",name:"Nom : ",phone:"Téléphone : ",mode:"Mode de retrait : ",address:"Adresse : ",notes:"Notes : ",page:"Page commande : "};
  return [
    labels.header,"",labels.title,...data.lines,"",labels.total+data.total,labels.id+data.orderId,
    data.trackingUrl?labels.track+data.trackingUrl:"",
    when?labels.date+when:"",
    "",labels.name+data.name,labels.phone+data.phone,labels.mode+data.fulfillment,
    address?labels.address+address:"",notes?labels.notes+notes:"",fallback,
    "",labels.page+site(locale)+"/commande","",locale==="ar"?"شكراً لكم،":locale==="en"?"Thank you,":"Merci,","LA SHISH — "+(locale==="ar"?"أبيدجان":locale==="en"?"Abidjan":"Abidjan")
  ].filter(Boolean).join("\n");
}
