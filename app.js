/* La Shish — fast multipage bilingual ordering app */
const WHATSAPP_NUMBER = "2250140555666";
const CART_KEY = "laShishCart";
const LANG_KEY = "laShishLanguage";
const CLIENT_KEY = "laShishClient";
const FAVORITES_KEY = "laShishFavorites";
const HISTORY_KEY = "laShishOrderHistory";

const I18N = {
  fr: {
    home:"Accueil", menu:"Menu", order:"Ma commande", contact:"Contact", catalog:"Toutes les catégories",
    heroKicker:"LA SHISH", heroTitle:"Le goût qui rassemble.", heroSubtitle:"Cuisine généreuse, service simple et commande directe sur WhatsApp.",
    heroCta:"Commander maintenant", discover:"Découvrir le menu", delivery:"Livraison", deliveryWho:"À la charge du client",
    deliveryNote:"Yango Livraison recommandé", payment:"Paiement Wave", paymentNote:"Lien envoyé après validation",
    paymentConfirm:"Commande confirmée sur WhatsApp", menuKicker:"NOTRE MENU", menuTitle:"Choisissez vos favoris",
    search:"Rechercher un plat, pizza, tacos…", clear:"Effacer", categoriesTitle:"CATÉGORIES", discoverCategory:"Découvrir la catégorie", featuredDish:"À découvrir", orderHero:"Commander directement", all:"Tout", emptySearch:"Aucun résultat",
    emptySearchNote:"Essayez un autre mot-clé ou réinitialisez la recherche.", viewMenu:"Voir tout le menu",
    selected:"VOTRE SÉLECTION", cartLive:"En direct", emptyCart:"Votre panier est vide.",
    emptyCartNote:"Ajoutez vos plats préférés pour commencer.", total:"Total", seeOrder:"Voir ma commande",
    add:"Ajouter au panier", customize:"Personnaliser", cancel:"Annuler", confirm:"Confirmer",
    size:"Taille", meat:"Viande", sauces:"Sauces", extras:"Suppléments", drink:"Boisson", side:"Garniture",
    chooseOne:"Choisissez une option", maxSauces:"2 sauces maximum",
    preparation:"Préparation : 10 à 30 min", deliveryHeading:"Livraison", required:"* obligatoire",
    name:"Nom du client *", phone:"Téléphone *", zone:"Quartier / zone *", address:"Adresse complète *",
    comment:"Commentaire ou précision (facultatif)", whatsapp:"Commander sur WhatsApp →",
    recap:"Votre commande sera récapitulée dans WhatsApp avant l’envoi.", fill:"Complétez nom, téléphone, zone et adresse",
    badPhone:"Vérifiez votre numéro de téléphone", empty:"Panier vide", article:"article", articles:"articles",
    added:"Article ajouté au panier 🛒", removed:"Article supprimé 🗑️", noImage:"Image indisponible",
    from:"Dès", aboutTitle:"Une cuisine à partager",
    aboutText:"Retrouvez les incontournables La Shish : petits-déjeuners, mezze, burgers, plats, pizzas, tacos, boissons et desserts.",
    contactTitle:"Nous contacter", contactText:"Pour une question, une précision de commande ou une demande de livraison, contactez-nous directement.",
    phoneLabel:"Téléphone", whatsappLabel:"WhatsApp", deliveryLabel:"Livraison", deliveryText:"Service de livraison pris en charge par le client.",
    waveLabel:"Paiement", waveText:"Paiement Wave avec lien envoyé après validation de la commande.",
    footer:"© La Shish — Commande en ligne", language:"Langue", categoryIntro:"Découvrez cette catégorie et commandez directement.", clientSpace:"Espace La Shish",clientSpaceNote:"Votre espace sur cet appareil",profile:"Profil",myOrder:"Ma commande",orderDetails:"Détails des commandes",favorites:"Favoris",notifications:"Notifications",coupons:"Coupons",address:"Adresse",message:"Message",guest:"Invité",saveProfile:"Enregistrer",profileSaved:"Profil enregistré",favoriteAdd:"Ajouter aux favoris",favoriteRemove:"Retirer des favoris",favoriteAdded:"Ajouté aux favoris",favoriteRemoved:"Retiré des favoris",noFavorites:"Aucun favori pour le moment.",noHistory:"Aucune commande précédente.",notificationsText:"Autorisez les notifications pour recevoir les alertes de l’application.",enableNotifications:"Activer les notifications",notificationsEnabled:"Notifications activées",notificationsUnsupported:"Notifications non disponibles sur cet appareil.",couponsText:"Les promotions et codes valides apparaîtront ici.",noAddress:"Aucune adresse enregistrée.",editAddress:"Modifier l’adresse",messageText:"Une question ? Écrivez-nous directement sur WhatsApp.",orderReady:"Votre commande est prête à être vérifiée."; breadcrumbLabel:"Fil d’Ariane", mapTitle:"Nous trouver", addressTitle:"Adresse", addressValue:"Riviera Bonoumin, Voie de la Djibi, Abidjan", directions:"Ouvrir dans Google Maps", websiteLabel:"Site Internet", websiteValue:"lashish.ci", followUs:"Suivez La Shish",
    loading:"Préparation de la page…", loadingError:"La page n’a pas pu être chargée. Actualisez pour réessayer.", categoryChoose:"Choisir une catégorie", categoryChooseNote:"Chaque catégorie possède sa propre page pour parcourir les produits plus facilement.", openMenu:"Ouvrir le menu", closeMenu:"Fermer le menu", heroTitle:"Le goût qui rassemble.", heroSubtitle:"Cuisine généreuse, service simple et commande directe sur WhatsApp.", heroCta:"Commander maintenant", search:"Rechercher un plat, pizza, tacos…", clear:"Effacer"
  },
  en: {
    home:"Home", menu:"Menu", order:"My order", contact:"Contact", catalog:"All categories",
    heroKicker:"LA SHISH", heroTitle:"Great taste, made to share.", heroSubtitle:"Generous food, simple service and direct ordering on WhatsApp.",
    heroCta:"Order now", discover:"Explore the menu", delivery:"Delivery", deliveryWho:"Paid by the customer",
    deliveryNote:"Yango Delivery recommended", payment:"Wave payment", paymentNote:"Link sent after validation",
    paymentConfirm:"Order confirmed on WhatsApp", menuKicker:"OUR MENU", menuTitle:"Choose your favorites",
    search:"Search a dish, pizza, tacos…", clear:"Clear", categoriesTitle:"CATEGORIES", discoverCategory:"Explore category", featuredDish:"Featured", orderHero:"Order directly", all:"All", emptySearch:"No results",
    emptySearchNote:"Try another keyword or reset the search.", viewMenu:"View full menu",
    selected:"YOUR SELECTION", cartLive:"Live", emptyCart:"Your cart is empty.",
    emptyCartNote:"Add your favorite dishes to get started.", total:"Total", seeOrder:"View my order",
    add:"Add to cart", customize:"Customize", cancel:"Cancel", confirm:"Confirm",
    size:"Size", meat:"Meat", sauces:"Sauces", extras:"Extras", drink:"Drink", side:"Side",
    chooseOne:"Choose an option", maxSauces:"Up to 2 sauces",
    preparation:"Preparation: 10 to 30 min", deliveryHeading:"Delivery", required:"* required",
    name:"Customer name *", phone:"Phone *", zone:"Area / neighborhood *", address:"Full address *",
    comment:"Comment or note (optional)", whatsapp:"Order on WhatsApp →",
    recap:"Your order will be summarized in WhatsApp before sending.", fill:"Complete name, phone, area and address",
    badPhone:"Please check your phone number", empty:"Empty cart", article:"item", articles:"items",
    added:"Added to cart 🛒", removed:"Item removed 🗑️", noImage:"Image unavailable",
    from:"From", aboutTitle:"Food made to share",
    aboutText:"Discover La Shish favorites: breakfast, mezze, burgers, mains, pizzas, tacos, drinks and desserts.",
    contactTitle:"Get in touch", contactText:"For questions, order details or delivery requests, contact us directly.",
    phoneLabel:"Phone", whatsappLabel:"WhatsApp", deliveryLabel:"Delivery", deliveryText:"Delivery service is paid by the customer.",
    waveLabel:"Payment", waveText:"Wave payment link is sent after your order is validated.",
    footer:"© La Shish — Online ordering", language:"Language", categoryIntro:"Explore this category and order directly.", clientSpace:"La Shish Space",clientSpaceNote:"Your space on this device",profile:"Profile",myOrder:"My order",orderDetails:"Order details",favorites:"Favorites",notifications:"Notifications",coupons:"Coupons",address:"Address",message:"Message",guest:"Guest",saveProfile:"Save",profileSaved:"Profile saved",favoriteAdd:"Add to favorites",favoriteRemove:"Remove from favorites",favoriteAdded:"Added to favorites",favoriteRemoved:"Removed from favorites",noFavorites:"No favorites yet.",noHistory:"No previous orders.",notificationsText:"Allow notifications to receive app alerts.",enableNotifications:"Enable notifications",notificationsEnabled:"Notifications enabled",notificationsUnsupported:"Notifications are not available on this device.",couponsText:"Active promotions and valid codes will appear here.",noAddress:"No address saved.",editAddress:"Edit address",messageText:"Have a question? Message us directly on WhatsApp.",orderReady:"Your order is ready to review."; breadcrumbLabel:"Breadcrumb", mapTitle:"Find us", addressTitle:"Address", addressValue:"Riviera Bonoumin, Voie de la Djibi, Abidjan", directions:"Open in Google Maps", websiteLabel:"Website", websiteValue:"lashish.ci", followUs:"Follow La Shish",
    loading:"Loading page…", loadingError:"This page could not be loaded. Refresh to try again.", categoryChoose:"Choose a category", categoryChooseNote:"Each category has its own page so you can browse products more easily.", openMenu:"Open menu", closeMenu:"Close menu", heroTitle:"Great taste, made to share.", heroSubtitle:"Generous food, simple service and direct ordering on WhatsApp.", heroCta:"Order now", search:"Search a dish, pizza, tacos…", clear:"Clear"
  }
};

const categoryConfig = {
  "petit-dejeuner": { key:"Petit Déjeuner", fr:"Petit Déjeuner", en:"Breakfast" },
  "entrees": { key:"Entrée froide", fr:"Entrées", en:"Starters" },
  "snacks": { key:"Snack gourmand", fr:"Snacks", en:"Gourmet Snacks" },
  "plats": { key:"Nos plats", fr:"Plats", en:"Main Courses" },
  "specialites": { key:"Spécialités", fr:"Spécialités", en:"Specialties" },
  "pizzas": { key:"Pizza", fr:"Pizzas", en:"Pizzas" },
  "tacos": { key:"French Tacos", fr:"Tacos", en:"Tacos" },
  "boissons": { key:"Boisson", fr:"Boissons", en:"Drinks" },
  "desserts": { key:"Dessert", fr:"Desserts", en:"Desserts" },
  "cocktails": { key:"Cocktail", fr:"Cocktails", en:"Cocktails" },
  "vins": { key:"Vin Et Liqueur", fr:"Vins & liqueurs", en:"Wine & Spirits" }
};

const translations = window.MENU_TRANSLATIONS || {names:{},categories:{},subcategories:{},phrases:[]};
function pathLanguage(path=location.pathname){const match=String(path||"").match(/^\/(fr|en)(?:\/|$)/i);return match?match[1].toLowerCase():null;}
function readLanguage(){ try { return pathLanguage() || (localStorage.getItem(LANG_KEY)==="en" ? "en" : "fr"); } catch { return pathLanguage() || "fr"; } }
let lang = readLanguage();
let cart = loadCart();
let activeCategory = document.body.dataset.category || "ALL";
let searchTerm = "";
let currentProduct = null;
let favorites = loadFavorites();

const $ = id => document.getElementById(id);
const allProducts = (window.MENU_ALL || [
  ...(window.MENU_PETIT_DEJEUNER || []), ...(window.MENU_ENTREES || []),
  ...(window.MENU_SNACKS || []), ...(window.MENU_PLATS || []),
  ...(window.MENU_SPECIALITES || []), ...(window.MENU_PIZZAS || []),
  ...(window.MENU_TACOS || []), ...(window.MENU_BOISSONS || []),
  ...(window.MENU_DESSERTS || []), ...(window.MENU_COCKTAILS || []),
  ...(window.MENU_VINS || [])
]).filter(p => p && p.disponible !== false).sort((a,b) => Number(a.id)-Number(b.id));

function t(key){ return I18N[lang][key] || key; }
function setTextDirection(){
  document.documentElement.setAttribute("dir","ltr");
  document.documentElement.setAttribute("lang",lang);
  document.body.setAttribute("dir","ltr");
}
function saveCart(){ try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {} }
function loadCart(){
  try {
    const value=JSON.parse(localStorage.getItem(CART_KEY)||"[]");
    return Array.isArray(value)
      ? value.filter(x=>x&&Number(x.qty)>0).map(x=>({...x,key:x.key||cartKey(x)}))
      : [];
  } catch { return []; }
}
function saveClient(){
  try {
    const data={};
    ["clientName","clientPhone","clientZone","clientAddress","clientComment"].forEach(id=>{const n=$(id);if(n)data[id]=n.value;});
    localStorage.setItem(CLIENT_KEY,JSON.stringify(data));
  } catch {}
}
function loadClient(){ try { return JSON.parse(localStorage.getItem(CLIENT_KEY)||"{}")||{}; } catch { return {}; } }
function loadFavorites(){ try { const v=JSON.parse(localStorage.getItem(FAVORITES_KEY)||"[]"); return Array.isArray(v)?v.map(Number).filter(Boolean):[]; } catch { return []; } }
function saveFavorites(){ try { localStorage.setItem(FAVORITES_KEY,JSON.stringify(favorites)); } catch {} }
function loadOrderHistory(){ try { const v=JSON.parse(localStorage.getItem(HISTORY_KEY)||"[]"); return Array.isArray(v)?v:[]; } catch { return []; } }
function saveOrderHistory(order){ try { const h=loadOrderHistory(); h.unshift(order); localStorage.setItem(HISTORY_KEY,JSON.stringify(h.slice(0,20))); } catch {} }
function isFavorite(id){ return favorites.includes(Number(id)); }
function toggleFavorite(id){
  id=Number(id);
  favorites=isFavorite(id)?favorites.filter(x=>x!==id):[...favorites,id];
  saveFavorites();
  refreshProductCards();
  showToast(isFavorite(id)?t("favoriteAdded"):t("favoriteRemoved"));
}
function ensureClientSpace(){
  let modal=$("clientSpaceModal");
  if(!modal){ modal=document.createElement("div"); modal.id="clientSpaceModal"; modal.className="client-space-modal"; modal.setAttribute("role","dialog"); modal.setAttribute("aria-modal","true"); document.body.appendChild(modal); }
  return modal;
}
function clientIcon(kind){
  const icons={
    profile:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.3"/><path d="M5 20c.6-3.4 3.1-5.4 7-5.4s6.4 2 7 5.4"/></svg>',
    order:'<svg viewBox="0 0 24 24"><path d="M6 3h9l3 3v15H6z"/><path d="M15 3v4h4M9 12h6M9 16h5"/></svg>',
    history:'<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v5h5M12 7v5l3 2"/></svg>',
    heart:'<svg viewBox="0 0 24 24"><path d="M20 8.5c0 5.5-8 10.5-8 10.5S4 14 4 8.5A4.5 4.5 0 0 1 12 5a4.5 4.5 0 0 1 8 3.5Z"/></svg>',
    bell:'<svg viewBox="0 0 24 24"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 8h18c0-1-3-1-3-8M10 21h4"/></svg>',
    coupon:'<svg viewBox="0 0 24 24"><path d="M4 7a2 2 0 0 1 2-2h12v4a2 2 0 0 1 0 4v6H6a2 2 0 0 1-2-2z"/><path d="M9 8v8"/></svg>',
    address:'<svg viewBox="0 0 24 24"><path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4"/></svg>',
    message:'<svg viewBox="0 0 24 24"><path d="M5 5h14v11H9l-4 3z"/><path d="M8 9h8M8 12h5"/></svg>'
  };
  return icons[kind]||icons.order;
}
function formatPrice(n){ return Number(n||0).toLocaleString(lang==="fr"?"fr-FR":"en-US"); }
function normalize(v){ return String(v||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""); }
function escapeHtml(v){ return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m])); }
function debounce(fn,ms){ let timer; return (...args)=>{clearTimeout(timer);timer=setTimeout(()=>fn(...args),ms);}; }
function displayName(p){ return lang==="en" ? (translations.names[String(p.id)] || p.nom) : p.nom; }
function translateText(v){
  if(lang==="fr") return String(v||"");
  let out=String(v||"");
  [...(translations.phrases||[])].sort((a,b)=>b[0].length-a[0].length).forEach(([fr,en])=>{ out=out.split(fr).join(en); });
  return out;
}
function translateOption(v){
  let out=translateText(v);
  if(lang==="en"){
    out=out.replace(/^Petite\b/,"Small").replace(/^Moyenne\b/,"Medium").replace(/^Grande\b/,"Large");
  }
  return out;
}
function displayOptions(text){
  let out=String(text||"");
  if(lang==="en"){
    out=translateText(out)
      .replace(/^Taille:\s*/,"Size: ")
      .replace(/^Viande:\s*/,"Meat: ")
      .replace(/^Sauces:\s*/,"Sauces: ")
      .replace(/^Suppléments:\s*/,"Extras: ")
      .replace(/^Boisson:\s*/,"Drink: ")
      .replace(/^Choix:\s*/,"Choice: ");
    out=out.replace(/ • Taille:\s*/g," • Size: ").replace(/ • Viande:\s*/g," • Meat: ").replace(/ • Suppléments:\s*/g," • Extras: ").replace(/ • Boisson:\s*/g," • Drink: ").replace(/ • Choix:\s*/g," • Choice: ");
  }
  return out;
}
function categoryLabel(category){ const c=Object.values(categoryConfig).find(x=>x.key===category); return c ? c[lang] : (translations.categories[category]||category); }
function subcategoryLabel(v){ return lang==="en" ? (translations.subcategories[v]||v) : v; }
function getProduct(id){ return allProducts.find(p=>String(p.id)===String(id)); }
function getImage(p){
  const id=Number(p?.id);
  const photo=String(p?.photo||"").trim();
  const filename=photo.replace(/\.(jpe?g|png)$/i,".webp");
  return /^\d+\.webp$/i.test(filename) ? "/images/"+filename : (id ? "/images/"+id+".webp" : "/images/no-image.webp");
}
function handleImageError(img){
  img.onerror=null;
  img.src="/images/no-image.webp";
  img.alt=t("noImage");
}
function categorySlugByKey(key){ return Object.entries(categoryConfig).find(([,v])=>v.key===key)?.[0] || ""; }
function localizedPath(targetLang=lang,page=document.body.dataset.page||"home",category=document.body.dataset.category||""){
  const base="/"+targetLang;
  if(page==="home")return base;
  if(page==="menu")return base+"/menu";
  if(page==="order")return base+"/commande";
  if(page==="contact")return base+"/contact";
  if(page==="category")return base+"/menu/"+category;
  return base;
}
function currentRoute(){return localizedPath(lang);}
function localizeInternalLinks(){
  const map={
    "index.html":()=>localizedPath(lang,"home"),
    "menu.html":()=>localizedPath(lang,"menu"),
    "commande.html":()=>localizedPath(lang,"order"),
    "contact.html":()=>localizedPath(lang,"contact"),
    "petit-dejeuner.html":()=>localizedPath(lang,"category","petit-dejeuner"),
    "entrees.html":()=>localizedPath(lang,"category","entrees"),
    "snacks.html":()=>localizedPath(lang,"category","snacks"),
    "plats.html":()=>localizedPath(lang,"category","plats"),
    "specialites.html":()=>localizedPath(lang,"category","specialites"),
    "pizzas.html":()=>localizedPath(lang,"category","pizzas"),
    "tacos.html":()=>localizedPath(lang,"category","tacos"),
    "boissons.html":()=>localizedPath(lang,"category","boissons"),
    "desserts.html":()=>localizedPath(lang,"category","desserts"),
    "cocktails.html":()=>localizedPath(lang,"category","cocktails"),
    "vins.html":()=>localizedPath(lang,"category","vins")
  };
  document.querySelectorAll("a[href]").forEach(link=>{
    const raw=link.getAttribute("href");
    if(!raw||raw.startsWith("#")||/^(https?:|mailto:|tel:|javascript:)/i.test(raw))return;
    const clean=raw.split("#")[0].split("?")[0].replace(/^\.\//,"").split("/").pop();
    const make=map[clean];
    if(make)link.href=make();
  });
}
function ensureLocalizedRoute(){
  const target=localizedPath(lang);
  const current=location.pathname.replace(/\/$/,"")||"/";
  if(current!==target)history.replaceState({language:lang},"",target);
}


function renderSiteMenu(){
  const panel=$("siteNav");
  if(!panel)return;
  panel.setAttribute("aria-hidden",String(!document.querySelector(".site-header")?.classList.contains("menu-open")));
  const activeRoute=currentRoute();
  const general=[
    ["home","home"],["menu","menu"],["order","order"],["contact","contact"]
  ];
  panel.innerHTML='<div class="menu-panel-head"><strong>La Shish</strong><button id="menuPanelClose" class="menu-panel-close" type="button" aria-label="'+escapeHtml(t("closeMenu"))+'">×</button></div>'+
    '<div class="menu-panel-links">'+
    general.map(([page,key])=>{
      const href=localizedPath(lang,page==="home"?"home":page==="menu"?"menu":page==="order"?"order":"contact");
      const active=href===activeRoute || (key==="menu" && document.body.dataset.page==="category");
      return '<a class="menu-panel-link '+(active?"active":"")+'" href="'+href+'">'+escapeHtml(t(key))+'</a>';
    }).join("")+
    '</div>'+
    '<div class="menu-panel-parent"><a class="menu-panel-parent-link" href="'+localizedPath(lang,"menu")+'">'+escapeHtml(t("menu"))+'</a><span aria-hidden="true">⌄</span></div>'+
    '<div class="menu-panel-label">'+escapeHtml(t("categoriesTitle"))+'</div>'+
    '<div class="menu-panel-category-grid menu-panel-subcategories">'+
    Object.entries(categoryConfig).map(([slug,c])=>{
      const href=localizedPath(lang,"category",slug);
      const active=href===activeRoute;
      return '<a class="menu-panel-category '+(active?"active":"")+'" href="'+href+'"><span>'+escapeHtml(c[lang])+'</span><span aria-hidden="true">↗</span></a>';
    }).join("")+
    '</div>';
}

function productPrice(p){
  if(p.type==="pizza"&&Array.isArray(p.tailles)&&p.tailles.length)return Math.min(...p.tailles.map(s=>Number(s.prix)||0));
  return Number(p.prix)||0;
}

function renderHomeCategoryHeroes(){
  const box=$("homeCategoryHeroes");
  if(!box)return;
  box.innerHTML=Object.entries(categoryConfig).map(([slug,c],index)=>{
    const product=allProducts.find(p=>p.categorie===c.key);
    if(!product)return "";
    const image=getImage(product);
    const price=productPrice(product);
    const priceText=(product.type==="pizza"?t("from")+" ":"")+formatPrice(price)+" FCFA";
    return '<article class="category-hero-card '+(index%2?"reverse":"")+'">'+
      '<a class="category-hero-media" href="'+slug+'.html" aria-label="'+escapeHtml((c[lang]||c.key)+" — "+t("discoverCategory"))+'">'+
        '<img src="'+image+'" alt="'+escapeHtml(displayName(product))+'" loading="'+(index<2?"eager":"lazy")+'" decoding="async" data-product-id="'+product.id+'" onerror="handleImageError(this)">'+
      '</a>'+
      '<div class="category-hero-copy">'+
        '<span class="section-kicker">'+escapeHtml((c[lang]||c.key).toUpperCase())+'</span>'+
        '<span class="category-hero-label">'+escapeHtml(t("featuredDish"))+'</span>'+
        '<h3>'+escapeHtml(displayName(product))+'</h3>'+
        '<p>'+escapeHtml(translateText(product.description||t("categoryIntro")))+'</p>'+
        '<div class="category-hero-footer"><strong class="price">'+priceText+'</strong><a class="category-hero-link" href="'+slug+'.html"><span class="category-hero-line" aria-hidden="true"></span><span>'+escapeHtml(t("discoverCategory"))+'</span><span aria-hidden="true">↗</span></a></div>'+
      '</div>'+
    '</article>';
  }).join("");
}


function renderBreadcrumbs(){
  const header=document.querySelector(".site-header"); if(!header)return;
  let nav=$("breadcrumbs");
  if(!nav){nav=document.createElement("nav");nav.id="breadcrumbs";nav.className="breadcrumbs";header.insertAdjacentElement("afterend",nav);}
  nav.setAttribute("aria-label",t("breadcrumbLabel"));
  const page=document.body.dataset.page||"home";
  const items=[{label:t("home"),href:localizedPath(lang,"home")}];
  if(page==="menu") items.push({label:t("menu"),current:true});
  if(page==="category"){
    items.push({label:t("menu"),href:localizedPath(lang,"menu")});
    const c=categoryConfig[document.body.dataset.category];
    items.push({label:c?c[lang]:t("menu"),current:true});
  }
  if(page==="order") items.push({label:t("order"),current:true});
  if(page==="contact") items.push({label:t("contact"),current:true});
  nav.innerHTML=items.map((item,i)=>{
    const sep=i?' <span class="breadcrumbs-separator" aria-hidden="true">›</span> ':'';
    const content=item.current?'<span aria-current="page">'+escapeHtml(item.label)+'</span>':'<a href="'+item.href+'">'+escapeHtml(item.label)+'</a>';
    return sep+content;
  }).join("");
}
function renderSocialFooter(){
  const footer=document.querySelector(".site-footer"); if(!footer)return;
  let box=footer.querySelector(".footer-socials");
  if(!box){box=document.createElement("div");box.className="footer-socials";footer.prepend(box);}
  box.innerHTML='<div class="footer-social-title">'+escapeHtml(t("followUs"))+'</div><div class="footer-social-links">'+
    '<a class="footer-social-link" href="https://wa.me/'+WHATSAPP_NUMBER+'" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">'+
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.05 0 11.82 11.82 0 0 0 1.8 17.66L0 24l6.5-1.7A11.82 11.82 0 0 0 24 11.95 11.8 11.8 0 0 0 20.5 3.5Zm-8.45 18.1a9.7 9.7 0 0 1-4.95-1.37l-.35-.2-3.86 1.01 1.03-3.76-.22-.39a9.72 9.72 0 1 1 8.35 4.71Zm5.33-7.27c-.29-.15-1.72-.85-1.99-.95-.27-.1-.47-.15-.67.15-.2.29-.77.95-.95 1.14-.18.2-.35.22-.64.07-.29-.15-1.22-.45-2.32-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.35.44-.52.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.29-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.09 4.49.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.72-.7 1.97-1.37.24-.67.24-1.24.17-1.36-.07-.12-.27-.2-.57-.35Z"/></svg>'+ 
    '</a>'+
    '<a class="footer-social-link" href="https://www.instagram.com/restaurantlashish/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">'+
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1"/></svg>'+
    '</a>'+
    '<a class="footer-social-link" href="https://www.facebook.com/1773631056278710" target="_blank" rel="noopener noreferrer" aria-label="Facebook">'+
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.4 22v-8h2.7l.4-3h-3.1V9.1c0-.9.25-1.5 1.55-1.5h1.65V4.9c-.29-.04-1.28-.12-2.43-.12-2.41 0-4.06 1.47-4.06 4.17V11H7.3v3h2.76v8h3.34Z"/></svg>'+
    '</a>'+
    '<a class="footer-social-link" href="https://www.google.com/maps/search/?api=1&query=La+Shish+Abidjan" target="_blank" rel="noopener noreferrer" aria-label="Google Maps">'+
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.6A2.6 2.6 0 1 1 12 6a2.6 2.6 0 0 1 0 5.6Z"/></svg>'+
    '</a></div>';
}
function renderHeader(){
  document.documentElement.lang=lang;
  const title=document.querySelector("title");
  const page=document.body.dataset.page||"";
  if(title){
    const map={home:lang==="fr"?"La Shish | Commande en ligne":"La Shish | Online ordering",menu:lang==="fr"?"La Shish | Menu":"La Shish | Menu",order:lang==="fr"?"La Shish | Ma commande":"La Shish | My order",contact:lang==="fr"?"La Shish | Contact":"La Shish | Contact",category:lang==="fr"?"La Shish | Menu":"La Shish | Menu"};
    title.textContent=map[page]||"La Shish";
  }
  document.querySelectorAll("[data-i18n]").forEach(n=>{const key=n.dataset.i18n;if(I18N[lang][key])n.textContent=t(key);});
  renderSiteMenu();
  renderBreadcrumbs();
  renderSocialFooter();
  document.querySelectorAll("[data-i18n-placeholder]").forEach(n=>{const key=n.dataset.i18nPlaceholder;if(I18N[lang][key])n.placeholder=t(key);});
  const setText=(id,key)=>{const n=$(id);if(n&&I18N[lang][key])n.textContent=t(key);};
  setText("heroTitle","heroTitle"); setText("heroSubtitle","heroSubtitle"); setText("heroCta","heroCta"); setText("discoverBtn","discover");
  localizeInternalLinks();
  const toggle=$("languageToggle");
  if(toggle){
    toggle.setAttribute("aria-label",t("language"));
    toggle.setAttribute("aria-pressed",String(lang==="en"));
  }
  const mobileToggle=$("mobileMenuToggle");
  if(mobileToggle){
    const open=document.querySelector(".site-header")?.classList.contains("menu-open");
    mobileToggle.setAttribute("aria-label",open?t("closeMenu"):t("openMenu"));
    mobileToggle.setAttribute("aria-expanded",String(!!open));
  }
  if(document.body.dataset.page==="category"){
    const category=categoryConfig[document.body.dataset.category];
    if(category){
      const kicker=$("categoryKicker"),heading=$("categoryTitle");
      if(kicker)kicker.textContent=(category[lang]||category.key).toUpperCase();
      if(heading)heading.textContent=category[lang]||category.key;
    }
  }
}
function renderLoader(show){
  const loader=$("pageLoader");
  if(!loader)return;
  if(show){loader.classList.remove("is-hidden");}
  else{requestAnimationFrame(()=>{loader.classList.add("is-hidden");setTimeout(()=>loader.remove(),300);});}
}
function renderCategoryMenu(categoryKey){
  const box=$("menuContainer"); if(!box)return;
  const source=categoryKey==="ALL"?allProducts:allProducts.filter(p=>p.categorie===categoryKey);
  const filtered=source.filter(p=>{
    const hay=normalize([displayName(p),p.nom,p.description||"",categoryLabel(p.categorie),subcategoryLabel(p.sousCategorie)].join(" "));
    return !searchTerm||hay.includes(normalize(searchTerm));
  });
  if(!filtered.length){
    box.innerHTML='<div class="search-empty"><strong>'+escapeHtml(t("emptySearch"))+'</strong><span>'+escapeHtml(t("emptySearchNote"))+'</span><button class="btn btn-secondary" type="button" id="emptyReset">'+escapeHtml(t("viewMenu"))+'</button></div>';
    return;
  }
  const groups=filtered.reduce((g,p)=>{(g[p.sousCategorie||"Menu"]??=[]).push(p);return g;},{});
  box.innerHTML=Object.entries(groups).map(([sub,products])=>
    '<section class="category-block open"><div class="category-header static"><span><span class="subcategory-label" data-subcategory-key="'+escapeHtml(sub)+'">'+escapeHtml(subcategoryLabel(sub))+'</span> <small>'+products.length+'</small></span></div><div class="category-content always-open"><div class="products-grid">'+products.map(productCard).join("")+'</div></div></section>'
  ).join("");
}
function productCard(p){
  const isPizza=p.type==="pizza";
  const minPrice=isPizza&&Array.isArray(p.tailles)&&p.tailles.length?Math.min(...p.tailles.map(s=>Number(s.prix)||0)):Number(p.prix)||0;
  return '<article class="product-card" data-product-id="'+p.id+'"><div class="product-media"><img class="product-img" src="'+getImage(p)+'" alt="'+escapeHtml(displayName(p))+'" loading="lazy" decoding="async" data-product-id="'+p.id+'" onerror="handleImageError(this)">'+
    ((isPizza||p.type==="tacos"||p.choix)?'<span class="product-badge">'+escapeHtml(t("customize"))+'</span>':'')+
    '</div><div class="product-body"><div class="product-meta"><span>'+escapeHtml(categoryLabel(p.categorie))+'</span></div><h3>'+escapeHtml(displayName(p))+'</h3><p class="product-description">'+escapeHtml(translateText(p.description||""))+'</p>'+
    '<div class="product-footer"><strong class="price">'+(isPizza?t("from")+" ":"")+formatPrice(minPrice)+' FCFA</strong><button class="add-btn" type="button" data-add="'+p.id+'">'+escapeHtml(t("add"))+'</button></div></div></article>';
}
function renderFeatured(){
  const box=$("featuredGrid");if(!box)return;
  const ids=[1,39,60,68,76,113,128,171,199];
  box.innerHTML=ids.map(getProduct).filter(Boolean).map(productCard).join("");
}
function refreshProductCards(){
  document.querySelectorAll(".product-card[data-product-id]").forEach(card=>{
    const p=getProduct(card.dataset.productId);
    if(!p)return;
    const meta=card.querySelector(".product-meta span"); if(meta)meta.textContent=categoryLabel(p.categorie);
    const title=card.querySelector("h3"); if(title)title.textContent=displayName(p);
    const description=card.querySelector(".product-description"); if(description)description.textContent=translateText(p.description||"");
    const priceNode=card.querySelector(".price");
    if(priceNode){
      const isPizza=p.type==="pizza";
      const minPrice=isPizza&&Array.isArray(p.tailles)&&p.tailles.length?Math.min(...p.tailles.map(s=>Number(s.prix)||0)):Number(p.prix)||0;
      priceNode.textContent=(isPizza?t("from")+" ":"")+formatPrice(minPrice)+" FCFA";
    }
    const badge=card.querySelector(".product-badge"); if(badge)badge.textContent=t("customize");
    const image=card.querySelector(".product-img"); if(image)image.alt=displayName(p);
  });
}
function refreshSubcategoryHeadings(){
  document.querySelectorAll("[data-subcategory-key]").forEach(n=>{n.textContent=subcategoryLabel(n.dataset.subcategoryKey);});
}
function renderCategoryDirectory(){
  const box=$("categoryDirectory"); if(!box)return;
  box.innerHTML=Object.entries(categoryConfig).map(([slug,c])=>{
    const count=allProducts.filter(p=>p.categorie===c.key).length;
    return '<a class="category-directory-card" href="'+slug+'.html"><span class="category-card-arrow">↗</span><span class="section-kicker">'+escapeHtml(c[lang].toUpperCase())+'</span><strong>'+count+' '+(count===1?t("article"):t("articles"))+'</strong></a>';
  }).join("");
}
function getTotal(){return cart.reduce((s,i)=>s+(Number(i.prix)||0)*(Number(i.qty)||0),0);}
function getItemCount(){return cart.reduce((s,i)=>s+(Number(i.qty)||0),0);}
function cartName(item){return lang==="en"?(translations.names[String(item.productId)]||item.nom):item.nom;}
function cartKey(item){return String(item.productId)+"-"+String(item.optionsText||"");}
function addToCart(item){
  const key=cartKey(item),old=cart.find(x=>x.key===key);
  if(old)old.qty=Number(old.qty)+1;else cart.push({...item,key,qty:1,prix:Number(item.prix)||0});
  saveCart();renderCart();showToast(t("added"));
}
function renderCart(){
  const box=$("cartItems");if(!box)return;
  box.innerHTML=cart.length?cart.map(item=>{
    const key=encodeURIComponent(item.key);
    return '<div class="cart-item"><div class="cart-item-main"><strong>'+escapeHtml(item.qty+" × "+cartName(item))+'</strong>'+(item.optionsText?'<span>'+escapeHtml(displayOptions(item.optionsText))+'</span>':'')+'<b>'+formatPrice(item.prix*item.qty)+' FCFA</b></div><div class="cart-controls"><button type="button" data-minus="'+key+'">−</button><span>'+item.qty+'</span><button type="button" data-plus="'+key+'">+</button><button type="button" class="remove-item" data-remove="'+key+'" aria-label="×">×</button></div></div>';
  }).join(""):'<div class="cart-empty"><span class="cart-empty-icon">🛒</span><strong>'+escapeHtml(t("emptyCart"))+'</strong><span>'+escapeHtml(t("emptyCartNote"))+'</span></div>';
  if($("cartTotal"))$("cartTotal").textContent=formatPrice(getTotal());
  if($("mobileTotal"))$("mobileTotal").textContent=formatPrice(getTotal());
  if($("mobileCount"))$("mobileCount").textContent=getItemCount();
  if($("mobileArticleLabel"))$("mobileArticleLabel").textContent=getItemCount()===1?t("article"):t("articles");
  if($("whatsappBtn"))$("whatsappBtn").disabled=!cart.length;
  const badge=$("cartCountBadge");if(badge){badge.textContent=getItemCount();badge.hidden=!getItemCount();}
}
function fillClient(){
  const data=loadClient();
  Object.entries(data).forEach(([id,val])=>{const n=$(id);if(n)n.value=val||"";});
}
function validateClient(){
  const data={name:$("clientName")?.value.trim(),phone:$("clientPhone")?.value.trim(),zone:$("clientZone")?.value.trim(),address:$("clientAddress")?.value.trim()};
  if(!data.name||!data.phone||!data.zone||!data.address){showToast(t("fill"));return null;}
  if(data.phone.replace(/\D/g,"").length<8){showToast(t("badPhone"));return null;}
  return data;
}
function sendWhatsApp(){
  if(!cart.length){showToast(t("empty"));return;}
  const client=validateClient();if(!client)return;
  saveClient();
  const comment=$("clientComment")?.value.trim()||"";
  let msg=lang==="fr"?"🍽️ *COMMANDE LA SHISH*\n\n*Client*\n":"🍽️ *LA SHISH ORDER*\n\n*Customer*\n";
  msg+="👤 "+client.name+"\n📞 "+client.phone+"\n📍 "+client.zone+"\n🏠 "+client.address+"\n";
  if(comment)msg+="💬 "+comment+"\n";
  msg+="\n*"+t("order")+"*\n";
  cart.forEach(i=>{msg+="\n• "+i.qty+" × "+cartName(i)+(i.optionsText?" — "+displayOptions(i.optionsText):"")+" — "+formatPrice(i.prix*i.qty)+" FCFA";});
  msg+="\n\n💰 *"+t("total").toUpperCase()+" : "+formatPrice(getTotal())+" FCFA*\n🚚 "+t("deliveryText")+"\n💳 "+t("waveText");
  window.open("https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(msg),"_blank","noopener,noreferrer");
}
function showToast(message){
  document.querySelector(".toast")?.remove();
  const node=document.createElement("div");node.className="toast";node.textContent=message;document.body.appendChild(node);setTimeout(()=>node.remove(),2200);
}
function openOptions(product){
  const modal=$("optionModal"),body=$("optionModalBody"),title=$("optionModalTitle");
  if(!modal||!body){addToCart({productId:product.id,nom:product.nom,prix:product.prix});return;}
  currentProduct=product;title.textContent=displayName(product);
  let html='<p class="modal-intro">'+escapeHtml(translateText(product.description||t("chooseOne")))+'</p>';
  if(product.type==="pizza"&&Array.isArray(product.tailles)){
    html+='<fieldset><legend>'+escapeHtml(t("size"))+'</legend>'+product.tailles.map((s,i)=>'<label class="option-row"><input type="radio" name="optSize" value="'+i+'" '+(i===0?"checked":"")+'><span>'+escapeHtml(translateOption(s.nom))+'</span><strong>'+formatPrice(s.prix)+' FCFA</strong></label>').join("")+'</fieldset>';
    if(product.supplement)html+='<fieldset><legend>'+escapeHtml(t("extras"))+'</legend><label class="option-row"><input type="checkbox" name="optPizzaExtra"><span>'+escapeHtml(translateOption(product.supplement.label||"Supplément"))+'</span><strong>+'+formatPrice(product.supplement.prix)+' FCFA</strong></label></fieldset>';
  }
  if(product.type==="tacos"){
    html+='<fieldset><legend>'+escapeHtml(t("meat"))+'</legend>'+product.viandes.map((v,i)=>'<label class="option-row"><input type="radio" name="optMeat" value="'+i+'" '+(i===0?"checked":"")+'><span>'+escapeHtml(translateOption(v))+'</span></label>').join("")+'</fieldset>';
    html+='<fieldset><legend>'+escapeHtml(t("sauces"))+' <small>'+escapeHtml(t("maxSauces"))+'</small></legend>'+product.sauces.map((v,i)=>'<label class="option-row"><input type="checkbox" name="optSauce" value="'+i+'"><span>'+escapeHtml(translateOption(v))+'</span></label>').join("")+'</fieldset>';
    if(Array.isArray(product.boissons)&&product.boissons.length)html+='<fieldset><legend>'+escapeHtml(t("drink"))+'</legend>'+product.boissons.map((v,i)=>'<label class="option-row"><input type="radio" name="optDrink" value="'+i+'" '+(i===0?"checked":"")+'><span>'+escapeHtml(translateOption(v))+'</span></label>').join("")+'</fieldset>';
    if(Array.isArray(product.supplements)&&product.supplements.length)html+='<fieldset><legend>'+escapeHtml(t("extras"))+'</legend>'+product.supplements.map((v,i)=>'<label class="option-row"><input type="checkbox" name="optExtra" value="'+i+'"><span>'+escapeHtml(translateOption(v.nom))+'</span><strong>+'+formatPrice(v.prix)+' FCFA</strong></label>').join("")+'</fieldset>';
  }
  if(product.choix?.options){
    html+='<fieldset><legend>'+escapeHtml(translateOption(product.choix.label||"Choix"))+'</legend>'+product.choix.options.map((v,i)=>'<label class="option-row"><input type="radio" name="optChoice" value="'+i+'" '+(i===0?"checked":"")+'><span>'+escapeHtml(translateOption(v))+'</span></label>').join("")+'</fieldset>';
  }
  body.innerHTML=html;modal.classList.add("open");document.body.classList.add("modal-open");
}
function closeOptions(){$("optionModal")?.classList.remove("open");document.body.classList.remove("modal-open");currentProduct=null;}
function confirmOptions(){
  if(!currentProduct)return;
  let price=Number(currentProduct.prix)||0,options=[];
  if(currentProduct.type==="pizza"){
    const i=Number(document.querySelector('input[name="optSize"]:checked')?.value??0),size=currentProduct.tailles[i];
    if(!size)return;
    price=Number(size.prix)||price;options.push("Taille: "+size.nom);
    if($("optionModalBody")?.querySelector('input[name="optPizzaExtra"]:checked')){price+=Number(currentProduct.supplement?.prix||0);options.push(t("extras")+": "+translateOption(currentProduct.supplement?.label||"Supplément"));}
  }
  if(currentProduct.type==="tacos"){
    const meat=document.querySelector('input[name="optMeat"]:checked');if(!meat){showToast(t("chooseOne"));return;}
    options.push("Viande: "+currentProduct.viandes[Number(meat.value)]);
    const sauces=[...document.querySelectorAll('input[name="optSauce"]:checked')].map(n=>currentProduct.sauces[Number(n.value)]);
    if(sauces.length>(currentProduct.maxSauces||2)){showToast(t("maxSauces"));return;} if(sauces.length)options.push("Sauces: "+sauces.join(", "));
    const drink=document.querySelector('input[name="optDrink"]:checked');if(drink)options.push("Boisson: "+currentProduct.boissons[Number(drink.value)]);
    const extras=[...document.querySelectorAll('input[name="optExtra"]:checked')].map(n=>currentProduct.supplements[Number(n.value)]);
    if(extras.length){price+=extras.reduce((s,x)=>s+Number(x.prix||0),0);options.push("Suppléments: "+extras.map(x=>x.nom).join(", "));}
  }
  if(currentProduct.choix?.options){
    const choice=document.querySelector('input[name="optChoice"]:checked');if(!choice){showToast(t("chooseOne"));return;}
    options.push((currentProduct.choix.label||"Choix")+": "+currentProduct.choix.options[Number(choice.value)]);
    }
  addToCart({productId:currentProduct.id,nom:currentProduct.nom,prix:price,optionsText:options.join(" • ")});closeOptions();
}
function setLanguage(next){
  if(next===lang)return;
  lang=next;
  try{localStorage.setItem(LANG_KEY,lang);}catch{}
  setTextDirection();
  history.pushState({language:lang},"",localizedPath(lang));
  renderHeader();
  const header=document.querySelector(".site-header");
  const menuIsOpen=header?.classList.contains("menu-open");
  if(menuIsOpen)setMobileMenu(true);
  const page=document.body.dataset.page;
  if(page==="home")renderHomeCategoryHeroes();
  localizeInternalLinks();
  if(page==="menu"){renderCategoryDirectory();}
  if(page==="category"){refreshProductCards();refreshSubcategoryHeadings();}
  if(page==="order"){renderCart();fillClient();}
  if(page==="contact"){renderCart();fillClient();}
}
function setMobileMenu(open){
  const header=document.querySelector(".site-header");
  const toggle=$("mobileMenuToggle");
  const panel=$("siteNav");
  if(!header||!toggle||!panel)return;
  header.classList.toggle("menu-open",open);
  toggle.setAttribute("aria-expanded",String(open));
  toggle.setAttribute("aria-label",open?t("closeMenu"):t("openMenu"));
  panel.setAttribute("aria-hidden",String(!open));
  document.body.classList.toggle("nav-open",open);
  if(open){$("menuPanelClose")?.focus({preventScroll:true});}
}
function initEvents(){
  $("languageToggle")?.addEventListener("click",()=>setLanguage(lang==="fr"?"en":"fr"));
  $("mobileMenuToggle")?.addEventListener("click",()=>{
    const header=document.querySelector(".site-header");
    setMobileMenu(!header?.classList.contains("menu-open"));
  });
  window.addEventListener("resize",()=>{if(window.innerWidth>900)setMobileMenu(false);});
  document.addEventListener("click",e=>{
    if(e.target.closest("#menuPanelClose")||e.target.closest("#siteNav a")){setMobileMenu(false);return;}
    if(!e.target.closest(".site-header"))setMobileMenu(false);
    const add=e.target.closest("[data-add]");if(add){const p=getProduct(add.dataset.add);if(p)openOptions(p);return;}
    const plus=e.target.closest("[data-plus]");if(plus){const i=cart.find(x=>x.key===decodeURIComponent(plus.dataset.plus));if(i){i.qty++;saveCart();renderCart();}return;}
    const minus=e.target.closest("[data-minus]");if(minus){const i=cart.find(x=>x.key===decodeURIComponent(minus.dataset.minus));if(i){i.qty--;if(i.qty<=0)cart=cart.filter(x=>x.key!==i.key);saveCart();renderCart();}return;}
    const remove=e.target.closest("[data-remove]");if(remove){cart=cart.filter(x=>x.key!==decodeURIComponent(remove.dataset.remove));saveCart();renderCart();showToast(t("removed"));return;}
    const reset=e.target.closest("#emptyReset");if(reset){searchTerm="";if($("searchInput"))$("searchInput").value="";renderCategoryMenu(activeCategory==="ALL"?"ALL":categoryConfig[activeCategory]?.key);return;}
    const close=e.target.closest("#optionModalCancel,#optionModalCancel2");if(close){closeOptions();return;}
    if(e.target===$("optionModal"))closeOptions();
  });
  $("searchInput")?.addEventListener("input",debounce(e=>{searchTerm=e.target.value.trim();renderCategoryMenu(activeCategory==="ALL"?"ALL":categoryConfig[activeCategory]?.key);},160));
  $("resetSearch")?.addEventListener("click",()=>{searchTerm="";$("searchInput").value="";renderCategoryMenu(activeCategory==="ALL"?"ALL":categoryConfig[activeCategory]?.key);$("searchInput").focus();});
  $("whatsappBtn")?.addEventListener("click",sendWhatsApp);
  ["clientName","clientPhone","clientZone","clientAddress","clientComment"].forEach(id=>$(id)?.addEventListener("input",saveClient));
  $("mobileCartBtn")?.addEventListener("click",()=>{window.location.href="commande.html";});
  $("optionModalConfirm")?.addEventListener("click",confirmOptions);
  document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeOptions();setMobileMenu(false);}});
}
function initApp(){
  setTextDirection();
  ensureLocalizedRoute();
  renderHeader();
  initEvents();
  const page=document.body.dataset.page;
  if(page==="home")renderHomeCategoryHeroes();
  if(page==="menu")renderCategoryDirectory();
  if(page==="category")renderCategoryMenu(categoryConfig[document.body.dataset.category]?.key||"ALL");
  if(page==="order"){renderCart();fillClient();}
  if(page==="contact")renderCart();
}
const loaderFailsafe=window.setTimeout(()=>renderLoader(false),2500);
window.addEventListener("error",()=>renderLoader(false),{once:false});
window.addEventListener("unhandledrejection",()=>renderLoader(false),{once:false});
try{ initApp(); }
catch(error){
  console.error(error);
  const box=$("appError");
  if(box){box.hidden=false;box.textContent=t("loadingError");}
}
finally{
  window.clearTimeout(loaderFailsafe);
  renderLoader(false);
  window.setTimeout(()=>document.body.classList.add("ready"),40);
  if("serviceWorker" in navigator){
    window.addEventListener("load",()=>{
      navigator.serviceWorker.register("./sw.js?v=11",{updateViaCache:"none"}).catch(()=>{});
    },{once:true});
  }
}
