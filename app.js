/* La Shish — multipage bilingual ordering app */
const WHATSAPP_NUMBER = "2250140555666";
const CART_KEY = "laShishCart";
const LANG_KEY = "laShishLanguage";
const CLIENT_KEY = "laShishClient";

const I18N = {
  fr: {
    home:"Accueil", menu:"Menu", order:"Ma commande", contact:"Contact",
    heroKicker:"LA SHISH", heroTitle:"Le goût qui rassemble.", heroSubtitle:"Cuisine généreuse, service simple et commande directe sur WhatsApp.",
    heroCta:"Commander maintenant", discover:"Découvrir le menu", delivery:"Livraison", deliveryWho:"À la charge du client",
    deliveryNote:"Yango Livraison recommandé", payment:"Paiement Wave", paymentNote:"Lien envoyé après validation",
    paymentConfirm:"Commande confirmée sur WhatsApp", menuKicker:"NOTRE MENU", menuTitle:"Choisissez vos favoris",
    search:"Rechercher un plat, pizza, tacos…", clear:"Effacer", all:"Tout", emptySearch:"Aucun résultat",
    emptySearchNote:"Essayez un autre mot-clé ou réinitialisez la recherche.", viewMenu:"Voir tout le menu",
    selected:"VOTRE SÉLECTION", cartLive:"En direct", emptyCart:"Votre panier est vide.",
    emptyCartNote:"Ajoutez vos plats préférés pour commencer.", total:"Total", seeOrder:"Voir ma commande",
    add:"Ajouter au panier", customize:"Personnaliser", cancel:"Annuler", confirm:"Confirmer",
    size:"Taille", meat:"Viande", sauces:"Sauces", extras:"Suppléments", drink:"Boisson", side:"Garniture",
    chooseOne:"Choisissez une option", chooseAtLeast:"Choisissez au moins une option", maxSauces:"2 sauces maximum",
    preparation:"Préparation : 10 à 30 min", deliveryHeading:"Livraison", required:"* obligatoire",
    name:"Nom du client *", phone:"Téléphone *", zone:"Quartier / zone *", address:"Adresse complète *",
    comment:"Commentaire ou précision (facultatif)", whatsapp:"Commander sur WhatsApp →",
    recap:"Votre commande sera récapitulée dans WhatsApp avant l’envoi.", fill:"Complétez nom, téléphone, zone et adresse",
    badPhone:"Vérifiez votre numéro de téléphone", empty:"Panier vide", article:"article", articles:"articles",
    added:"Article ajouté au panier 🛒", removed:"Article supprimé 🗑️", noImage:"Image indisponible",
    from:"Dès", aboutTitle:"Une cuisine à partager", aboutText:"Retrouvez les incontournables La Shish : petits-déjeuners, mezze, burgers, plats, pizzas, tacos, boissons et desserts.",
    contactTitle:"Nous contacter", contactText:"Pour une question, une précision de commande ou une demande de livraison, contactez-nous directement.",
    phoneLabel:"Téléphone", whatsappLabel:"WhatsApp", deliveryLabel:"Livraison", deliveryText:"Service de livraison pris en charge par le client.",
    waveLabel:"Paiement", waveText:"Paiement Wave avec lien envoyé après validation de la commande.",
    footer:"© La Shish — Commande en ligne", language:"Langue"
  },
  en: {
    home:"Home", menu:"Menu", order:"My order", contact:"Contact",
    heroKicker:"LA SHISH", heroTitle:"Great taste, made to share.", heroSubtitle:"Generous food, simple service and direct ordering on WhatsApp.",
    heroCta:"Order now", discover:"Explore the menu", delivery:"Delivery", deliveryWho:"Paid by the customer",
    deliveryNote:"Yango Delivery recommended", payment:"Wave payment", paymentNote:"Link sent after validation",
    paymentConfirm:"Order confirmed on WhatsApp", menuKicker:"OUR MENU", menuTitle:"Choose your favorites",
    search:"Search a dish, pizza, tacos…", clear:"Clear", all:"All", emptySearch:"No results",
    emptySearchNote:"Try another keyword or reset the search.", viewMenu:"View full menu",
    selected:"YOUR SELECTION", cartLive:"Live", emptyCart:"Your cart is empty.",
    emptyCartNote:"Add your favorite dishes to get started.", total:"Total", seeOrder:"View my order",
    add:"Add to cart", customize:"Customize", cancel:"Cancel", confirm:"Confirm",
    size:"Size", meat:"Meat", sauces:"Sauces", extras:"Extras", drink:"Drink", side:"Side",
    chooseOne:"Choose an option", chooseAtLeast:"Choose at least one option", maxSauces:"Up to 2 sauces",
    preparation:"Preparation: 10 to 30 min", deliveryHeading:"Delivery", required:"* required",
    name:"Customer name *", phone:"Phone *", zone:"Area / neighborhood *", address:"Full address *",
    comment:"Comment or note (optional)", whatsapp:"Order on WhatsApp →",
    recap:"Your order will be summarized in WhatsApp before sending.", fill:"Complete name, phone, area and address",
    badPhone:"Please check your phone number", empty:"Empty cart", article:"item", articles:"items",
    added:"Added to cart 🛒", removed:"Item removed 🗑️", noImage:"Image unavailable",
    from:"From", aboutTitle:"Food made to share", aboutText:"Discover La Shish favorites: breakfast, mezze, burgers, mains, pizzas, tacos, drinks and desserts.",
    contactTitle:"Get in touch", contactText:"For questions, order details or delivery requests, contact us directly.",
    phoneLabel:"Phone", whatsappLabel:"WhatsApp", deliveryLabel:"Delivery", deliveryText:"Delivery service is paid by the customer.",
    waveLabel:"Payment", waveText:"Wave payment link is sent after your order is validated.",
    footer:"© La Shish — Online ordering", language:"Language"
  }
};

const translations = window.MENU_TRANSLATIONS || {names:{},categories:{},subcategories:{},phrases:[],optionLabels:{}};
let lang = localStorage.getItem(LANG_KEY) === "en" ? "en" : "fr";
let cart = loadCart();
let activeCategory = "ALL";
let searchTerm = "";
let currentProduct = null;

const $ = id => document.getElementById(id);
const allProducts = [
  ...(window.MENU_PLATS || []), ...(window.MENU_PIZZAS || []),
  ...(window.MENU_TACOS || []), ...(window.MENU_BOISSONS || [])
].filter(p => p && p.disponible !== false).sort((a,b) => Number(a.id)-Number(b.id));

function t(key){ return I18N[lang][key] || key; }
function saveCart(){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
function loadCart(){
  try {
    const value = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(value) ? value.filter(x => x && Number(x.qty) > 0) : [];
  } catch { return []; }
}
function saveClient(){
  const ids=["clientName","clientPhone","clientZone","clientAddress","clientComment"];
  const data={};
  ids.forEach(id=>{ const node=$(id); if(node) data[id]=node.value; });
  localStorage.setItem(CLIENT_KEY, JSON.stringify(data));
}
function loadClient(){
  try { return JSON.parse(localStorage.getItem(CLIENT_KEY) || "{}") || {}; } catch { return {}; }
}
function formatPrice(n){ return Number(n||0).toLocaleString(lang==="fr" ? "fr-FR" : "en-US"); }
function normalize(v){ return String(v||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""); }
function escapeHtml(v){ return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m])); }
function debounce(fn,ms){ let timer; return (...args)=>{clearTimeout(timer);timer=setTimeout(()=>fn(...args),ms);}; }
function displayName(p){ return lang==="en" ? (translations.names[String(p.id)] || p.nom) : p.nom; }
function translateText(v){
  if(lang==="fr") return String(v||"");
  let out=String(v||"");
  [...(translations.phrases||[])].sort((a,b)=>b[0].length-a[0].length).forEach(([fr,en])=>{
    out=out.split(fr).join(en);
  });
  return out;
}
function categoryLabel(v){ return lang==="en" ? (translations.categories[v] || v) : v; }
function subcategoryLabel(v){ return lang==="en" ? (translations.subcategories[v] || v) : v; }
function translateOption(v){ return lang==="en" ? translateText(v) : v; }
function getProduct(id){ return allProducts.find(p=>String(p.id)===String(id)); }
function getImage(p){ return "images/"+(p.id)+".webp"; }
function handleImageError(img){
  const id=img.dataset.productId, step=img.dataset.try||"webp";
  if(step==="webp"){img.dataset.try="jpg";img.src="images/"+id+".jpg";}
  else if(step==="jpg"){img.dataset.try="png";img.src="images/"+id+".png";}
  else {img.onerror=null;img.src="images/no-image.webp";img.alt=t("noImage");}
}

function commonText(){
  const q=(id,key)=>{const n=$(id);if(n)n.textContent=t(key);};
  document.documentElement.lang=lang;
  const title=document.querySelector("title"); if(title) title.textContent=lang==="fr"?"La Shish | Commande en ligne":"La Shish | Online ordering";
  document.querySelectorAll("[data-i18n]").forEach(n=>{n.textContent=t(n.dataset.i18n);});
  document.querySelectorAll("[data-i18n-aria]").forEach(n=>{n.setAttribute("aria-label",t(n.dataset.i18nAria));});
  const toggle=$("languageToggle"); if(toggle){toggle.setAttribute("aria-label",t("language"));toggle.setAttribute("aria-pressed",String(lang==="en"));toggle.querySelector(".lang-active")?.replaceChildren(document.createTextNode(lang==="fr"?"FR":"EN"));toggle.querySelector(".lang-next")?.replaceChildren(document.createTextNode(lang==="fr"?"EN":"FR"));}
}

function productCard(p){
  const isPizza=p.type==="pizza";
  const minPrice=isPizza&&Array.isArray(p.tailles)&&p.tailles.length?Math.min(...p.tailles.map(s=>Number(s.prix)||0)):Number(p.prix)||0;
  return '<article class="product-card">'+
    '<div class="product-media"><img class="product-img" src="'+getImage(p)+'" alt="'+escapeHtml(displayName(p))+'" loading="lazy" decoding="async" data-product-id="'+escapeHtml(p.id)+'" onerror="handleImageError(this)">'+
    ((isPizza||p.type==="tacos"||p.choix)?'<span class="product-badge">'+escapeHtml(t("customize"))+"</span>":"")+"</div>"+
    '<div class="product-body"><div class="product-meta"><span>'+escapeHtml(categoryLabel(p.categorie))+'</span></div>'+
    '<h3>'+escapeHtml(displayName(p))+'</h3><p>'+escapeHtml(translateText(p.description||""))+'</p>'+
    '<div class="product-footer"><strong class="price">'+(isPizza?t("from")+" ":"")+formatPrice(minPrice)+' FCFA</strong><button class="add-btn" type="button" data-add="'+escapeHtml(p.id)+'">'+escapeHtml(t("add"))+"</button></div></div></article>";
}

function renderFeatured(){
  const box=$("featuredGrid"); if(!box||!allProducts.length) return;
  const ids=[1,39,60,68,76,113,128,171,199];
  const featured=ids.map(getProduct).filter(Boolean);
  box.innerHTML=featured.map(productCard).join("");
}

function getCategories(){
  return [...new Set(allProducts.map(p=>p.categorie).filter(Boolean))];
}
function renderCategoryTabs(){
  const box=$("categoryTabs"); if(!box) return;
  box.innerHTML='<button type="button" class="'+(activeCategory==="ALL"?"active":"")+'" data-category="ALL">'+escapeHtml(t("all"))+"</button>"+
    getCategories().map(c=>'<button type="button" class="'+(activeCategory===c?"active":"")+'" data-category="'+escapeHtml(c)+'">'+escapeHtml(categoryLabel(c))+"</button>").join("");
}
function renderMenu(){
  const box=$("menuContainer"); if(!box) return;
  renderCategoryTabs();
  const filtered=allProducts.filter(p=>{
    const catOk=activeCategory==="ALL"||p.categorie===activeCategory;
    const hay=normalize([displayName(p),p.nom,p.description||"",categoryLabel(p.categorie),subcategoryLabel(p.sousCategorie)].join(" "));
    return catOk && (!searchTerm||hay.includes(normalize(searchTerm)));
  });
  if(!filtered.length){
    box.innerHTML='<div class="search-empty"><strong>'+escapeHtml(t("emptySearch"))+'</strong><span>'+escapeHtml(t("emptySearchNote"))+'</span><button type="button" id="emptyReset">'+escapeHtml(t("viewMenu"))+"</button></div>";
    return;
  }
  const groups=filtered.reduce((g,p)=>{(g[p.categorie]??=[]).push(p);return g;},{});
  box.innerHTML=Object.entries(groups).map(([category,products])=>
    '<section class="category-block open"><button class="category-header" type="button" aria-expanded="true"><span>'+escapeHtml(categoryLabel(category))+' <small>'+products.length+'</small></span><span aria-hidden="true">⌃</span></button>'+
    '<div class="category-content">'+(Object.entries(products.reduce((g,p)=>{(g[p.sousCategorie||"Menu"]??=[]).push(p);return g;},{})).map(([sub,items])=>
      '<div class="subcategory-block"><h4>'+escapeHtml(subcategoryLabel(sub))+'</h4><div class="products-grid">'+items.map(productCard).join("")+'</div></div>'
    ).join(""))+'</div></section>'
  ).join("");
}

function getTotal(){ return cart.reduce((s,i)=>s+(Number(i.prix)||0)*(Number(i.qty)||0),0); }
function getItemCount(){ return cart.reduce((s,i)=>s+(Number(i.qty)||0),0); }
function cartKey(item){ return String(item.productId)+"-"+String(item.optionsText||""); }
function addToCart(item){
  const key=cartKey(item), old=cart.find(x=>x.key===key);
  if(old) old.qty=Number(old.qty)+1;
  else cart.push({...item,key,qty:1,prix:Number(item.prix)||0});
  saveCart(); renderCart(); showToast(t("added"));
}
function removeCartItem(key){cart=cart.filter(x=>x.key!==key);saveCart();renderCart();showToast(t("removed"));}

function renderCart(){
  const box=$("cartItems"); if(!box) return;
  box.innerHTML=cart.length?cart.map(item=>{
    const key=encodeURIComponent(item.key);
    return '<div class="cart-item"><div class="cart-item-main"><strong>'+escapeHtml(item.qty+" × "+(item.productId&&translations.names[String(item.productId)]&&lang==="en"?translations.names[String(item.productId)]:item.nom))+'</strong>'+
      (item.optionsText?'<span>'+escapeHtml(translateText(item.optionsText))+'</span>':"")+
      '<b>'+formatPrice(item.prix*item.qty)+' FCFA</b></div><div class="cart-controls"><button type="button" data-minus="'+key+'">−</button><span>'+item.qty+'</span><button type="button" data-plus="'+key+'">+</button><button type="button" class="remove-item" data-remove="'+key+'" aria-label="×">×</button></div></div>';
  }).join(""):'<div class="cart-empty"><span class="cart-empty-icon">🛒</span><strong>'+escapeHtml(t("emptyCart"))+'</strong><span>'+escapeHtml(t("emptyCartNote"))+'</span></div>';
  const total=$("cartTotal"); if(total) total.textContent=formatPrice(getTotal());
  const count=$("mobileCount"); if(count) count.textContent=getItemCount();
  const mobileTotal=$("mobileTotal"); if(mobileTotal) mobileTotal.textContent=formatPrice(getTotal());
  const label=$("mobileArticleLabel"); if(label) label.textContent=getItemCount()===1?t("article"):t("articles");
  const whatsapp=$("whatsappBtn"); if(whatsapp) whatsapp.disabled=!cart.length;
  const countBadge=$("cartCountBadge"); if(countBadge){countBadge.textContent=getItemCount();countBadge.hidden=!getItemCount();}
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
  const comment=$("clientComment")?.value.trim()||"";
  saveClient();
  let msg=lang==="fr"?"🍽️ *COMMANDE LA SHISH*\n\n*Client*\n":"🍽️ *LA SHISH ORDER*\n\n*Customer*\n";
  msg+="👤 "+client.name+"\n📞 "+client.phone+"\n📍 "+client.zone+"\n🏠 "+client.address+"\n";
  if(comment)msg+="💬 "+comment+"\n";
  msg+="\n*"+t("order")+"*\n";
  cart.forEach(i=>{const name=lang==="en"?(translations.names[String(i.productId)]||i.nom):i.nom;msg+="\n• "+i.qty+" × "+name+(i.optionsText?" — "+translateText(i.optionsText):"")+" — "+formatPrice(i.prix*i.qty)+" FCFA";});
  msg+="\n\n💰 *"+t("total").toUpperCase()+" : "+formatPrice(getTotal())+" FCFA*\n🚚 "+(lang==="fr"?"Livraison à la charge du client.":"Delivery paid by the customer.")+"\n💳 "+(lang==="fr"?"Paiement Wave : lien envoyé sur WhatsApp.":"Wave payment: link sent on WhatsApp.");
  window.open("https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(msg),"_blank","noopener,noreferrer");
}
function showToast(message){
  document.querySelector(".toast")?.remove();
  const n=document.createElement("div");n.className="toast";n.textContent=message;document.body.appendChild(n);setTimeout(()=>n.remove(),2200);
}

function openOptions(product){
  const modal=$("optionModal"), body=$("optionModalBody"), title=$("optionModalTitle");
  if(!modal||!body){ addToCart({productId:product.id,nom:product.nom,prix:product.prix});return; }
  currentProduct=product; title.textContent=displayName(product);
  let html='<p class="modal-intro">'+escapeHtml(translateText(product.description||t("chooseOne")))+"</p>";
  if(product.type==="pizza"&&Array.isArray(product.tailles)){
    html+='<fieldset><legend>'+escapeHtml(t("size"))+'</legend>'+product.tailles.map((s,i)=>
      '<label class="option-row"><input type="radio" name="optSize" value="'+i+'" '+(i===0?"checked":"")+"><span>"+escapeHtml(translateOption(s.nom))+'</span><strong>'+formatPrice(s.prix)+' FCFA</strong></label>'
    ).join("")+'</fieldset>';
  }
  if(product.type==="tacos"){
    html+='<fieldset><legend>'+escapeHtml(t("meat"))+'</legend>'+product.viandes.map((v,i)=>
      '<label class="option-row"><input type="radio" name="optMeat" value="'+i+'" '+(i===0?"checked":"")+"><span>"+escapeHtml(translateOption(v))+'</span></label>'
    ).join("")+'</fieldset>';
    html+='<fieldset><legend>'+escapeHtml(t("sauces"))+' <small>'+escapeHtml(t("maxSauces"))+'</small></legend>'+product.sauces.map((v,i)=>
      '<label class="option-row"><input type="checkbox" name="optSauce" value="'+i+'"><span>'+escapeHtml(translateOption(v))+'</span></label>'
    ).join("")+'</fieldset>';
    if(Array.isArray(product.supplements)&&product.supplements.length){
      html+='<fieldset><legend>'+escapeHtml(t("extras"))+'</legend>'+product.supplements.map((v,i)=>
        '<label class="option-row"><input type="checkbox" name="optExtra" value="'+i+'"><span>'+escapeHtml(translateOption(v.nom))+'</span><strong>+'+formatPrice(v.prix)+' FCFA</strong></label>'
      ).join("")+'</fieldset>';
    }
  }
  if(product.choix?.options){
    html+='<fieldset><legend>'+escapeHtml(translateOption(product.choix.label||"Choix"))+'</legend>'+product.choix.options.map((v,i)=>
      '<label class="option-row"><input type="radio" name="optChoice" value="'+i+'" '+(i===0?"checked":"")+"><span>"+escapeHtml(translateOption(v))+'</span></label>'
    ).join("")+'</fieldset>';
  }
  body.innerHTML=html; modal.classList.add("open");document.body.classList.add("modal-open");
}
function closeOptions(){ $("optionModal")?.classList.remove("open");document.body.classList.remove("modal-open");currentProduct=null; }
function confirmOptions(){
  if(!currentProduct)return;
  let price=Number(currentProduct.prix)||0, options=[];
  if(currentProduct.type==="pizza"){
    const i=Number(document.querySelector('input[name="optSize"]:checked')?.value??0), size=currentProduct.tailles[i];
    if(!size)return;price=Number(size.prix)||price;options.push(t("size")+": "+size.nom);
  }
  if(currentProduct.type==="tacos"){
    const meatIndex=document.querySelector('input[name="optMeat"]:checked')?.value;
    if(meatIndex===undefined){showToast(t("chooseOne"));return;}
    options.push(t("meat")+": "+currentProduct.viandes[Number(meatIndex)]);
    const sauces=[...document.querySelectorAll('input[name="optSauce"]:checked')].map(n=>currentProduct.sauces[Number(n.value)]);
    if(sauces.length>(currentProduct.maxSauces||2)){showToast(t("maxSauces"));return;}
    if(sauces.length)options.push(t("sauces")+": "+sauces.join(", "));
    const extras=[...document.querySelectorAll('input[name="optExtra"]:checked')].map(n=>currentProduct.supplements[Number(n.value)]);
    if(extras.length){price+=extras.reduce((s,x)=>s+Number(x.prix||0),0);options.push(t("extras")+": "+extras.map(x=>x.nom).join(", "));}
  }
  if(currentProduct.choix?.options){
    const chosen=document.querySelector('input[name="optChoice"]:checked');
    if(!chosen){showToast(t("chooseOne"));return;}
    options.push((currentProduct.choix.label||"Choix")+": "+currentProduct.choix.options[Number(chosen.value)]);
  }
  addToCart({productId:currentProduct.id,nom:currentProduct.nom,prix:price,optionsText:options.join(" • ")});
  closeOptions();
}

function setLanguage(next){
  lang=next;localStorage.setItem(LANG_KEY,lang);applyLanguage();
}
function applyLanguage(){
  commonText();
  const homeHero=$("heroTitle");if(homeHero)homeHero.textContent=t("heroTitle");
  const subtitle=$("heroSubtitle");if(subtitle)subtitle.textContent=t("heroSubtitle");
  const heroCta=$("heroCta");if(heroCta)heroCta.textContent=t("heroCta");
  const discover=$("discoverBtn");if(discover)discover.textContent=t("discover");
  const search=$("searchInput");if(search)search.placeholder=t("search");
  const clear=$("resetSearch");if(clear)clear.textContent=t("clear");
  const menuTitle=$("menuTitle");if(menuTitle)menuTitle.textContent=t("menuTitle");
  const menuKicker=$("menuKicker");if(menuKicker)menuKicker.textContent=t("menuKicker");
  const cartKicker=$("cartKicker");if(cartKicker)cartKicker.textContent=t("selected");
  const cartLive=$("cartLive");if(cartLive)cartLive.textContent=t("cartLive");
  const deliveryHeading=$("deliveryHeading");if(deliveryHeading)deliveryHeading.textContent=t("deliveryHeading");
  const required=$("requiredText");if(required)required.textContent=t("required");
  const fields={clientName:"name",clientPhone:"phone",clientZone:"zone",clientAddress:"address",clientComment:"comment"};
  Object.entries(fields).forEach(([id,key])=>{const n=$(id);if(n)n.placeholder=t(key);});
  const button=$("whatsappBtn");if(button)button.textContent=t("whatsapp");
  const note=$("checkoutNote");if(note)note.textContent=t("recap");
  const total=$("cartTotalLabel");if(total)total.textContent=t("total");
  const prep=$("footerPrep");if(prep)prep.textContent=t("preparation");
  renderFeatured();renderMenu();renderCart();fillClient();
}

function initEvents(){
  commonText();
  document.addEventListener("click",e=>{
    const add=e.target.closest("[data-add]");
    if(add){const p=getProduct(add.dataset.add);if(p)openOptions(p);return;}
    const tab=e.target.closest("[data-category]");
    if(tab){activeCategory=tab.dataset.category;renderMenu();return;}
    const header=e.target.closest(".category-header");
    if(header){const open=header.parentElement.classList.toggle("open");header.setAttribute("aria-expanded",String(open));return;}
    const emptyReset=e.target.closest("#emptyReset");
    if(emptyReset){activeCategory="ALL";searchTerm="";const s=$("searchInput");if(s)s.value="";renderMenu();return;}
    const plus=e.target.closest("[data-plus]");
    if(plus){const item=cart.find(x=>x.key===decodeURIComponent(plus.dataset.plus));if(item){item.qty++;saveCart();renderCart();}return;}
    const minus=e.target.closest("[data-minus]");
    if(minus){const item=cart.find(x=>x.key===decodeURIComponent(minus.dataset.minus));if(item){item.qty--;if(item.qty<=0)cart=cart.filter(x=>x.key!==item.key);saveCart();renderCart();}return;}
    const remove=e.target.closest("[data-remove]");
    if(remove){removeCartItem(decodeURIComponent(remove.dataset.remove));return;}
  });
  $("languageToggle")?.addEventListener("click",()=>setLanguage(lang==="fr"?"en":"fr"));
  $("searchInput")?.addEventListener("input",debounce(e=>{searchTerm=e.target.value.trim();renderMenu();},180));
  $("resetSearch")?.addEventListener("click",()=>{searchTerm="";$("searchInput").value="";renderMenu();$("searchInput").focus();});
  $("whatsappBtn")?.addEventListener("click",sendWhatsApp);
  ["clientName","clientPhone","clientZone","clientAddress","clientComment"].forEach(id=>$(id)?.addEventListener("input",saveClient));
  $("mobileCartBtn")?.addEventListener("click",()=>{window.location.href="commande.html";});
  $("optionModalCancel")?.addEventListener("click",closeOptions);
  $("optionModalCancel2")?.addEventListener("click",closeOptions);
  $("optionModalConfirm")?.addEventListener("click",confirmOptions);
  $("optionModal")?.addEventListener("click",e=>{if(e.target===$("optionModal"))closeOptions();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeOptions();});
}

initEvents();
applyLanguage();
if(document.body.dataset.page) document.body.dataset.page;
