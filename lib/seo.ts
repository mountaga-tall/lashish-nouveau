import type { Metadata } from "next";
import type { Locale } from "./menu-localization";
const base="https://menushish.ci";
const data:Record<string,Record<Locale,{title:string;description:string;keywords:string[]}>>={
home:{
fr:{title:"LA SHISH — La Shish Abidjan",description:"Menu digital de La Shish à Abidjan : découvrez le menu, commandez, réservez votre table et gérez votre fidélité.",keywords:["La Shish Abidjan","restaurant Abidjan","menu La Shish","commande restaurant Abidjan"]},
en:{title:"LA SHISH — La Shish Abidjan",description:"La Shish digital menu in Abidjan: explore dishes, order online, reserve your table and manage loyalty.",keywords:["La Shish Abidjan","restaurant Abidjan","La Shish menu","restaurant order Abidjan"]},
ar:{title:"LA SHISH — La Shish أبيدجان",description:"القائمة الرقمية لمطعم La Shish في أبيدجان: اكتشف الأطباق واطلب واحجز وأدر برنامج الولاء.",keywords:["مطعم أبيدجان","La Shish","قائمة المطعم","طلب طعام أبيدجان"]}
},
menu:{
fr:{title:"Menu La Shish — Plats, pizzas et boissons à Abidjan",description:"Découvrez les 253 produits de La Shish : plats, pizzas, grillades, boissons, desserts et spécialités.",keywords:["menu restaurant Abidjan","pizza Abidjan","grillades Abidjan","La Shish menu"]},
en:{title:"La Shish Menu — Dishes, pizzas and drinks in Abidjan",description:"Explore 253 La Shish products: dishes, pizzas, grilled specialties, drinks and desserts.",keywords:["restaurant menu Abidjan","pizza Abidjan","grilled food Abidjan","La Shish menu"]},
ar:{title:"قائمة La Shish — أطباق وبيتزا ومشروبات في أبيدجان",description:"اكتشف ٢٥٣ منتجاً من La Shish: أطباق وبيتزا ومشاوي ومشروبات وحلويات.",keywords:["قائمة مطعم أبيدجان","بيتزا أبيدجان","مشاوي أبيدجان","La Shish"]}
},
commande:{
fr:{title:"Ma commande — LA SHISH",description:"Retrouvez votre panier La Shish et envoyez votre commande rapidement.",keywords:["commande La Shish","commande restaurant Abidjan"]},
en:{title:"My Order — LA SHISH",description:"Review your La Shish cart and place your order quickly.",keywords:["La Shish order","restaurant order Abidjan"]},
ar:{title:"طلبي — LA SHISH",description:"راجع سلة La Shish وأرسل طلبك بسرعة.",keywords:["طلب مطعم أبيدجان","La Shish"]}
},
compte:{
fr:{title:"Compte client — LA SHISH",description:"Créez votre compte client pour retrouver commandes, réservations et fidélité.",keywords:["compte client restaurant","fidélité La Shish"]},
en:{title:"Customer Account — LA SHISH",description:"Create your customer account to keep orders, reservations and loyalty in one place.",keywords:["restaurant customer account","La Shish loyalty"]},
ar:{title:"حساب العميل — LA SHISH",description:"أنشئ حسابك للاحتفاظ بالطلبات والحجوزات ونقاط الولاء.",keywords:["حساب عميل مطعم","ولاء La Shish"]}
},
contact:{
fr:{title:"Contact & localisation — La Shish Abidjan",description:"Contactez La Shish à Riviera Bonoumin, Abidjan : téléphone, WhatsApp, email et localisation.",keywords:["La Shish Riviera Bonoumin","contact restaurant Abidjan","restaurant Cocody"]},
en:{title:"Contact & Location — La Shish Abidjan",description:"Contact La Shish in Riviera Bonoumin, Abidjan by phone, WhatsApp or email.",keywords:["La Shish Riviera Bonoumin","restaurant contact Abidjan","restaurant Cocody"]},
ar:{title:"تواصل وموقع La Shish — أبيدجان",description:"تواصل مع La Shish في ريفييرا بونومين، أبيدجان عبر الهاتف وواتساب والبريد والخريطة.",keywords:["La Shish أبيدجان","مطعم كوكودي","التواصل مع المطعم"]}
},
favoris:{
fr:{title:"Mes favoris — LA SHISH",description:"Retrouvez vos plats La Shish préférés et accédez directement à leur commande.",keywords:["favoris restaurant","La Shish favoris"]},
en:{title:"My Favorites — LA SHISH",description:"Keep your favorite La Shish dishes close and order them again.",keywords:["restaurant favorites","La Shish favorites"]},
ar:{title:"مفضلاتي — LA SHISH",description:"احتفظ بأطباق La Shish المفضلة لديك واطلبها من جديد.",keywords:["مفضلات المطعم","La Shish"]}
},
fidelite:{
fr:{title:"Fidélité — LA SHISH",description:"Suivez vos points de fidélité La Shish et retrouvez-les dans votre compte client.",keywords:["fidélité restaurant Abidjan","points La Shish"]},
en:{title:"Loyalty — LA SHISH",description:"Track your La Shish loyalty points from your customer account.",keywords:["restaurant loyalty Abidjan","La Shish points"]},
ar:{title:"الولاء — LA SHISH",description:"تابع نقاط ولائك لدى La Shish من خلال حساب العميل.",keywords:["برنامج ولاء مطعم","نقاط La Shish"]}
},
reserver:{
fr:{title:"Réserver une table — La Shish Abidjan",description:"Réservez votre table chez La Shish à Riviera Bonoumin, Abidjan.",keywords:["réserver restaurant Abidjan","réservation La Shish","restaurant Cocody"]},
en:{title:"Reserve a Table — La Shish Abidjan",description:"Reserve your table at La Shish in Riviera Bonoumin, Abidjan.",keywords:["restaurant reservation Abidjan","reserve La Shish","restaurant Cocody"]},
ar:{title:"حجز طاولة — La Shish أبيدجان",description:"احجز طاولتك لدى La Shish في ريفييرا بونومين، أبيدجان.",keywords:["حجز مطعم أبيدجان","حجز La Shish","مطعم كوكودي"]}
},
suivi:{
fr:{title:"Suivi de commande — LA SHISH",description:"Suivez l’état de votre commande La Shish.",keywords:["suivi commande restaurant","La Shish commande"]},
en:{title:"Order Tracking — LA SHISH",description:"Track the status of your La Shish order.",keywords:["restaurant order tracking","La Shish order"]},
ar:{title:"تتبع الطلب — LA SHISH",description:"تابع حالة طلبك من La Shish.",keywords:["تتبع طلب مطعم","La Shish"]}
}};
export function localizedMetadata(locale:Locale,page:keyof typeof data,path:string):Metadata{
  const item=data[page][locale];
  const clean=path.replace(/^\/(fr|en|ar)/,"");
  return {title:item.title,description:item.description,keywords:item.keywords,alternates:{canonical:base+path,languages:{fr:base+"/fr"+clean,en:base+"/en"+clean,ar:base+"/ar"+clean,"x-default":base+"/fr"+clean}},openGraph:{title:item.title,description:item.description,url:base+path,siteName:"LA SHISH",locale:locale==="fr"?"fr_FR":locale==="en"?"en_US":"ar_SA",type:"website"},twitter:{card:"summary",title:item.title,description:item.description}};
}