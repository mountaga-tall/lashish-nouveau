/* La Shish — fast multipage bilingual ordering app */
const WHATSAPP_NUMBER = "2250140555666";
const CART_KEY = "laShishCart";
const LANG_KEY = "laShishLanguage";
const CLIENT_KEY = "laShishClient";

const I18N = {
  fr: {
    home:"Accueil", menu:"Menu", order:"Ma commande", contact:"Contact", catalog:"Toutes les catégories",
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
    footer:"© La Shish — Commande en ligne", language:"Langue", categoryIntro:"Découvrez cette catégorie et commandez directement.",
    loading:"Préparation de la page…", loadingError:"La page n’a pas pu être chargée. Actualisez pour réessayer."
  },
  en: {
    home:"Home", menu:"Menu", order:"My order", contact:"Contact", catalog:"All categories",
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
    footer:"© La Shish — Online ordering", language:"Language", categoryIntro:"Explore this category and order directly.",
    loading:"Loading page…", loadingError:"This page could not be loaded. Refresh to try again."
  }
};

const categoryConfig = {
  "petit-dejeuner": { key:"Petit Déjeuner", fr:"Petit Déjeuner", en:"Breakfast" },
  "entrees": { key:"Entrée froide", fr:"Entrées", en:"Starters" },
  "snacks": { key:"Snack gourmand", fr:"Snacks gourmands", en:"Gourmet Snacks" },
  "plats": { key:"Nos plats", fr:"Nos plats", en:"Main Courses" },
  "specialites": { key:"Spécialités", fr:"Spécialités", en:"Specialties" },
  "pizzas": { key:"Pizza", fr:"Pizzas", en:"Pizzas" },
  "tacos": { key:"French Tacos", fr:"French Tacos", en:"French Tacos" },
  "boissons": { key:"Boisson", fr:"Boissons", en:"Drinks" },
  "desserts": { key:"Dessert", fr:"Desserts", en:"Desserts" },
  "cocktails": { key:"Cocktail", fr:"Cocktails", en:"Cocktails" },
  "vins": { key:"Vin Et Liqueur", fr:"Vins & liqueurs", en:"Wine & Spirits" }
};

const translations = window.MENU_TRANSLATIONS || {names:{},categories:{},subcategories:{},phrases:[]};
let lang = localStorage.getItem(LANG_KEY) === "en" ? "en" : "fr";
let cart = loadCart();
let activeCategory = document.body.dataset.category || "ALL";
let searchTerm = "";
let currentProduct = null;

const $ = id => document.getElementById(id);
const allProducts = [
  ...(window.MENU_PLATS || []), ...(window.MENU_PIZZAS || []),
  ...(window.MENU_TACOS || []), ...(window.MENU_BOISSONS || [])
].filter(p => p && p.disponible !== false).sort((a,b) => Number(a.id)-Number(b.id));

function t(key){ return I18N[lang][key] || key; }
function saveCart(){ try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {} }
function loadCart(){
  try { const value=JSON.parse(localStorage.getItem(CART_KEY)||"[]"); return Array.isArray(value)?value.filter(x=>x&&Number(x.qty)>0):[]; }
  catch { return []; }
}
function saveClient(){
  try {
    const data={};
    ["clientName","clientPhone","clientZone","clientAddress","clientComment"].forEach(id=>{const n=$(id);if(n)data[id]=n.value;});
    localStorage.setItem(CLIENT_KEY,JSON.stringify(data));
  } catch {}
}
function loadClient(){ try { return JSON.parse(localStorage.getItem(CLIENT_KEY)||"{}")||{}; } catch { return {}; } }
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
function categoryLabel(category){ const c=Object.values(categoryConfig).find(x=>x.key===category); return c ? c[lang] : (translations.categories[category]||category); }
function subcategoryLabel(v){ return lang==="en" ? (translations.subcategories[v]||v) : v; }
function getProduct(id){ return allProducts.find(p=>String(p.id)===String(id)); }
function getImage(p){ return "images/"+p.id+".webp"; }
function handleImageError(img){
  const id=img.dataset.productId, step=img.dataset.try||"webp";
  if(step==="webp"){img.dataset.try="jpg";img.src="images/"+id+".jpg";}
  else if(step==="jpg"){img.dataset.try="png";img.src="images/"+id+".png";}
  else{img.onerror=null;img.src="images/no-image.webp";img.alt=t("noImage");}
}
function categorySlugByKey(key){ return Object.entries(categoryConfig).find(([,v])=>v.key===key)?.[0] || ""; }

function renderHeader(){
  document.documentElement.lang=lang;
  const title=document.querySelector("title");
  const page=document.body.dataset.page||"";
  if(title){
    const map={home:lang==="fr"?"La Shish | Commande en ligne":"La Shish | Online ordering",menu:lang==="fr"?"La Shish | Menu":"La Shish | Menu",order:lang==="fr"?"La Shish | Ma commande":"La Shish | My order",contact:lang==="fr"?"La Shish | Contact":"La Shish | Contact",category:lang==="fr"?"La Shish | Menu":"La Shish | Menu"};
    title.textContent=map[page]||"La Shish";
  }
  document.querySelectorAll("[data-i18n]").forEach(n=>{const key=n.dataset.i18n;if(I18N[lang][key])n.textContent=t(key);});
  const toggle=$("languageToggle");
  if(toggle){
    toggle.setAttribute("aria-label",t("language"));
    toggle.setAttribute("aria-pressed",String(lang==="en"));
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
    '<section class="category-block open"><div class="category-header static"><span>'+escapeHtml(subcategoryLabel(sub))+' <small>'+products.length+'</small></span></div><div class="category-content always-open"><div class="products-grid">'+products.map(productCard).join("")+'</div></div></section>'
  ).join("");
}
function productCard(p){
  const isPizza=p.type==="pizza";
  const minPrice=isPizza&&Array.isArray(p.tailles)&&p.tailles.length?Math.min(...p.tailles.map(s=>Number(s.prix)||0)):Number(p.prix)||0;
  return '<article class="product-card"><div class="product-media"><img class="product-img" src="'+getImage(p)+'" alt="'+escapeHtml(displayName(p))+'" loading="lazy" decoding="async" data-product-id="'+p.id+'" onerror="handleImageError(this)">'+
    ((isPizza||p.type==="tacos"||p.choix)?'<span class="product-badge">'+escapeHtml(t("customize"))+'</span>':'')+
    '</div><div class="product-body"><div class="product-meta"><span>'+escapeHtml(categoryLabel(p.categorie))+'</span></div><h3>'+escapeHtml(displayName(p))+'</h3><p>'+escapeHtml(translateText(p.description||""))+'</p>'+
    '<div class="product-footer"><strong class="price">'+(isPizza?t("from")+" ":"")+formatPrice(minPrice)+' FCFA</strong><button class="add-btn" type="button" data-add="'+p.id+'">'+escapeHtml(t("add"))+'</button></div></div></article>';
}
function renderFeatured(){
  const box=$("featuredGrid");if(!box)return;
  const ids=[1,39,60,68,76,113,128,171,199];
  box.innerHTML=ids.map(getProduct).filter(Boolean).map(productCard).join("");
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
    return '<div class="cart-item"><div class="cart-item-main"><strong>'+escapeHtml(item.qty+" × "+cartName(item))+'</strong>'+(item.optionsText?'<span>'+escapeHtml(translateText(item.optionsText))+'</span>':'')+'<b>'+formatPrice(item.prix*item.qty)+' FCFA</b></div><div class="cart-controls"><button type="button" data-minus="'+key+'">−</button><span>'+item.qty+'</span><button type="button" data-plus="'+key+'">+</button><button type="button" class="remove-item" data-remove="'+key+'" aria-label="×">×</button></div></div>';
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
  cart.forEach(i=>{msg+="\n• "+i.qty+" × "+cartName(i)+(i.optionsText?" — "+translateText(i.optionsText):"")+" — "+formatPrice(i.prix*i.qty)+" FCFA";});
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
    price=Number(size.prix)||price;options.push(t("size")+": "+translateOption(size.nom));
    if($("optionModalBody")?.querySelector('input[name="optPizzaExtra"]:checked')){price+=Number(currentProduct.supplement?.prix||0);options.push(t("extras")+": "+translateOption(currentProduct.supplement?.label||"Supplément"));}
  }
  if(currentProduct.type==="tacos"){
    const meat=document.querySelector('input[name="optMeat"]:checked');if(!meat){showToast(t("chooseOne"));return;}
    options.push(t("meat")+": "+translateOption(currentProduct.viandes[Number(meat.value)]));
    const sauces=[...document.querySelectorAll('input[name="optSauce"]:checked')].map(n=>currentProduct.sauces[Number(n.value)]);
    if(sauces.length>(currentProduct.maxSauces||2)){showToast(t("maxSauces"));return;} if(sauces.length)options.push(t("sauces")+": "+sauces.map(translateOption).join(", "));
    const drink=document.querySelector('input[name="optDrink"]:checked');if(drink)options.push(t("drink")+": "+translateOption(currentProduct.boissons[Number(drink.value)]));
    const extras=[...document.querySelectorAll('input[name="optExtra"]:checked')].map(n=>currentProduct.supplements[Number(n.value)]);
    if(extras.length){price+=extras.reduce((s,x)=>s+Number(x.prix||0),0);options.push(t("extras")+": "+extras.map(x=>translateOption(x.nom)).join(", "));}
  }
  if(currentProduct.choix?.options){
    const choice=document.querySelector('input[name="optChoice"]:checked');if(!choice){showToast(t("chooseOne"));return;}
    options.push(translateOption(currentProduct.choix.label||"Choix")+": "+translateOption(currentProduct.choix.options[Number(choice.value)]));
    }
  addToCart({productId:currentProduct.id,nom:currentProduct.nom,prix:price,optionsText:options.join(" • ")});closeOptions();
}
function setLanguage(next){
  if(next===lang)return;
  lang=next;
  try{localStorage.setItem(LANG_KEY,lang);}catch{}
  renderHeader();
  const page=document.body.dataset.page;
  if(page==="home"){renderFeatured();}
  if(page==="menu"){renderCategoryDirectory();}
  if(page==="category"){renderCategoryMenu(categoryConfig[document.body.dataset.category]?.key||"ALL");}
  if(page==="order"||page==="contact"){renderCart();fillClient();}
}
function initEvents(){
  $("languageToggle")?.addEventListener("click",()=>setLanguage(lang==="fr"?"en":"fr"));
  document.addEventListener("click",e=>{
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
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeOptions();});
}
function initApp(){
  renderHeader();
  initEvents();
  const page=document.body.dataset.page;
  if(page==="home")renderFeatured();
  if(page==="menu")renderCategoryDirectory();
  if(page==="category")renderCategoryMenu(categoryConfig[document.body.dataset.category]?.key||"ALL");
  if(page==="order"){renderCart();fillClient();}
  if(page==="contact")renderCart();
}
try{ initApp(); }
catch(error){
  console.error(error);
  const box=$("appError");
  if(box){box.hidden=false;box.textContent=t("loadingError");}
}
finally{
  renderLoader(false);
  window.setTimeout(()=>document.body.classList.add("ready"),40);
}
