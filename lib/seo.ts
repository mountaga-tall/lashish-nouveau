import type { Metadata } from "next";
import type { Locale } from "./menu-localization";
const base="https://menushish.ci";
const data:Record<string,Record<Locale,{title:string;description:string;keywords:string[]}>>={
home:{
fr:{title:"LA SHISH — LA SHISH Abidjan",description:"Menu digital de LA SHISH à Abidjan : découvrez le menu, commandez, réservez votre table et gérez votre fidélité.",keywords:["LA SHISH Abidjan","restaurant Abidjan","menu LA SHISH","commande restaurant Abidjan"]},
en:{title:"LA SHISH — LA SHISH Abidjan",description:"LA SHISH digital menu in Abidjan: explore dishes, order online, reserve your table and manage loyalty.",keywords:["LA SHISH Abidjan","restaurant Abidjan","LA SHISH menu","restaurant order Abidjan"]},
ar:{title:"LA SHISH — LA SHISH أبيدجان",description:"القائمة الرقمية لمطعم LA SHISH في أبيدجان: اكتشف الأطباق واطلب واحجز وأدر برنامج الولاء.",keywords:["مطعم أبيدجان","LA SHISH","قائمة المطعم","طلب طعام أبيدجان"]}
},
menu:{
fr:{title:"Menu LA SHISH — Plats, pizzas et boissons à Abidjan",description:"Découvrez les 253 produits de LA SHISH : plats, pizzas, grillades, boissons, desserts et spécialités.",keywords:["menu restaurant Abidjan","pizza Abidjan","grillades Abidjan","LA SHISH menu"]},
en:{title:"LA SHISH Menu — Dishes, pizzas and drinks in Abidjan",description:"Explore 253 LA SHISH products: dishes, pizzas, grilled specialties, drinks and desserts.",keywords:["restaurant menu Abidjan","pizza Abidjan","grilled food Abidjan","LA SHISH menu"]},
ar:{title:"قائمة LA SHISH — أطباق وبيتزا ومشروبات في أبيدجان",description:"اكتشف ٢٥٣ منتجاً من LA SHISH: أطباق وبيتزا ومشاوي ومشروبات وحلويات.",keywords:["قائمة مطعم أبيدجان","بيتزا أبيدجان","مشاوي أبيدجان","LA SHISH"]}
},
commande:{
fr:{title:"Ma commande — LA SHISH",description:"Retrouvez votre panier LA SHISH et envoyez votre commande rapidement.",keywords:["commande LA SHISH","commande restaurant Abidjan"]},
en:{title:"My Order — LA SHISH",description:"Review your LA SHISH cart and place your order quickly.",keywords:["LA SHISH order","restaurant order Abidjan"]},
ar:{title:"طلبي — LA SHISH",description:"راجع سلة LA SHISH وأرسل طلبك بسرعة.",keywords:["طلب مطعم أبيدجان","LA SHISH"]}
},
compte:{
fr:{title:"Compte client — LA SHISH",description:"Créez votre compte client pour retrouver commandes, réservations et fidélité.",keywords:["compte client restaurant","fidélité LA SHISH"]},
en:{title:"Customer Account — LA SHISH",description:"Create your customer account to keep orders, reservations and loyalty in one place.",keywords:["restaurant customer account","LA SHISH loyalty"]},
ar:{title:"حساب العميل — LA SHISH",description:"أنشئ حسابك للاحتفاظ بالطلبات والحجوزات ونقاط الولاء.",keywords:["حساب عميل مطعم","ولاء LA SHISH"]}
},
contact:{
fr:{title:"Contact & localisation — LA SHISH Abidjan",description:"Contactez LA SHISH à Riviera Bonoumin, Abidjan : téléphone, WhatsApp, email et localisation.",keywords:["LA SHISH Riviera Bonoumin","contact restaurant Abidjan","restaurant Cocody"]},
en:{title:"Contact & Location — LA SHISH Abidjan",description:"Contact LA SHISH in Riviera Bonoumin, Abidjan by phone, WhatsApp or email.",keywords:["LA SHISH Riviera Bonoumin","restaurant contact Abidjan","restaurant Cocody"]},
ar:{title:"تواصل وموقع LA SHISH — أبيدجان",description:"تواصل مع LA SHISH في ريفييرا بونومين، أبيدجان عبر الهاتف وواتساب والبريد والخريطة.",keywords:["LA SHISH أبيدجان","مطعم كوكودي","التواصل مع المطعم"]}
},
favoris:{
fr:{title:"Mes favoris — LA SHISH",description:"Retrouvez vos plats LA SHISH préférés et accédez directement à leur commande.",keywords:["favoris restaurant","LA SHISH favoris"]},
en:{title:"My Favorites — LA SHISH",description:"Keep your favorite LA SHISH dishes close and order them again.",keywords:["restaurant favorites","LA SHISH favorites"]},
ar:{title:"مفضلاتي — LA SHISH",description:"احتفظ بأطباق LA SHISH المفضلة لديك واطلبها من جديد.",keywords:["مفضلات المطعم","LA SHISH"]}
},
fidelite:{
fr:{title:"Fidélité — LA SHISH",description:"Suivez vos points de fidélité LA SHISH et retrouvez-les dans votre compte client.",keywords:["fidélité restaurant Abidjan","points LA SHISH"]},
en:{title:"Loyalty — LA SHISH",description:"Track your LA SHISH loyalty points from your customer account.",keywords:["restaurant loyalty Abidjan","LA SHISH points"]},
ar:{title:"الولاء — LA SHISH",description:"تابع نقاط ولائك لدى LA SHISH من خلال حساب العميل.",keywords:["برنامج ولاء مطعم","نقاط LA SHISH"]}
},
reserver:{
fr:{title:"Réserver une table — LA SHISH Abidjan",description:"Réservez votre table chez LA SHISH à Riviera Bonoumin, Abidjan.",keywords:["réserver restaurant Abidjan","réservation LA SHISH","restaurant Cocody"]},
en:{title:"Reserve a Table — LA SHISH Abidjan",description:"Reserve your table at LA SHISH in Riviera Bonoumin, Abidjan.",keywords:["restaurant reservation Abidjan","reserve LA SHISH","restaurant Cocody"]},
ar:{title:"حجز طاولة — LA SHISH أبيدجان",description:"احجز طاولتك لدى LA SHISH في ريفييرا بونومين، أبيدجان.",keywords:["حجز مطعم أبيدجان","حجز LA SHISH","مطعم كوكودي"]}
},
suivi:{
fr:{title:"Suivi de commande — LA SHISH",description:"Suivez l’état de votre commande LA SHISH.",keywords:["suivi commande restaurant","LA SHISH commande"]},
en:{title:"Order Tracking — LA SHISH",description:"Track the status of your LA SHISH order.",keywords:["restaurant order tracking","LA SHISH order"]},
ar:{title:"تتبع الطلب — LA SHISH",description:"تابع حالة طلبك من LA SHISH.",keywords:["تتبع طلب مطعم","LA SHISH"]}
}};
export function localizedMetadata(locale:Locale,page:keyof typeof data,path:string):Metadata{
  const item=data[page][locale];
  const clean=path.replace(/^\/(fr|en|ar)/,"");
  return {title:item.title,description:item.description,keywords:item.keywords,alternates:{canonical:base+path,languages:{fr:base+"/fr"+clean,en:base+"/en"+clean,ar:base+"/ar"+clean,"x-default":base+"/fr"+clean}},openGraph:{title:item.title,description:item.description,url:base+path,siteName:"LA SHISH",locale:locale==="fr"?"fr_FR":locale==="en"?"en_US":"ar_SA",type:"website"},twitter:{card:"summary",title:item.title,description:item.description}};
}