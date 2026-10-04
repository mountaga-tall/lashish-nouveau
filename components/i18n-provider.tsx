"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export type Locale = "fr" | "en" | "ar";

type Dict = Record<string, string>;

const dictionaries: Record<Locale, Dict> = {
  fr: {
    "nav.menu":"Menu","nav.reserve":"Réserver","nav.favorites":"Favoris","nav.order":"Ma commande","nav.account":"Compte","nav.contact":"Contact",
    "nav.cart":"Panier","nav.call":"Appeler","nav.whatsapp":"WhatsApp","nav.loyalty":"Fidélité","nav.promos":"Promotions","nav.find":"Nous trouver",
    "nav.accountSpace":"Mon espace","nav.close":"Fermer le menu","nav.open":"Ouvrir le menu","lang.label":"Langue",
    "home.eyebrow":"La Shish • Abidjan","home.title1":"L’expérience","home.title2":"Shish commence ici.","home.description":"Un menu digital premium, rapide, élégant et pensé pour commander, réserver et retrouver vos favoris.",
    "home.menu":"Découvrir le menu","home.reserve":"Réserver une table","home.explore":"Explorer","home.menuElse":"Le menu, autrement.","home.allProducts":"Voir les 253 produits →",
    "home.selection":"Sélection La Shish","home.exploreArrow":"Explorer →","home.tasting":"À goûter","home.favorites":"Nos favoris du moment","home.fullMenu":"Tout le menu →",
    "home.moreThanMenu":"Plus qu’un menu","home.moreTitle":"Commandez, réservez, retrouvez vos favoris.","home.moreDesc":"Une seule expérience pour le menu, la commande, le compte client, la fidélité et la réservation.",
    "home.order":"Commander","home.find":"Nous trouver","home.goodToKnow":"Bon à savoir","home.mobile":"Mobile-first et ultra rapide","home.pwa":"PWA installable","home.products":"253 produits déjà récupérés","home.account":"Compte client + fidélité",
    "menu.digital":"Carte digitale","menu.title":"Le menu La Shish.","menu.desc":"Recherche instantanée, catégories et accès direct à la commande. Les 253 produits existants sont déjà importés.",
    "menu.search":"Rechercher un plat, une pizza, une boisson…","menu.all":"Tous","menu.result":"résultat","menu.results":"résultats","menu.myOrder":"Voir ma commande →",
    "menu.chooseSize":"Choisir une taille","menu.add":"Ajouter au panier","menu.added":"Ajouté ✓","menu.details":"Détails",
    "category.back":"← Toutes les catégories","category.label":"Catégorie","category.product":"produit","category.products":"produits","category.view":"Voir le produit →",
    "product.back":"← Retour au menu","product.size":"Choisir une taille","product.from":"À partir de","product.available":"Disponible","product.unavailable":"Indisponible","product.add":"Ajouter au panier","product.added":"Ajouté au panier ✓","product.missing":"Produit introuvable","product.ref":"Référence produit",
    "order.label":"Ma commande","order.title":"Votre panier.","order.desc":"Le panier reste disponible pendant votre navigation et est conservé sur cet appareil.",
    "order.empty":"Aucun article pour le moment.","order.emptyTitle":"Votre prochaine commande commence avec le menu.","order.explore":"Explorer le menu","order.selection":"Votre sélection","order.clear":"Vider",
    "order.info":"Informations de commande","order.name":"Nom complet","order.phone":"Téléphone","order.fulfillment":"Mode de retrait","order.pickup":"À emporter","order.onsite":"Sur place","order.delivery":"Livraison",
    "order.address":"Adresse / quartier","order.notes":"Note pour le restaurant","order.summary":"Récapitulatif","order.subtotal":"Sous-total","order.deliveryFee":"Livraison","order.toConfirm":"À confirmer","order.total":"Total","order.prepare":"Préparation…","order.whatsapp":"Commander sur WhatsApp",
    "tracking.label":"Suivi","tracking.order":"Commande","tracking.status":"Statut","tracking.total":"Total :","tracking.error":"Impossible de charger le suivi.",
    "status.received":"Commande reçue","status.preparing":"En préparation","status.ready":"Prête","status.delivering":"En livraison","status.completed":"Terminée","status.pending":"En attente","status.confirmed":"Confirmée","status.cancelled":"Annulée",
    "account.eyebrow":"Espace client","account.title":"Mon espace.","account.desc":"Créez votre compte pour retrouver vos commandes, réservations et points de fidélité sur tous vos passages.",
    "account.customer":"Compte client","account.welcome":"Bienvenue.","account.createSpace":"Créez votre espace.","account.secure":"Retrouvez vos commandes, réservations et points de fidélité grâce à un compte sécurisé.",
    "account.ordersHistory":"Historique des commandes","account.reservationsHistory":"Historique des réservations","account.loyaltyLinked":"Fidélité reliée au compte",
    "account.login":"Se connecter","account.register":"Créer un compte","account.fullName":"Nom complet","account.email":"Email","account.confirmEmail":"Confirmer l’email","account.optional":"facultatif","account.phone":"Téléphone","account.countryCode":"Indicatif","account.verification":"Vérification","account.verifiedFormat":"Format vérifié","account.emailDomainInvalid":"Domaine email invalide.","account.phoneHelp":"Choisissez l’indicatif puis saisissez le numéro local.","account.contactUnique":"Cet email ou ce numéro est déjà utilisé.","account.phoneInvalid":"Numéro invalide pour cet indicatif.","account.emailMismatch":"Les emails ne correspondent pas.",
    "account.identifier":"Email ou téléphone","account.password":"Mot de passe","account.processing":"Traitement…","account.create":"Créer mon compte","account.passwordNote":"Aucun mot de passe n’est conservé en clair.","account.needContact":"Ajoutez un email ou un numéro de téléphone.",
    "account.active":"Compte activé","account.logout":"Déconnexion","account.orders":"Commandes","account.reservations":"Réservations","account.points":"Points","account.myOrders":"Mes commandes","account.orderNow":"Commander →",
    "account.noneOrders":"Aucune commande enregistrée pour le moment.","account.myReservations":"Mes réservations","account.reserveNow":"Réserver →","account.noneReservations":"Aucune réservation enregistrée pour le moment.",
    "account.person":"personne","account.people":"personnes","account.loyalty":"Ma fidélité","account.totalPoints":"Total cumulé :","account.seeLoyalty":"Voir la fidélité",
    "favorites.eyebrow":"Espace client","favorites.title":"Mes favoris.","favorites.empty":"Votre liste est vide pour le moment.","favorites.emptyTitle":"Ajoutez vos incontournables depuis le menu.","favorites.explore":"Explorer le menu","favorites.view":"Voir le produit",
    "contact.eyebrow":"Contact","contact.title":"Nous trouver.","contact.phone":"Téléphone →","contact.address":"Voie de la Djibi, Abidjan","contact.whatsapp":"WhatsApp →",
    "reserve.eyebrow":"Réservation","reserve.title":"Votre table vous attend.","reserve.desc":"Choisissez votre créneau et envoyez la demande directement au restaurant.",
    "reserve.name":"Nom","reserve.phone":"Téléphone","reserve.failed":"Impossible d’envoyer la réservation.","reserve.date":"Date","reserve.time":"Heure","reserve.people":"Nombre de personnes","reserve.special":"Demande particulière","reserve.specialPlaceholder":"Anniversaire, emplacement souhaité, etc.","reserve.send":"Envoyer la demande sur WhatsApp",
    "loyalty.eyebrow":"Programme client","loyalty.title":"Votre fidélité mérite plus.","loyalty.current":"Solde actuel","loyalty.desc":"Le moteur de points est relié à votre compte client et à l’historique des commandes.",
    "promos.eyebrow":"Offres","promos.title":"Les bons plans.","promos.soon":"Bientôt","promos.sub":"Des offres ciblées, pas du spam.","promos.desc":"Les promotions pourront être programmées par catégorie, produit, période ou profil client.",
    "footer.tag":"La nouvelle expérience digitale La Shish. Menu, commande, réservation et fidélité dans un seul espace.","footer.nav":"Navigation","footer.contact":"Contact & réseaux","footer.legal":"© 2026 Menu Shish — La Shish Abidjan.","notfound.title":"Cette page n’existe pas.","notfound.desc":"Retournez au menu pour retrouver votre prochaine commande.","notfound.back":"Retour au menu",
    "brand":"MENU SHISH"
  },
  en: {
    "nav.menu":"Menu","nav.reserve":"Reserve","nav.favorites":"Favorites","nav.order":"My order","nav.account":"Account","nav.contact":"Contact",
    "nav.cart":"Cart","nav.call":"Call","nav.whatsapp":"WhatsApp","nav.loyalty":"Loyalty","nav.promos":"Offers","nav.find":"Find us",
    "nav.accountSpace":"My space","nav.close":"Close menu","nav.open":"Open menu","lang.label":"Language",
    "home.eyebrow":"La Shish • Abidjan","home.title1":"The Shish","home.title2":"experience starts here.","home.description":"A premium digital menu that is fast, elegant and built for ordering, reservations and favorites.",
    "home.menu":"Explore the menu","home.reserve":"Reserve a table","home.explore":"Explore","home.menuElse":"The menu, reimagined.","home.allProducts":"See all 253 products →",
    "home.selection":"La Shish selection","home.exploreArrow":"Explore →","home.tasting":"Must-try","home.favorites":"Our favorites right now","home.fullMenu":"Full menu →",
    "home.moreThanMenu":"More than a menu","home.moreTitle":"Order, reserve, and keep your favorites.","home.moreDesc":"One experience for the menu, ordering, customer account, loyalty and reservations.",
    "home.order":"Order","home.find":"Find us","home.goodToKnow":"Good to know","home.mobile":"Mobile-first and ultra fast","home.pwa":"Installable PWA","home.products":"253 products imported","home.account":"Customer account + loyalty",
    "menu.digital":"Digital menu","menu.title":"The La Shish menu.","menu.desc":"Instant search, categories and direct access to ordering. All 253 existing products are already imported.",
    "menu.search":"Search a dish, pizza, drink…","menu.all":"All","menu.result":"result","menu.results":"results","menu.myOrder":"View my order →",
    "menu.chooseSize":"Choose a size","menu.add":"Add to cart","menu.added":"Added ✓","menu.details":"Details",
    "category.back":"← All categories","category.label":"Category","category.product":"product","category.products":"products","category.view":"View product →",
    "product.back":"← Back to menu","product.size":"Choose a size","product.from":"Starting at","product.available":"Available","product.unavailable":"Unavailable","product.add":"Add to cart","product.added":"Added to cart ✓","product.missing":"Product not found","product.ref":"Product reference",
    "order.label":"My order","order.title":"Your cart.","order.desc":"Your cart stays available while you browse and is saved on this device.",
    "order.empty":"No items yet.","order.emptyTitle":"Your next order starts with the menu.","order.explore":"Explore the menu","order.selection":"Your selection","order.clear":"Clear",
    "order.info":"Order information","order.name":"Full name","order.phone":"Phone","order.fulfillment":"Fulfillment","order.pickup":"Takeaway","order.onsite":"Dine-in","order.delivery":"Delivery",
    "order.address":"Address / area","order.notes":"Note for the restaurant","order.summary":"Summary","order.subtotal":"Subtotal","order.deliveryFee":"Delivery","order.toConfirm":"To confirm","order.total":"Total","order.prepare":"Preparing…","order.whatsapp":"Order on WhatsApp",
    "tracking.label":"Tracking","tracking.order":"Order","tracking.status":"Status","tracking.total":"Total:","tracking.error":"Unable to load tracking.",
    "status.received":"Order received","status.preparing":"Preparing","status.ready":"Ready","status.delivering":"Out for delivery","status.completed":"Completed","status.pending":"Pending","status.confirmed":"Confirmed","status.cancelled":"Cancelled",
    "account.eyebrow":"Customer space","account.title":"My account.","account.desc":"Create your account to keep your orders, reservations and loyalty points with you.",
    "account.customer":"Customer account","account.welcome":"Welcome.","account.createSpace":"Create your space.","account.secure":"Keep your orders, reservations and loyalty points with a secure customer account.",
    "account.ordersHistory":"Order history","account.reservationsHistory":"Reservation history","account.loyaltyLinked":"Loyalty linked to account",
    "account.login":"Sign in","account.register":"Create account","account.fullName":"Full name","account.email":"Email","account.confirmEmail":"Confirm email","account.optional":"optional","account.phone":"Phone","account.countryCode":"Country code","account.verification":"Verification","account.verifiedFormat":"Format verified","account.emailDomainInvalid":"Invalid email domain.","account.phoneHelp":"Choose the country code, then enter the local number.","account.contactUnique":"This email or phone number is already used.","account.phoneInvalid":"Phone number is invalid for this country code.","account.emailMismatch":"The email addresses do not match.",
    "account.identifier":"Email or phone","account.password":"Password","account.processing":"Processing…","account.create":"Create my account","account.passwordNote":"Your password is never stored in plain text.","account.needContact":"Add an email or phone number.",
    "account.active":"Account active","account.logout":"Sign out","account.orders":"Orders","account.reservations":"Reservations","account.points":"Points","account.myOrders":"My orders","account.orderNow":"Order →",
    "account.noneOrders":"No orders recorded yet.","account.myReservations":"My reservations","account.reserveNow":"Reserve →","account.noneReservations":"No reservations recorded yet.",
    "account.person":"person","account.people":"people","account.loyalty":"My loyalty","account.totalPoints":"Lifetime total:","account.seeLoyalty":"View loyalty",
    "favorites.eyebrow":"Customer space","favorites.title":"My favorites.","favorites.empty":"Your list is empty for now.","favorites.emptyTitle":"Add your favorites from the menu.","favorites.explore":"Explore the menu","favorites.view":"View product",
    "contact.eyebrow":"Contact","contact.title":"Find us.","contact.phone":"Phone →","contact.address":"Voie de la Djibi, Abidjan","contact.whatsapp":"WhatsApp →",
    "reserve.eyebrow":"Reservation","reserve.title":"Your table is waiting.","reserve.desc":"Choose a time slot and send the request directly to the restaurant.",
    "reserve.name":"Name","reserve.phone":"Phone","reserve.failed":"Unable to send the reservation.","reserve.date":"Date","reserve.time":"Time","reserve.people":"Number of people","reserve.special":"Special request","reserve.specialPlaceholder":"Birthday, preferred seating, etc.","reserve.send":"Send request on WhatsApp",
    "loyalty.eyebrow":"Customer program","loyalty.title":"Your loyalty deserves more.","loyalty.current":"Current balance","loyalty.desc":"Points are connected to your customer account and order history.",
    "promos.eyebrow":"Offers","promos.title":"Good deals.","promos.soon":"Coming soon","promos.sub":"Targeted offers, never spam.","promos.desc":"Promotions can be scheduled by category, product, period or customer profile.",
    "footer.tag":"The new La Shish digital experience. Menu, ordering, reservations and loyalty in one place.","footer.nav":"Navigation","footer.contact":"Contact & social","footer.legal":"© 2026 Menu Shish — La Shish Abidjan.",
    "brand":"MENU SHISH"
  },
  ar: {
    "nav.menu":"القائمة","nav.reserve":"احجز","nav.favorites":"المفضلة","nav.order":"طلبي","nav.account":"حسابي","nav.contact":"تواصل معنا",
    "nav.cart":"السلة","nav.call":"اتصل","nav.whatsapp":"واتساب","nav.loyalty":"الولاء","nav.promos":"العروض","nav.find":"موقعنا",
    "nav.accountSpace":"مساحتي","nav.close":"إغلاق القائمة","nav.open":"فتح القائمة","lang.label":"اللغة",
    "home.eyebrow":"La Shish • أبيدجان","home.title1":"تجربة","home.title2":"Shish تبدأ من هنا.","home.description":"قائمة رقمية راقية وسريعة وأنيقة للطلب والحجز وحفظ أطباقك المفضلة.",
    "home.menu":"اكتشف القائمة","home.reserve":"احجز طاولة","home.explore":"استكشف","home.menuElse":"القائمة بطريقة مختلفة.","home.allProducts":"عرض جميع المنتجات الـ ٢٥٣ →",
    "home.selection":"اختيارات La Shish","home.exploreArrow":"استكشف →","home.tasting":"جرّبها","home.favorites":"مفضلاتنا الآن","home.fullMenu":"القائمة كاملة →",
    "home.moreThanMenu":"أكثر من مجرد قائمة","home.moreTitle":"اطلب واحجز واحتفظ بمفضلاتك.","home.moreDesc":"تجربة واحدة تجمع القائمة والطلب وحساب العميل وبرنامج الولاء والحجوزات.",
    "home.order":"اطلب الآن","home.find":"موقعنا","home.goodToKnow":"معلومات مهمة","home.mobile":"مصممة للهاتف وسريعة جداً","home.pwa":"تطبيق PWA قابل للتثبيت","home.products":"تم استيراد ٢٥٣ منتجاً","home.account":"حساب العميل + الولاء",
    "menu.digital":"القائمة الرقمية","menu.title":"قائمة La Shish.","menu.desc":"بحث فوري وفئات ووصول مباشر للطلب. تم استيراد جميع المنتجات الـ ٢٥٣.",
    "menu.search":"ابحث عن طبق أو بيتزا أو مشروب…","menu.all":"الكل","menu.result":"نتيجة","menu.results":"نتائج","menu.myOrder":"عرض طلبي →",
    "menu.chooseSize":"اختر الحجم","menu.add":"أضف إلى السلة","menu.added":"تمت الإضافة ✓","menu.details":"التفاصيل",
    "category.back":"← كل الفئات","category.label":"الفئة","category.product":"منتج","category.products":"منتجات","category.view":"عرض المنتج →",
    "product.back":"← العودة إلى القائمة","product.size":"اختر الحجم","product.from":"ابتداءً من","product.available":"متوفر","product.unavailable":"غير متوفر","product.add":"أضف إلى السلة","product.added":"تمت الإضافة ✓","product.missing":"المنتج غير موجود","product.ref":"مرجع المنتج",
    "order.label":"طلبي","order.title":"سلتك.","order.desc":"تبقى سلتك محفوظة أثناء التصفح وعلى هذا الجهاز.",
    "order.empty":"لا توجد منتجات بعد.","order.emptyTitle":"طلبك القادم يبدأ من القائمة.","order.explore":"استكشف القائمة","order.selection":"اختياراتك","order.clear":"إفراغ السلة",
    "order.info":"معلومات الطلب","order.name":"الاسم الكامل","order.phone":"الهاتف","order.fulfillment":"طريقة الاستلام","order.pickup":"استلام خارجي","order.onsite":"في المطعم","order.delivery":"توصيل",
    "order.address":"العنوان / الحي","order.notes":"ملاحظة للمطعم","order.summary":"ملخص الطلب","order.subtotal":"المجموع الفرعي","order.deliveryFee":"التوصيل","order.toConfirm":"يُحدد لاحقاً","order.total":"الإجمالي","order.prepare":"جارٍ التحضير…","order.whatsapp":"اطلب عبر واتساب",
    "tracking.label":"تتبع","tracking.order":"الطلب","tracking.status":"الحالة","tracking.total":"الإجمالي:","tracking.error":"تعذر تحميل التتبع.",
    "status.received":"تم استلام الطلب","status.preparing":"قيد التحضير","status.ready":"جاهز","status.delivering":"في الطريق","status.completed":"مكتمل","status.pending":"قيد الانتظار","status.confirmed":"مؤكد","status.cancelled":"ملغى",
    "account.eyebrow":"مساحة العميل","account.title":"حسابي.","account.desc":"أنشئ حسابك للاحتفاظ بطلباتك وحجوزاتك ونقاط الولاء.",
    "account.customer":"حساب العميل","account.welcome":"مرحباً.","account.createSpace":"أنشئ مساحتك.","account.secure":"احتفظ بطلباتك وحجوزاتك ونقاط الولاء من خلال حساب آمن.",
    "account.ordersHistory":"سجل الطلبات","account.reservationsHistory":"سجل الحجوزات","account.loyaltyLinked":"الولاء مرتبط بالحساب",
    "account.login":"تسجيل الدخول","account.register":"إنشاء حساب","account.fullName":"الاسم الكامل","account.email":"البريد الإلكتروني","account.confirmEmail":"تأكيد البريد الإلكتروني","account.optional":"اختياري","account.phone":"رقم الهاتف","account.countryCode":"رمز الدولة","account.verification":"التحقق","account.verifiedFormat":"تم التحقق من الصيغة","account.emailDomainInvalid":"نطاق البريد الإلكتروني غير صالح.","account.phoneHelp":"اختر رمز الدولة ثم أدخل الرقم المحلي.","account.contactUnique":"هذا البريد أو رقم الهاتف مستخدم بالفعل.","account.phoneInvalid":"رقم الهاتف غير صالح لهذا الرمز.","account.emailMismatch":"عناوین البريد الإلكتروني غير متطابقة.",
    "account.identifier":"البريد أو الهاتف","account.password":"كلمة المرور","account.processing":"جارٍ المعالجة…","account.create":"إنشاء حسابي","account.passwordNote":"لا يتم حفظ كلمة المرور كنص واضح.","account.needContact":"أضف البريد الإلكتروني أو رقم الهاتف.",
    "account.active":"الحساب مفعّل","account.logout":"تسجيل الخروج","account.orders":"الطلبات","account.reservations":"الحجوزات","account.points":"النقاط","account.myOrders":"طلباتي","account.orderNow":"اطلب الآن →",
    "account.noneOrders":"لا توجد طلبات مسجلة حتى الآن.","account.myReservations":"حجوزاتي","account.reserveNow":"احجز الآن →","account.noneReservations":"لا توجد حجوزات مسجلة حتى الآن.",
    "account.person":"شخص","account.people":"أشخاص","account.loyalty":"ولائي","account.totalPoints":"الإجمالي المتراكم:","account.seeLoyalty":"عرض الولاء",
    "favorites.eyebrow":"مساحة العميل","favorites.title":"مفضلاتي.","favorites.empty":"قائمتك فارغة حالياً.","favorites.emptyTitle":"أضف أطباقك المفضلة من القائمة.","favorites.explore":"استكشف القائمة","favorites.view":"عرض المنتج",
    "contact.eyebrow":"تواصل معنا","contact.title":"موقعنا.","contact.phone":"الهاتف →","contact.address":"Voie de la Djibi، أبيدجان","contact.whatsapp":"واتساب →",
    "reserve.eyebrow":"الحجز","reserve.title":"طاولتك بانتظارك.","reserve.desc":"اختر موعدك وأرسل الطلب مباشرة إلى المطعم.",
    "reserve.name":"الاسم","reserve.phone":"رقم الهاتف","reserve.failed":"تعذر إرسال الحجز.","reserve.date":"التاريخ","reserve.time":"الوقت","reserve.people":"عدد الأشخاص","reserve.special":"طلب خاص","reserve.specialPlaceholder":"عيد ميلاد، مكان مفضل، إلخ.","reserve.send":"إرسال الطلب عبر واتساب",
    "loyalty.eyebrow":"برنامج العملاء","loyalty.title":"ولاؤك يستحق المزيد.","loyalty.current":"الرصيد الحالي","loyalty.desc":"النقاط مرتبطة بحساب العميل وسجل الطلبات.",
    "promos.eyebrow":"العروض","promos.title":"أفضل العروض.","promos.soon":"قريباً","promos.sub":"عروض مخصصة بلا إزعاج.","promos.desc":"يمكن جدولة العروض حسب الفئة أو المنتج أو الفترة أو ملف العميل.",
    "footer.tag":"التجربة الرقمية الجديدة لـ La Shish. القائمة والطلبات والحجوزات والولاء في مساحة واحدة.","footer.nav":"التنقل","footer.contact":"التواصل والشبكات","footer.legal":"© ٢٠٢٦ Menu Shish — La Shish Abidjan.","notfound.title":"هذه الصفحة غير موجودة.","notfound.desc":"ارجع إلى القائمة للعثور على طلبك القادم.","notfound.back":"العودة إلى القائمة",
    "brand":"MENU SHISH"
  }
};

const menuLabels: Record<string, Record<Locale, string>> = {
  "Boisson": { fr:"Boisson", en:"Beverages", ar:"المشروبات" },
  "Cocktail": { fr:"Cocktail", en:"Cocktails", ar:"كوكتيلات" },
  "Dessert": { fr:"Dessert", en:"Desserts", ar:"الحلويات" },
  "Entrée froide": { fr:"Entrée froide", en:"Cold starters", ar:"مقبلات باردة" },
  "Petit Déjeuner": { fr:"Petit Déjeuner", en:"Breakfast", ar:"الفطور" },
  "Pizza": { fr:"Pizza", en:"Pizza", ar:"البيتزا" },
  "Nos plats": { fr:"Nos plats", en:"Main dishes", ar:"أطباقنا" },
  "Snack gourmand": { fr:"Snack gourmand", en:"Gourmet snacks", ar:"وجبات خفيفة" },
  "Spécialités": { fr:"Spécialités", en:"Specialties", ar:"التخصصات" },
  "French Tacos": { fr:"French Tacos", en:"French Tacos", ar:"فرنش تاكوس" },
  "Vin Et Liqueur": { fr:"Vin et liqueur", en:"Wine & spirits", ar:"النبيذ والمشروبات" },
  "Boisson Chaude": { fr:"Boisson Chaude", en:"Hot drinks", ar:"مشروبات ساخنة" },
  "Boisson Froide": { fr:"Boisson Froide", en:"Cold drinks", ar:"مشروبات باردة" },
  "Jus de fruit naturel": { fr:"Jus de fruit naturel", en:"Fresh fruit juice", ar:"عصائر طبيعية" },
  "Smoothie": { fr:"Smoothie", en:"Smoothies", ar:"سموثي" },
  "Milkshake et frappé": { fr:"Milkshake et frappé", en:"Milkshakes & frappés", ar:"ميلك شيك وفرابيه" },
  "Thé glacé": { fr:"Thé glacé", en:"Iced tea", ar:"شاي مثلج" },
  "Special Mojito": { fr:"Special Mojito", en:"Special Mojito", ar:"موهيتو خاص" },
  "Special Limonade": { fr:"Special Limonade", en:"Special Lemonade", ar:"ليمونادة خاصة" },
  "Cocktail et Mocktails": { fr:"Cocktail et Mocktails", en:"Cocktails & Mocktails", ar:"كوكتيلات وموكتيل" },
  "Shooters": { fr:"Shooters", en:"Shooters", ar:"شوتر" },
  "Crêpe": { fr:"Crêpe", en:"Crêpes", ar:"كريب" },
  "Coupe de glace": { fr:"Coupe de glace", en:"Ice cream cups", ar:"آيس كريم" },
  "Mezzah froide": { fr:"Mezzah froide", en:"Cold mezze", ar:"مزة باردة" },
  "Mezzah chaude": { fr:"Mezzah chaude", en:"Hot mezze", ar:"مزة ساخنة" },
  "Salades": { fr:"Salades", en:"Salads", ar:"سلطات" },
  "Formule": { fr:"Formule", en:"Set menu", ar:"وجبة" },
  "Omelette": { fr:"Omelette", en:"Omelette", ar:"عجة" },
  "Croque & Club": { fr:"Croque & Club", en:"Croque & Club", ar:"كروك وكلوب" },
  "Manaiche": { fr:"Manaiche", en:"Manakish", ar:"مناقيش" },
  "Pizzas": { fr:"Pizzas", en:"Pizzas", ar:"بيتزا" },
  "Nos pâtes": { fr:"Nos pâtes", en:"Pasta", ar:"المعكرونة" },
  "Nos riz": { fr:"Nos riz", en:"Rice dishes", ar:"أطباق الأرز" },
  "Nos brochettes": { fr:"Nos brochettes", en:"Skewers", ar:"مشاوي" },
  "Plats snack": { fr:"Plats snack", en:"Snack plates", ar:"أطباق خفيفة" },
  "Burgers": { fr:"Burgers", en:"Burgers", ar:"برغر" },
  "Hot dog": { fr:"Hot dog", en:"Hot dogs", ar:"هوت دوغ" },
  "Kebab": { fr:"Kebab", en:"Kebab", ar:"كباب" },
  "Sandwich": { fr:"Sandwich", en:"Sandwiches", ar:"ساندويتش" },
  "Africaine": { fr:"Africaine", en:"African", ar:"أفريقية" },
  "Vin Rouge": { fr:"Vin Rouge", en:"Red wine", ar:"نبيذ أحمر" },
  "Vin Blanc": { fr:"Vin Blanc", en:"White wine", ar:"نبيذ أبيض" },
  "Vin Rosé": { fr:"Vin Rosé", en:"Rosé wine", ar:"نبيذ وردي" },
  "Liqueur": { fr:"Liqueur", en:"Liqueur", ar:"مشروبات روحية" },
  "Champagne Et Mousseux": { fr:"Champagne Et Mousseux", en:"Champagne & sparkling", ar:"شمبانيا ومشروبات فوارة" }
};

type I18nContext = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  number: (value: number) => string;
  money: (value: number) => string;
  date: (value: string) => string;
};

const I18n = createContext<I18nContext | null>(null);

function pathLocale(): Locale | null { if (typeof window === "undefined") return null; const match = window.location.pathname.match(/^\/(fr|en|ar)(?:\/|$)/); return (match?.[1] as Locale | undefined) ?? null; }
function readInitialLocale(): Locale {
  if (typeof window === "undefined") return "fr";
  const fromPath = pathLocale();
  if (fromPath) return fromPath;
  const saved = window.localStorage.getItem("menushish_locale");
  if (saved === "fr" || saved === "en" || saved === "ar") return saved;
  const browser = navigator.language.toLowerCase();
  return browser.startsWith("ar") ? "ar" : browser.startsWith("en") ? "en" : "fr";
}

function replaceDigits(root: Node, locale: Locale) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let node = walker.nextNode() as Text | null;
  while (node) {
    const parent = node.parentElement;
    if (parent && !["SCRIPT","STYLE","INPUT","TEXTAREA","SELECT"].includes(parent.tagName) && !parent.isContentEditable) nodes.push(node);
    node = walker.nextNode() as Text | null;
  }
  const toArabic = (value: string) => value.replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);
  const toLatin = (value: string) => value.replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
  for (const text of nodes) {
    const current = text.nodeValue || "";
    const next = locale === "ar" ? toArabic(current) : toLatin(current);
    if (next !== current) text.nodeValue = next;
  }
}

const titles: Record<string, Record<Locale, string>> = {
  "/": { fr:"Menu Shish — La Shish Abidjan", en:"Menu Shish — La Shish Abidjan", ar:"Menu Shish — La Shish أبيدجان" },
  "/menu": { fr:"Menu — Menu Shish", en:"Menu — Menu Shish", ar:"القائمة — Menu Shish" },
  "/commande": { fr:"Ma commande — Menu Shish", en:"My order — Menu Shish", ar:"طلبي — Menu Shish" },
  "/compte": { fr:"Mon espace — Menu Shish", en:"My account — Menu Shish", ar:"حسابي — Menu Shish" },
  "/favoris": { fr:"Mes favoris — Menu Shish", en:"My favorites — Menu Shish", ar:"مفضلاتي — Menu Shish" },
  "/reserver": { fr:"Réserver — Menu Shish", en:"Reserve — Menu Shish", ar:"الحجز — Menu Shish" },
  "/contact": { fr:"Contact — Menu Shish", en:"Contact — Menu Shish", ar:"تواصل معنا — Menu Shish" },
  "/fidelite": { fr:"Fidélité — Menu Shish", en:"Loyalty — Menu Shish", ar:"الولاء — Menu Shish" },
  "/promotions": { fr:"Promotions — Menu Shish", en:"Offers — Menu Shish", ar:"العروض — Menu Shish" }
};

export function toArabicDigits(value: string | number) {
  return String(value).replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);
}

export function menuLabel(value: string) {
  return menuLabels[value] ?? { fr:value, en:value, ar:value };
}

export function I18nText({ fr, en, ar, className="" }: { fr:string; en:string; ar:string; className?:string }) {
 const { locale }=useI18n();
 return <span className={className}>{locale==="ar"?ar:locale==="en"?en:fr}</span>;
}

export function LanguageSwitcher({ compact=false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const index = ["fr","en","ar"].indexOf(locale);
  const choose = (next:Locale) => {
    if(next===locale)return;
    setLocale(next);
    const stripped = pathname.replace(/^\/(fr|en|ar)(?=\/|$)/,"") || "";
    router.push("/"+next+stripped);
  };
  return <div aria-label={t("lang.label")} className={"language-switcher relative grid grid-cols-3 items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 " + (compact ? "w-[132px]" : "w-[176px]")} dir="ltr">
    <span aria-hidden="true" className="language-switcher-pill pointer-events-none absolute bottom-1.5 top-1.5 left-1.5 w-[calc((100%-12px)/3)] rounded-full bg-[#d4b273] shadow-[0_0_24px_rgba(212,178,115,.35)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]" style={{transform:"translateX(calc("+index+" * (100% + 4px)))"}} />
    {(["fr","en","ar"] as Locale[]).map(item=><button key={item} type="button" onClick={()=>choose(item)} aria-pressed={locale===item} className={"relative z-10 min-h-9 rounded-full px-2 text-[10px] font-black uppercase tracking-[.16em] transition " + (locale===item ? "text-[#11100e]" : "text-white/65 hover:text-white")}>{item==="ar" ? "ع" : item.toUpperCase()}</button>)}
  </div>;
}

export function useI18n() {
  const value = useContext(I18n);
  if (!value) throw new Error("useI18n must be used inside I18nProvider");
  return value;
}

export default function I18nProvider({ children, initialLocale="fr" }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem("menushish_locale", next);
    document.cookie = "menushish_locale=" + next + "; Path=/; Max-Age=31536000; SameSite=Lax";
  };

  useEffect(() => {
    const saved = readInitialLocale();
    if (saved !== locale) { setLocaleState(saved); return; }
    document.documentElement.dataset.locale = locale;
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("data-language-ready", "true");

    const path = window.location.pathname.replace(/^\/(fr|en|ar)(?=\/|$)/,"") || "/";
    const exact = titles[path];
    if (exact) document.title = exact[locale];

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content",
        locale === "fr"
          ? "Le menu digital premium de La Shish à Abidjan : découvrez, commandez, réservez et profitez de vos favoris."
          : locale === "en"
            ? "La Shish premium digital menu in Abidjan: discover, order, reserve and keep your favorites."
            : "القائمة الرقمية الراقية لـ La Shish في أبيدجان: اكتشف واطلب واحجز واحتفظ بمفضلاتك."
      );
    }

    replaceDigits(document.body, locale);
    const observer = new MutationObserver(() => replaceDigits(document.body, locale));
    observer.observe(document.body, { subtree:true, childList:true, characterData:true });
    return () => observer.disconnect();
  }, [locale]);

  const value = useMemo<I18nContext>(() => ({
    locale,
    setLocale,
    t: (key) => dictionaries[locale][key] ?? dictionaries.fr[key] ?? key,
    number: (value) => new Intl.NumberFormat(locale === "ar" ? "ar-CI-u-nu-arab" : locale === "en" ? "en-US" : "fr-FR").format(value),
    money: (value) => new Intl.NumberFormat(locale === "ar" ? "ar-CI-u-nu-arab" : locale === "en" ? "en-US" : "fr-FR").format(value) + " F CFA",
    date: (value) => new Intl.DateTimeFormat(locale === "ar" ? "ar-CI-u-nu-arab" : locale === "en" ? "en-US" : "fr-FR", { dateStyle:"medium" }).format(new Date(value))
  }), [locale]);

  return <I18n.Provider value={value}>{children}</I18n.Provider>;
}
