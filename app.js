/* La Shish — bilingual ordering app */
const WHATSAPP_NUMBER = "2250140555666";
const CART_KEY = "laShishCart";
const LANG_KEY = "laShishLanguage";

const I18N = {
  fr: {
    loader:"Préparation de votre commande…", subtitle:"La bonne commande, simplement.",
    orderNow:"Commander maintenant ↓", delivery:"Livraison", deliveryWho:"À la charge du client",
    deliveryNote:"Yango Livraison recommandé", payment:"Paiement Wave", paymentNote:"Lien envoyé après validation",
    paymentConfirm:"Commande confirmée sur WhatsApp", menu:"NOTRE MENU", choose:"Choisissez vos favoris",
    search:"Rechercher un plat, pizza, tacos…", clear:"Effacer", all:"Tout", choices:"choix disponibles",
    emptySearch:"Aucun résultat", emptySearchNote:"Essayez un autre mot-clé ou réinitialisez la recherche.",
    showMenu:"Voir tout le menu", order:"Votre commande", live:"En direct", emptyCart:"Votre panier est vide.",
    emptyCartNote:"Ajoutez vos plats préférés pour commencer.", total:"Total", deliveryInfo:"Livraison",
    required:"* obligatoire", name:"Nom du client *", phone:"Téléphone *", zone:"Quartier / zone *",
    address:"Adresse complète *", comment:"Commentaire ou précision (facultatif)",
    whatsapp:"Commander sur WhatsApp →", recap:"Votre commande sera récapitulée dans WhatsApp avant l’envoi.",
    preparation:"Préparation : 10 à 30 min", customize:"PERSONNALISER", cancel:"Annuler", add:"Ajouter au panier",
    personalized:"Personnalisable", added:"Article ajouté au panier 🛒", removed:"Article supprimé 🗑️",
    fill:"Complétez nom, téléphone, zone et adresse", badPhone:"Vérifiez votre numéro de téléphone",
    empty:"Panier vide", article:"article", articles:"articles", deliveryCharge:"Livraison à la charge du client.",
    wave:"Paiement Wave : lien envoyé sur WhatsApp.", client:"Client", command:"Commande",
    noImage:"Image indisponible"
  },
  en: {
    loader:"Preparing your order…", subtitle:"Great food, simply ordered.",
    orderNow:"Order now ↓", delivery:"Delivery", deliveryWho:"Paid by the customer",
    deliveryNote:"Yango Delivery recommended", payment:"Wave payment", paymentNote:"Link sent after validation",
    paymentConfirm:"Order confirmed on WhatsApp", menu:"OUR MENU", choose:"Choose your favorites",
    search:"Search a dish, pizza, tacos…", clear:"Clear", all:"All", choices:"choices available",
    emptySearch:"No results", emptySearchNote:"Try another keyword or reset the search.",
    showMenu:"View full menu", order:"Your order", live:"Live", emptyCart:"Your cart is empty.",
    emptyCartNote:"Add your favorite dishes to get started.", total:"Total", deliveryInfo:"Delivery",
    required:"* required", name:"Customer name *", phone:"Phone *", zone:"Area / neighborhood *",
    address:"Full address *", comment:"Comment or note (optional)",
    whatsapp:"Order on WhatsApp →", recap:"Your order will be summarized in WhatsApp before sending.",
    preparation:"Preparation: 10 to 30 min", customize:"CUSTOMIZE", cancel:"Cancel", add:"Add to cart",
    personalized:"Customizable", added:"Added to cart 🛒", removed:"Item removed 🗑️",
    fill:"Complete name, phone, area and address", badPhone:"Please check your phone number",
    empty:"Empty cart", article:"item", articles:"items", deliveryCharge:"Delivery paid by the customer.",
    wave:"Wave payment: link sent on WhatsApp.", client:"Customer", command:"Order",
    noImage:"Image unavailable"
  }
};

const CATEGORY_I18N = {
  fr: {"Petit Déjeuner":"Petit Déjeuner","Pizza":"Pizza","French Tacos":"French Tacos","Boisson":"Boisson"},
  en: {"Petit Déjeuner":"Breakfast","Pizza":"Pizza","French Tacos":"French Tacos","Boisson":"Drinks"}
};

let lang = localStorage.getItem(LANG_KEY) === "en" ? "en" : "fr";
let cart = loadCart();
let activeCategory = "ALL";
let searchTerm = "";
let currentPizza = null;

const allProducts = [
  ...(window.MENU_PLATS || []),
  ...(window.MENU_PIZZAS || []),
  ...(window.MENU_TACOS || []),
  ...(window.MENU_BOISSONS || [])
].filter(p => p && p.disponible !== false)
 .sort((a,b) => Number(a.id) - Number(b.id));

const $ = id => document.getElementById(id);
const el = {
  categoryTabs:$("categoryTabs"), menuContainer:$("menuContainer"), searchInput:$("searchInput"),
  resetSearch:$("resetSearch"), cartItems:$("cartItems"), cartTotal:$("cartTotal"),
  mobileTotal:$("mobileTotal"), mobileCount:$("mobileCount"), whatsappBtn:$("whatsappBtn"),
  mobileCartBtn:$("mobileCartBtn"), closeCartMobile:$("closeCartMobile"),
  cartPanel:document.querySelector(".cart-panel"), pizzaModal:$("pizzaModal"),
  pizzaTitle:$("pizzaTitle"), pizzaSizes:$("pizzaSizes"), pizzaAdd:$("pizzaAdd"), pizzaCancel:$("pizzaCancel"),
  languageToggle:$("languageToggle")
};

function t(key){ return I18N[lang][key] || key; }
function saveCart(){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
function loadCart(){
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter(x => x && Number(x.qty) > 0) : [];
  } catch { return []; }
}
function formatPrice(n){ return Number(n || 0).toLocaleString(lang === "fr" ? "fr-FR" : "en-US"); }
function normalize(v){ return String(v || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""); }
function escapeHtml(v){ return String(v ?? "").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m])); }
function debounce(fn,ms){ let timer; return (...args)=>{ clearTimeout(timer); timer=setTimeout(()=>fn(...args),ms); }; }
function categoryLabel(c){ return CATEGORY_I18N[lang][c] || c; }
function getImage(product){ return "images/" + product.id + ".webp"; }
function handleImageError(img){
  const id = img.dataset.productId;
  const step = img.dataset.try || "webp";
  if(step === "webp"){ img.dataset.try="jpg"; img.src="images/"+id+".jpg"; }
  else if(step === "jpg"){ img.dataset.try="png"; img.src="images/"+id+".png"; }
  else { img.onerror=null; img.src="images/no-image.webp"; img.alt=t("noImage"); }
}

function applyLanguage(){
  document.documentElement.lang = lang;
  $("loaderText").textContent = t("loader");
  $("heroSubtitle").textContent = t("subtitle");
  $("heroCta").textContent = t("orderNow");
  $("deliveryTitle").textContent = "🚚 " + t("delivery");
  $("deliveryWho").textContent = t("deliveryWho");
  $("deliveryNote").textContent = t("deliveryNote");
  $("paymentTitle").textContent = "💳 " + t("payment");
  $("paymentNote").textContent = t("paymentNote");
  $("paymentConfirm").textContent = t("paymentConfirm");
  $("menuKicker").textContent = t("menu");
  $("menuTitle").textContent = t("choose");
  $("searchInput").placeholder = t("search");
  $("resetSearch").textContent = t("clear");
  $("cartKicker").textContent = lang==="fr" ? "VOTRE SÉLECTION" : "YOUR SELECTION";
  $("cartTitle").textContent = "🛒 " + t("order");
  $("cartLive").textContent = t("live");
  $("deliveryHeading").textContent = t("deliveryInfo");
  $("requiredText").textContent = t("required");
  $("clientName").placeholder=t("name"); $("clientPhone").placeholder=t("phone");
  $("clientZone").placeholder=t("zone"); $("clientAddress").placeholder=t("address"); $("clientComment").placeholder=t("comment");
  $("whatsappBtn").textContent=t("whatsapp"); $("checkoutNote").textContent=t("recap");
  $("footerPrep").textContent="⏱ " + t("preparation");
  $("languageToggle").textContent=lang==="fr" ? "EN" : "FR";
  document.title = lang==="fr" ? "La Shish | Commande en ligne" : "La Shish | Online ordering";
  renderMenu(); renderCart();
}

function getCategories(){ return [...new Set(allProducts.map(p=>p.categorie).filter(Boolean))]; }

function renderCategoryTabs(){
  el.categoryTabs.innerHTML =
    '<button type="button" class="'+(activeCategory==="ALL"?"active":"")+'" data-category="ALL">'+escapeHtml(t("all"))+"</button>" +
    getCategories().map(c=>'<button type="button" class="'+(activeCategory===c?"active":"")+'" data-category="'+escapeHtml(c)+'">'+escapeHtml(categoryLabel(c))+"</button>").join("");
}

function productCard(p){
  const isPizza = p.type === "pizza";
  const price = isPizza ? t("from")+" " : "";
  const minPrice = isPizza && Array.isArray(p.tailles) && p.tailles.length ? Math.min(...p.tailles.map(x=>Number(x.prix)||0)) : Number(p.prix)||0;
  const displayPrice = price + formatPrice(minPrice) + " FCFA";
  return '<article class="product-card">'+
    '<div class="product-media"><img class="product-img" src="'+getImage(p)+'" alt="'+escapeHtml(p.nom)+'" loading="lazy" decoding="async" data-product-id="'+escapeHtml(p.id)+'" onerror="handleImageError(this)">'+
    (isPizza?'<span class="product-badge">'+escapeHtml(t("personalized"))+"</span>":"")+"</div>"+
    '<div class="product-body"><h4>'+escapeHtml(p.nom)+'</h4><p>'+escapeHtml(p.description||"")+'</p>'+
    '<div class="product-footer"><strong class="price">'+escapeHtml(displayPrice)+'</strong><button class="add-btn" type="button" data-add="'+escapeHtml(p.id)+'">'+escapeHtml(t("add"))+"</button></div></div></article>";
}

function renderMenu(){
  renderCategoryTabs();
  const filtered = allProducts.filter(p=>{
    const categoryOk = activeCategory==="ALL" || p.categorie===activeCategory;
    const haystack = normalize([p.nom,p.description,p.categorie].join(" "));
    return categoryOk && (!searchTerm || haystack.includes(normalize(searchTerm)));
  });
  if(!filtered.length){
    el.menuContainer.innerHTML='<div class="search-empty"><strong>'+escapeHtml(t("emptySearch"))+'</strong><span>'+escapeHtml(t("emptySearchNote"))+'</span><button type="button" id="emptyReset">'+escapeHtml(t("showMenu"))+"</button></div>";
    return;
  }
  const groups = filtered.reduce((g,p)=>{ (g[p.categorie] ||= []).push(p); return g; },{});
  el.menuContainer.innerHTML=Object.entries(groups).map(([category,products])=>
    '<section class="category-block open"><button class="category-header" type="button" aria-expanded="true"><span>'+escapeHtml(categoryLabel(category))+' <small>'+products.length+'</small></span><span aria-hidden="true">⌃</span></button>'+
    '<div class="category-content"><div class="products-grid">'+products.map(productCard).join("")+"</div></div></section>"
  ).join("");
}

function getTotal(){ return cart.reduce((sum,item)=>sum+(Number(item.prix)||0)*(Number(item.qty)||0),0); }
function getItemCount(){ return cart.reduce((sum,item)=>sum+(Number(item.qty)||0),0); }
function cartKey(item){ return String(item.productId)+"-"+String(item.optionsText||""); }

function addToCart(item){
  const key=cartKey(item), existing=cart.find(x=>x.key===key);
  if(existing) existing.qty=Number(existing.qty)+1;
  else cart.push({...item,prix:Number(item.prix)||0,optionsText:item.optionsText||"",key,qty:1});
  saveCart(); renderCart(); showToast(t("added")); pulseCart();
}
function pulseCart(){
  if(!el.mobileCartBtn) return;
  el.mobileCartBtn.classList.remove("cart-bounce"); void el.mobileCartBtn.offsetWidth; el.mobileCartBtn.classList.add("cart-bounce");
  setTimeout(()=>el.mobileCartBtn.classList.remove("cart-bounce"),500);
}
function renderCart(){
  if(!cart.length){
    el.cartItems.innerHTML='<div class="cart-empty"><span class="cart-empty-icon">🛒</span><strong>'+escapeHtml(t("emptyCart"))+'</strong><span>'+escapeHtml(t("emptyCartNote"))+"</span></div>";
  } else {
    el.cartItems.innerHTML=cart.map(item=>{
      const key=encodeURIComponent(item.key);
      return '<div class="cart-item"><div class="cart-item-main"><strong>'+escapeHtml(item.qty+" × "+item.nom)+'</strong>'+
        (item.optionsText?'<span>'+escapeHtml(item.optionsText)+"</span>":"")+
        '<b>'+formatPrice(Number(item.prix)*Number(item.qty))+' FCFA</b></div><div class="cart-controls">'+
        '<button type="button" data-minus="'+key+'" aria-label="−">−</button><span>'+item.qty+'</span><button type="button" data-plus="'+key+'" aria-label="+">+</button>'+
        '<button type="button" class="remove-item" data-remove="'+key+'" aria-label="×">×</button></div></div>';
    }).join("");
  }
  el.cartTotal.textContent=formatPrice(getTotal());
  el.mobileTotal.textContent=formatPrice(getTotal());
  el.mobileCount.textContent=getItemCount();
  el.whatsappBtn.disabled=!cart.length;
}

function findCartItem(encoded){ const key=decodeURIComponent(encoded); return cart.find(x=>x.key===key); }
function sendWhatsApp(){
  if(!cart.length){ showToast(t("empty")); return; }
  const client={
    name:$("clientName").value.trim(), phone:$("clientPhone").value.trim(), zone:$("clientZone").value.trim(),
    address:$("clientAddress").value.trim(), comment:$("clientComment").value.trim()
  };
  if(!client.name||!client.phone||!client.zone||!client.address){
    showToast(t("fill")); document.querySelector(".client-form")?.classList.add("form-attention");
    setTimeout(()=>document.querySelector(".client-form")?.classList.remove("form-attention"),900); return;
  }
  if(client.phone.replace(/\D/g,"").length<8){ showToast(t("badPhone")); return; }

  let msg = lang==="fr"
    ? "🍽️ *COMMANDE LA SHISH*\n\n*Client*\n"
    : "🍽️ *LA SHISH ORDER*\n\n*Customer*\n";
  msg += "👤 "+client.name+"\n📞 "+client.phone+"\n📍 "+client.zone+"\n🏠 "+client.address+"\n";
  if(client.comment) msg += "💬 "+client.comment+"\n";
  msg += "\n*"+t("command")+"*\n";
  cart.forEach(item=>{
    msg += "\n• "+item.qty+" × "+item.nom+(item.optionsText?" — "+item.optionsText:"")+" — "+formatPrice(item.prix*item.qty)+" FCFA";
  });
  msg += "\n\n💰 *"+t("total").toUpperCase()+" : "+formatPrice(getTotal())+" FCFA*\n🚚 "+t("deliveryCharge")+"\n💳 "+t("wave");
  window.open("https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(msg),"_blank","noopener,noreferrer");
}

function showToast(message){
  document.querySelector(".toast")?.remove();
  const node=document.createElement("div"); node.className="toast"; node.textContent=message; document.body.appendChild(node);
  setTimeout(()=>node.remove(),2200);
}

function openPizzaModal(product){
  if(!el.pizzaModal||!Array.isArray(product.tailles)||!product.tailles.length) return;
  currentPizza=product; el.pizzaTitle.textContent=product.nom;
  el.pizzaSizes.innerHTML=product.tailles.map((size,i)=>
    '<label class="pizza-size-option"><span><input type="radio" name="pizzaSize" value="'+i+'" '+(i===0?"checked":"")+'> '+escapeHtml(size.nom)+'</span><strong>'+formatPrice(size.prix)+' FCFA</strong></label>'
  ).join("");
  el.pizzaModal.classList.add("open"); document.body.classList.add("modal-open");
}
function closePizzaModal(){ el.pizzaModal?.classList.remove("open"); document.body.classList.remove("modal-open"); currentPizza=null; }

document.addEventListener("click",e=>{
  const add=e.target.closest("[data-add]");
  if(add){
    const product=allProducts.find(p=>String(p.id)===String(add.dataset.add));
    if(!product) return;
    if(product.type==="pizza") openPizzaModal(product);
    else addToCart({productId:product.id,nom:product.nom,prix:product.prix});
    return;
  }
  const tab=e.target.closest("[data-category]");
  if(tab){ activeCategory=tab.dataset.category; renderMenu(); return; }
  const header=e.target.closest(".category-header");
  if(header){ const open=header.parentElement.classList.toggle("open"); header.setAttribute("aria-expanded",String(open)); return; }
  const emptyReset=e.target.closest("#emptyReset");
  if(emptyReset){ activeCategory="ALL"; searchTerm=""; el.searchInput.value=""; renderMenu(); return; }

  const plus=e.target.closest("[data-plus]"); if(plus){const item=findCartItem(plus.dataset.plus);if(item){item.qty++;saveCart();renderCart();}return;}
  const minus=e.target.closest("[data-minus]"); if(minus){const item=findCartItem(minus.dataset.minus);if(item){item.qty--;if(item.qty<=0)cart=cart.filter(x=>x.key!==item.key);saveCart();renderCart();}return;}
  const remove=e.target.closest("[data-remove]"); if(remove){cart=cart.filter(x=>x.key!==decodeURIComponent(remove.dataset.remove));saveCart();renderCart();showToast(t("removed"));return;}
});

el.searchInput?.addEventListener("input",debounce(e=>{searchTerm=e.target.value.trim();renderMenu();},180));
el.resetSearch?.addEventListener("click",()=>{searchTerm="";el.searchInput.value="";renderMenu();el.searchInput.focus();});
el.whatsappBtn?.addEventListener("click",sendWhatsApp);
el.mobileCartBtn?.addEventListener("click",()=>{el.cartPanel?.classList.add("open");document.body.classList.add("cart-open");});
el.closeCartMobile?.addEventListener("click",()=>{el.cartPanel?.classList.remove("open");document.body.classList.remove("cart-open");});
el.languageToggle?.addEventListener("click",()=>{lang=lang==="fr"?"en":"fr";localStorage.setItem(LANG_KEY,lang);applyLanguage();});
el.pizzaAdd?.addEventListener("click",()=>{
  if(!currentPizza) return;
  const selected=document.querySelector('input[name="pizzaSize"]:checked');
  if(!selected) return;
  const size=currentPizza.tailles[Number(selected.value)];
  addToCart({productId:currentPizza.id,nom:currentPizza.nom,prix:size.prix,optionsText:size.nom});
  closePizzaModal();
});
el.pizzaCancel?.addEventListener("click",closePizzaModal);
el.pizzaModal?.addEventListener("click",e=>{if(e.target===el.pizzaModal)closePizzaModal();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closePizzaModal();el.cartPanel?.classList.remove("open");document.body.classList.remove("cart-open");}});

applyLanguage();
