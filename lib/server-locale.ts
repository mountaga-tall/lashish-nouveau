export type ServerLocale="fr"|"en"|"ar";
const messages:Record<string,Record<ServerLocale,string>>={
  incompleteOrder:{fr:"Informations de commande incomplètes.",en:"Order information is incomplete.",ar:"معلومات الطلب غير مكتملة."},
  invalidItems:{fr:"Articles invalides.",en:"Invalid items.",ar:"عناصر الطلب غير صالحة."},
  noneAvailable:{fr:"Aucun article disponible.",en:"No available items.",ar:"لا توجد عناصر متاحة."},
  dbOrder:{fr:"Commande prête pour WhatsApp.",en:"Order ready for WhatsApp.",ar:"الطلب جاهز لواتساب."},
  trackingCloudflare:{fr:"Le suivi détaillé sera actif sur Cloudflare.",en:"Detailed tracking will be active on Cloudflare.",ar:"سيتم تفعيل التتبع التفصيلي على Cloudflare."},
  orderMissing:{fr:"Commande introuvable.",en:"Order not found.",ar:"الطلب غير موجود."},
  incompleteReservation:{fr:"Informations de réservation incomplètes.",en:"Reservation information is incomplete.",ar:"معلومات الحجز غير مكتملة."},
  dbReservation:{fr:"Demande prête pour WhatsApp.",en:"Reservation ready for WhatsApp.",ar:"طلب الحجز جاهز لواتساب."},
  nameInvalid:{fr:"Indiquez votre nom complet.",en:"Enter your full name.",ar:"أدخل اسمك الكامل."},
  contactRequired:{fr:"Ajoutez un email ou un numéro de téléphone.",en:"Add an email or phone number.",ar:"أضف البريد الإلكتروني أو رقم الهاتف."},
  emailInvalid:{fr:"Adresse email invalide.",en:"Invalid email address.",ar:"عنوان البريد الإلكتروني غير صالح."},
  phoneInvalid:{fr:"Numéro de téléphone invalide.",en:"Invalid phone number.",ar:"رقم الهاتف غير صالح."},
  passwordInvalid:{fr:"Le mot de passe doit contenir entre 8 et 128 caractères.",en:"The password must contain 8 to 128 characters.",ar:"يجب أن تتراوح كلمة المرور بين ٨ و١٢٨ حرفاً."},
  accountExists:{fr:"Un compte existe déjà avec cet email ou ce téléphone. Connectez-vous.",en:"An account already exists with this email or phone. Sign in.",ar:"يوجد حساب بهذا البريد أو الهاتف. سجّل الدخول."},
  dbAccount:{fr:"Le compte client nécessite la base Cloudflare D1.",en:"Customer accounts require Cloudflare D1.",ar:"تتطلب حسابات العملاء قاعدة Cloudflare D1."},
  identifierRequired:{fr:"Identifiant et mot de passe requis.",en:"Identifier and password are required.",ar:"البريد أو الهاتف وكلمة المرور مطلوبان."},
  credentialsInvalid:{fr:"Identifiants incorrects.",en:"Incorrect credentials.",ar:"بيانات تسجيل الدخول غير صحيحة."},emailConfirm:{fr:"Les deux emails doivent être identiques.",en:"The two email addresses must match.",ar:"يجب أن يتطابق عنوانا البريد الإلكتروني."},emailDomain:{fr:"Le domaine email ne semble pas accepter les emails.",en:"The email domain does not appear to accept email.",ar:"يبدو أن نطاق البريد الإلكتروني لا يستقبل رسائل البريد."},phoneFormat:{fr:"Numéro de téléphone invalide pour cet indicatif.",en:"Phone number is invalid for this country code.",ar:"رقم الهاتف غير صالح لهذا الرمز."}
};
function localeFromRequest(request:Request):ServerLocale{
  const match=request.headers.get("cookie")?.match(/(?:^|;\s*)menushish_locale=(fr|en|ar)(?:;|$)/)?.[1];
  return match==="en"||match==="ar"?match:"fr";
}
export function apiMessage(request:Request,key:string){const l=localeFromRequest(request);return messages[key]?.[l]??messages[key]?.fr??key;}
