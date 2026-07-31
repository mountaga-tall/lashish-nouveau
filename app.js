/* =====================================================
   LA SHISH PREMIUM APP JS
   VERSION FINALE - OPTIMISÉE
===================================================== */

const numeroWhatsApp = "2250140555666";

const allProducts = [
  ...(window.MENU_PLATS || []),
  ...(window.MENU_PIZZAS || []),
  ...(window.MENU_TACOS || []),
  ...(window.MENU_BOISSONS || [])
].filter(p => p.disponible !== false).sort((a, b) => Number(a.id) - Number(b.id));

let cart = Array.isArray(JSON.parse(localStorage.getItem("laShishCart"))) 
           ? JSON.parse(localStorage.getItem("laShishCart")) 
           : [];

let activeCategory = "ALL";
let searchTerm = "";

const el = {
  categoryTabs: document.getElementById("categoryTabs"),
  menuContainer: document.getElementById("menuContainer"),
  searchInput: document.getElementById("searchInput"),
  resetSearch: document.getElementById("resetSearch"),
  cartItems: document.getElementById("cartItems"),
  cartTotal: document.getElementById("cartTotal"),
  mobileTotal: document.getElementById("mobileTotal"),
  whatsappBtn: document.getElementById("whatsappBtn"),
  modal: document.getElementById("optionModal"),
  modalContent: document.getElementById("modalContent"),
  closeModal: document.getElementById("closeModal"),
  mobileCartBtn: document.getElementById("mobileCartBtn"),
  closeCartMobile: document.getElementById("closeCartMobile"),
  cartPanel: document.querySelector(".cart-panel")
};

const saveCart = () => localStorage.setItem("laShishCart", JSON.stringify(cart));
const formatPrice = n => Number(n || 0).toLocaleString("fr-FR");
const normalize = str => String(str || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const debounce = (fn, time) => {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), time); };
};
const escapeHtml = s => String(s || "").replace(/[&<>"']/g, m => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"}[m]));
const getProductImageSrc = p => `images/${p.id}.webp`;

// Attaché à window pour fonctionner avec l'attribut HTML onerror
window.handleImageError = (img) => {
  let id = img.dataset.productId;
  if (!img.dataset.try) { img.dataset.try = "jpg"; img.src = `images/${id}.jpg`; }
  else if (img.dataset.try === "jpg") { img.dataset.try = "png"; img.src = `images/${id}.png`; }
  else { img.src = "images/no-image.webp"; }
};

const getCategories = () => [...new Set(allProducts.map(p => p.categorie))];
const groupBy = (arr, key) => arr.reduce((o, x) => { (o[x[key]] ??= []).push(x); return o; }, {});

function renderCategoryTabs() {
  const cats = getCategories();
  if (el.categoryTabs) {
    el.categoryTabs.innerHTML = `
      <button class="${activeCategory === "ALL" ? "active" : ""}" data-category="ALL">Tout</button>
      ${cats.map(c => `<button class="${activeCategory === c ? "active" : ""}" data-category="${c}">${escapeHtml(c)}</button>`).join("")}
    `;
  }
}

function renderMenu() {
  renderCategoryTabs();
  let products = allProducts.filter(p => {
    if (activeCategory !== "ALL" && p.categorie !== activeCategory) return false;
    if (searchTerm) return normalize([p.nom, p.description, p.categorie].join(" ")).includes(normalize(searchTerm));
    return true;
  });

  if (!products.length) {
    if (el.menuContainer) el.menuContainer.innerHTML = `<div class="search-empty">Aucun produit trouvé</div>`;
    return;
  }

  const groups = groupBy(products, "categorie");
  if (el.menuContainer) {
    el.menuContainer.innerHTML = Object.keys(groups).map(cat => `
      <section class="category-block open">
        <button class="category-header">${escapeHtml(cat)} <span>▲</span></button>
        <div class="category-content">
          <div class="products-grid">
            ${groups[cat].map(productCard).join("")}
          </div>
        </div>
      </section>
    `).join("");
  }
}

function productCard(p) {
  let prix = (p.type === "pizza" && Array.isArray(p.tailles)) ? Math.min(...p.tailles.map(t => t.prix)) : (p.prix || 0);
  return `
    <article class="product-card">
      <img class="product-img" src="${getProductImageSrc(p)}" loading="lazy" decoding="async" data-product-id="${p.id}" onerror="handleImageError(this)">
      <h4>${escapeHtml(p.nom)}</h4>
      <p>${escapeHtml(p.description || "")}</p>
      <div class="price">${formatPrice(prix)} FCFA</div>
      <button class="add-btn" data-add="${p.id}">Ajouter</button>
    </article>
  `;
}

function addToCart(item) {
  const key = item.productId + "-" + item.optionsText;
  let exist = cart.find(x => x.key === key);
  if (exist) exist.qty++;
  else cart.push({ ...item, key, qty: 1 });
  
  saveCart();
  renderCart();
  
  if (el.mobileCartBtn) {
    el.mobileCartBtn.classList.add("cart-bounce");
    setTimeout(() => el.mobileCartBtn.classList.remove("cart-bounce"), 500);
  }
  showToast("Ajouté au panier 🛒");
}

const getTotal = () => cart.reduce((a, b) => a + (b.prix * b.qty), 0);

function renderCart() {
  if (!el.cartItems) return;
  
  if (!cart.length) {
    el.cartItems.innerHTML = "Votre panier est vide.";
  } else {
    el.cartItems.innerHTML = cart.map(i => `
      <div class="cart-item">
        <b>${i.qty} x ${escapeHtml(i.nom)}</b>
        <p>${i.optionsText || ""}</p>
        <button data-minus="${i.key}">-</button> ${i.qty} <button data-plus="${i.key}">+</button>
        <button data-remove="${i.key}">❌</button>
      </div>
    `).join("");
  }
  
  let total = formatPrice(getTotal());
  if (el.cartTotal) el.cartTotal.textContent = total;
  if (el.mobileTotal) el.mobileTotal.textContent = total;
}

function sendWhatsApp() {
  if (!cart.length) return showToast("Panier vide");
  
  let name = document.getElementById("clientName")?.value.trim() || "";
  let phone = document.getElementById("clientPhone")?.value.trim() || "";
  let zone = document.getElementById("clientZone")?.value.trim() || "";
  let address = document.getElementById("clientAddress")?.value.trim() || "";

  if (!name || !phone || !zone || !address) return showToast("Complétez vos informations");

  let msg = `🔥 *COMMANDE LA SHISH* 🔥\n\n👤 ${name}\n📞 ${phone}\n📍 ${zone}\n🏠 ${address}\n\n🛒 Commande:\n`;
  
  cart.forEach(i => {
    msg += `\n${i.qty}x ${i.nom}`;
    if (i.optionsText) msg += `\n${i.optionsText}`;
    msg += `\n${formatPrice(i.prix * i.qty)} FCFA\n`;
  });
  
  msg += `\n💰 TOTAL ${formatPrice(getTotal())} FCFA`;
  window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(msg)}`, "_blank");
}

function showToast(t) {
  let x = document.createElement("div");
  x.className = "toast";
  x.textContent = t;
  document.body.appendChild(x);
  setTimeout(() => x.remove(), 2000);
}

// Événements globaux via délégation
document.addEventListener("click", e => {
  let add = e.target.closest("[data-add]");
  if (add) {
    let p = allProducts.find(x => x.id == add.dataset.add);
    let prix = (p.type === "pizza" && !p.prix && Array.isArray(p.tailles)) 
               ? Math.min(...p.tailles.map(t => t.prix)) 
               : (p.prix || 0);
    addToCart({ productId: p.id, nom: p.nom, prix: prix, optionsText: "" });
  }

  let tab = e.target.closest("[data-category]");
  if (tab) {
    activeCategory = tab.dataset.category;
    renderMenu();
  }

  let plus = e.target.closest("[data-plus]");
  if (plus) {
    let i = cart.find(x => x.key === plus.dataset.plus);
    if (i) { i.qty++; saveCart(); renderCart(); }
  }

  let minus = e.target.closest("[data-minus]");
  if (minus) {
    let i = cart.find(x => x.key === minus.dataset.minus);
    if (i) {
      i.qty--;
      if (i.qty <= 0) cart = cart.filter(x => x.key !== minus.dataset.minus);
      saveCart(); renderCart();
    }
  }

  let remove = e.target.closest("[data-remove]");
  if (remove) {
    cart = cart.filter(x => x.key !== remove.dataset.remove);
    saveCart(); renderCart();
  }
});

// Écouteurs d'événements spécifiques
if (el.searchInput) {
  el.searchInput.addEventListener("input", debounce(e => {
    searchTerm = e.target.value;
    renderMenu();
  }, 300));
}

if (el.resetSearch) {
  el.resetSearch.onclick = () => {
    searchTerm = "";
    if (el.searchInput) el.searchInput.value = "";
    renderMenu();
  };
}

if (el.whatsappBtn) el.whatsappBtn.onclick = sendWhatsApp;
if (el.mobileCartBtn && el.cartPanel) el.mobileCartBtn.onclick = () => el.cartPanel.classList.add("open");
if (el.closeCartMobile && el.cartPanel) el.closeCartMobile.onclick = () => el.cartPanel.classList.remove("open");

// Initialisation au chargement
renderMenu();
renderCart();
