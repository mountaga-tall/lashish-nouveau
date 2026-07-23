const numeroWhatsApp = "2250140555666";

const allProducts = [
  ...(window.MENU_PLATS || []),
  ...(window.MENU_PIZZAS || []),
  ...(window.MENU_TACOS || []),
  ...(window.MENU_BOISSONS || [])
].filter(p => p.disponible !== false).sort((a,b) => Number(a.id) - Number(b.id));

// Optimisation 1 : Récupération du panier depuis le localStorage
let cart = JSON.parse(localStorage.getItem("laShishCart")) || [];
let activeCategory = "ALL";
let searchTerm = "";
let currentModalProduct = null;

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
  closeCartMobile: document.getElementById("closeCartMobile"),
  mobileCartBtn: document.getElementById("mobileCartBtn"),
  cartPanel: document.querySelector(".cart-panel")
};

// Fonction utilitaire pour sauvegarder le panier
function saveCart() {
  localStorage.setItem("laShishCart", JSON.stringify(cart));
}

// Fonction utilitaire de debouncing pour la recherche
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function formatPrice(n){
  return Number(n || 0).toLocaleString("fr-FR");
}

function getProductImageSrc(p){
  return `images/${p.id}.webp`;
}

function handleImageError(img){
  const step = img.dataset.fallbackStep || "webp";
  const id = img.dataset.productId;

  if(step === "webp"){
    img.dataset.fallbackStep = "jpg";
    img.src = `images/${id}.jpg`;
    return;
  }

  if(step === "jpg"){
    img.dataset.fallbackStep = "png";
    img.src = `images/${id}.png`;
    return;
  }

  if(step === "png"){
    img.dataset.fallbackStep = "no-image";
    img.src = "images/no-image.webp";
    return;
  }

  img.style.display = "none";
}

function normalize(str){
  return String(str || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getCategories(){
  const map = new Map();
  allProducts.forEach(p => {
    if(!map.has(p.categorie)){
      map.set(p.categorie, Number(p.id));
    }
  });
  return [...map.entries()].sort((a,b)=>a[1]-b[1]).map(([name])=>name);
}

function renderCategoryTabs(){
  const cats = getCategories();
  el.categoryTabs.innerHTML = `
    <button type="button" class="${activeCategory === "ALL" ? "active" : ""}" data-category-index="ALL">Tout le menu</button>
    ${cats.map((cat, index) => `
      <button type="button" class="${activeCategory === cat ? "active" : ""}" data-category-index="${index}">${escapeHtml(cat)}</button>
    `).join("")}
  `;
}

function productMatches(p){
  if(activeCategory !== "ALL" && p.categorie !== activeCategory) return false;
  if(!searchTerm) return true;
  const haystack = normalize([p.nom, p.description, p.categorie, p.sousCategorie].join(" "));
  return haystack.includes(normalize(searchTerm));
}

function renderMenu(){
  renderCategoryTabs();
  const filtered = allProducts.filter(productMatches);

  if(filtered.length === 0){
    el.menuContainer.innerHTML = `<div class="search-empty">Aucun résultat trouvé.</div>`;
    return;
  }

  const categories = groupBy(filtered, "categorie");

  el.menuContainer.innerHTML = Object.keys(categories).map((cat, catIndex) => {
    const productsInCat = categories[cat];
    const subcats = groupBy(productsInCat, "sousCategorie");
    const isOpen = activeCategory !== "ALL" || searchTerm || catIndex === 0;

    return `
      <section class="category-block ${isOpen ? "open" : ""}" data-category-block>
        <button type="button" class="category-header" data-toggle-category>
          <span>${escapeHtml(cat)}</span>
          <span class="toggle-icon">${isOpen ? "▲" : "▼"}</span>
        </button>
        <div class="category-content">
          ${Object.keys(subcats).map(sub => `
            <div class="subcategory">
              <h3 class="subcat-title">${escapeHtml(sub)}</h3>
              <div class="products-grid">
                ${subcats[sub].map(p => productCard(p)).join("")}
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }).join("");
}

function productCard(p){
  let priceText = "";
  if(p.type === "pizza"){
    const min = Math.min(...p.tailles.map(t=>t.prix));
    const max = Math.max(...p.tailles.map(t=>t.prix));
    priceText = `${formatPrice(min)} - ${formatPrice(max)} FCFA`;
  } else {
    priceText = `${formatPrice(p.prix)} FCFA`;
  }

  return `
    <article class="product-card">
      <img
        class="product-img"
        src="${getProductImageSrc(p)}"
        data-product-id="${escapeAttr(p.id)}"
        data-fallback-step="webp"
        alt="${escapeAttr(p.nom)}"
        loading="lazy"
        onerror="handleImageError(this)"
      >
      <h4>${escapeHtml(p.nom)}</h4>
      ${p.description ? `<p>${escapeHtml(p.description)}</p>` : ""}
      <div class="price">${priceText}</div>
      <button class="add-btn" type="button" data-add-product="${p.id}">Ajouter</button>
    </article>
  `;
}

function groupBy(items, key){
  return items.reduce((acc,item)=>{
    const k = item[key] || "Autres";
    if(!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
}

function openProductOptions(productId){
  const p = allProducts.find(x => Number(x.id) === Number(productId));
  if(!p) return;

  currentModalProduct = p;

  if(p.type === "pizza"){
    renderPizzaModal(p);
  } else if(p.type === "tacos"){
    renderTacosModal(p);
  } else if(p.choix){
    renderChoiceModal(p);
  } else {
    addToCart({
      productId: p.id,
      nom: p.nom,
      prix: p.prix,
      optionsText: "",
      details: {}
    });
  }
}

function renderPizzaModal(p){
  el.modalContent.innerHTML = `
    <div class="option-title">${escapeHtml(p.nom)}</div>
    ${p.description ? `<div class="option-desc">${escapeHtml(p.description)}</div>` : ""}
    <div class="option-group">
      <h4>Choisissez la taille</h4>
      ${p.tailles.map((t,i)=>`
        <label class="option-line">
          <input type="radio" name="pizzaSize" value="${i}" ${i===0 ? "checked" : ""}>
          ${escapeHtml(t.nom)} — ${formatPrice(t.prix)} FCFA
        </label>
      `).join("")}
    </div>
    <div class="option-group">
      <label class="option-line">
        <input type="checkbox" id="pizzaSupplement">
        Supplément + ${formatPrice(p.supplement?.prix || 1000)} FCFA
      </label>
    </div>
    <div class="modal-actions">
      <button class="cancel-btn" type="button" data-close-modal>Annuler</button>
      <button class="confirm-btn" type="button" id="confirmPizza">Ajouter au panier</button>
    </div>
  `;
  showModal();

  document.getElementById("confirmPizza").onclick = () => {
    const sizeIndex = Number(document.querySelector("input[name='pizzaSize']:checked").value);
    const selected = p.tailles[sizeIndex];
    const supp = document.getElementById("pizzaSupplement").checked;
    const extra = supp ? (p.supplement?.prix || 1000) : 0;
    const optionsText = `${selected.nom}${supp ? " + supplément" : ""}`;

    addToCart({
      productId: p.id,
      nom: `${p.nom} (${selected.nom})`,
      prix: selected.prix + extra,
      optionsText,
      details: {taille: selected.nom, supplement: supp}
    });
    hideModal();
  };
}

function renderTacosModal(p){
  el.modalContent.innerHTML = `
    <div class="option-title">${escapeHtml(p.nom)}</div>
    <div class="option-desc">${escapeHtml(p.description || "")}</div>

    <div class="option-group">
      <h4>Viande obligatoire : 1 choix</h4>
      ${p.viandes.map((v,i)=>`
        <label class="option-line">
          <input type="radio" name="tacosViande" value="${escapeAttr(v)}" ${i===0 ? "checked" : ""}>
          ${escapeHtml(v)}
        </label>
      `).join("")}
    </div>

    <div class="option-group">
      <h4>Sauces : maximum ${p.maxSauces || 2}</h4>
      ${p.sauces.map(s=>`
        <label class="option-line">
          <input type="checkbox" name="tacosSauce" value="${escapeAttr(s)}">
          ${escapeHtml(s)}
        </label>
      `).join("")}
    </div>

    ${p.boissons && p.boissons.length ? `
      <div class="option-group">
        <h4>Boisson</h4>
        ${p.boissons.map((b,i)=>`
          <label class="option-line">
            <input type="radio" name="tacosBoisson" value="${escapeAttr(b)}" ${i===0 ? "checked" : ""}>
            ${escapeHtml(b)}
          </label>
        `).join("")}
      </div>
    ` : ""}

    <div class="option-group">
      <h4>Suppléments (+500 FCFA chacun)</h4>
      ${p.supplements.map(s=>`
        <label class="option-line">
          <input type="checkbox" name="tacosSupp" value="${escapeAttr(s.nom)}" data-price="${s.prix}">
          ${escapeHtml(s.nom)} + ${formatPrice(s.prix)} FCFA
        </label>
      `).join("")}
    </div>

    <div class="modal-actions">
      <button class="cancel-btn" type="button" data-close-modal>Annuler</button>
      <button class="confirm-btn" type="button" id="confirmTacos">Ajouter au panier</button>
    </div>
  `;
  showModal();

  document.querySelectorAll("input[name='tacosSauce']").forEach(cb => {
    cb.addEventListener("change", () => {
      const checked = document.querySelectorAll("input[name='tacosSauce']:checked");
      if(checked.length > (p.maxSauces || 2)){
        cb.checked = false;
        alert(`Maximum ${p.maxSauces || 2} sauces.`);
      }
    });
  });

  document.getElementById("confirmTacos").onclick = () => {
    const viande = document.querySelector("input[name='tacosViande']:checked")?.value || "";
    const sauces = [...document.querySelectorAll("input[name='tacosSauce']:checked")].map(x=>x.value);
    if(sauces.length === 0){
      alert("Choisissez au moins une sauce.");
      return;
    }
    const boisson = document.querySelector("input[name='tacosBoisson']:checked")?.value || "";
    const supps = [...document.querySelectorAll("input[name='tacosSupp']:checked")].map(x=>({nom:x.value, prix:Number(x.dataset.price)}));
    const suppTotal = supps.reduce((sum,s)=>sum+s.prix,0);

    const opt = [
      `Viande : ${viande}`,
      `Sauces : ${sauces.join(", ")}`,
      boisson ? `Boisson : ${boisson}` : "",
      supps.length ? `Suppléments : ${supps.map(s=>s.nom).join(", ")}` : ""
    ].filter(Boolean).join(" | ");

    addToCart({
      productId: p.id,
      nom: p.nom,
      prix: p.prix + suppTotal,
      optionsText: opt,
      details: {viande, sauces, boisson, supplements: supps}
    });
    hideModal();
  };
}

function renderChoiceModal(p){
  el.modalContent.innerHTML = `
    <div class="option-title">${escapeHtml(p.nom)}</div>
    ${p.description ? `<div class="option-desc">${escapeHtml(p.description)}</div>` : ""}
    <div class="option-group">
      <h4>${escapeHtml(p.choix.label || "Choix")}</h4>
      ${p.choix.options.map((o,i)=>`
        <label class="option-line">
          <input type="radio" name="normalChoice" value="${escapeAttr(o)}" ${i===0 ? "checked" : ""}>
          ${escapeHtml(o)}
        </label>
      `).join("")}
    </div>
    <div class="modal-actions">
      <button class="cancel-btn" type="button" data-close-modal>Annuler</button>
      <button class="confirm-btn" type="button" id="confirmChoice">Ajouter au panier</button>
    </div>
  `;
  showModal();

  document.getElementById("confirmChoice").onclick = () => {
    const choice = document.querySelector("input[name='normalChoice']:checked")?.value || "";

    let prixFinal = Number(p.prix || 0);

    const supplementMatch = choice.match(/\+\s*([0-9\s.]+)\s*FCFA/i);
    if(supplementMatch){
      const supplement = Number(supplementMatch[1].replace(/[\s.]/g, ""));
      if(!Number.isNaN(supplement)){
        prixFinal += supplement;
      }
    }

    addToCart({
      productId: p.id,
      nom: p.nom,
      prix: prixFinal,
      optionsText: `${p.choix.label || "Choix"} : ${choice}`,
      details: {choix: choice}
    });

    hideModal();
  };
}

function addToCart(item){
  const key = JSON.stringify({id:item.productId, options:item.optionsText});
  const existing = cart.find(x => x.key === key);
  if(existing){
    existing.qty += 1;
  } else {
    cart.push({...item, key, qty:1});
  }
  saveCart(); // Sauvegarde locale
  renderCart();
}

function changeQty(key, delta){
  const item = cart.find(x=>x.key === key);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0){
    cart = cart.filter(x=>x.key !== key);
  }
  saveCart(); // Sauvegarde locale
  renderCart();
}

function removeItem(key){
  cart = cart.filter(x=>x.key !== key);
  saveCart(); // Sauvegarde locale
  renderCart();
}

function getTotal(){
  return cart.reduce((sum,item)=>sum + (Number(item.prix) * item.qty), 0);
}

function renderCart(){
  if(cart.length === 0){
    el.cartItems.className = "cart-items empty";
    el.cartItems.innerHTML = "Votre panier est vide.";
  } else {
    el.cartItems.className = "cart-items";
    el.cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-row">
          <div>
            <div class="cart-item-title">${item.qty} x ${escapeHtml(item.nom)}</div>
            ${item.optionsText ? `<div class="cart-item-options">${escapeHtml(item.optionsText)}</div>` : ""}
          </div>
          <strong>${formatPrice(item.prix * item.qty)}</strong>
        </div>
        <div class="qty-controls">
          <button type="button" data-cart-minus="${escapeAttr(item.key)}">-</button>
          <span>${item.qty}</span>
          <button type="button" data-cart-plus="${escapeAttr(item.key)}">+</button>
          <button class="remove-btn" type="button" data-cart-remove="${escapeAttr(item.key)}">x</button>
        </div>
      </div>
    `).join("");
  }

  const total = formatPrice(getTotal());
  el.cartTotal.textContent = total;
  el.mobileTotal.textContent = total;
}

function sendWhatsApp(){
  if(cart.length === 0){
    alert("Votre panier est vide.");
    return;
  }

  const name = document.getElementById("clientName").value.trim();
  const phone = document.getElementById("clientPhone").value.trim();
  const zone = document.getElementById("clientZone").value.trim();
  const address = document.getElementById("clientAddress").value.trim();
  const comment = document.getElementById("clientComment").value.trim();

  // Optimisation 3 : Validation du numéro de téléphone avec Regex
  const phoneRegex = /^[0-9\s\-\+]{8,15}$/;

  if(!name || !phone || !zone || !address){
    alert("Merci de remplir : nom, téléphone, quartier et adresse.");
    return;
  }

  if (!phoneRegex.test(phone)) {
    alert("Veuillez entrer un numéro de téléphone valide.");
    return;
  }

  let message = "🍽️ NOUVELLE COMMANDE LA SHISH\n\n";
  message += `👤 Client : ${name}\n`;
  message += `📞 Téléphone : ${phone}\n`;
  message += `📍 Quartier : ${zone}\n`;
  message += `🏠 Adresse : ${address}\n\n`;

  message += "🛒 COMMANDE :\n";
  cart.forEach(item => {
    message += `\n- ${item.qty} x ${item.nom}\n`;
    if(item.optionsText) message += `  ${item.optionsText}\n`;
    message += `  Sous-total : ${formatPrice(item.prix * item.qty)} FCFA\n`;
  });

  message += `\n💰 TOTAL : ${formatPrice(getTotal())} FCFA\n\n`;
  message += "🚚 Livraison : à la charge du client via Yango Livraison.\n";
  message += "💳 Paiement : envoyer le lien Wave après validation.\n";
  message += "⏱ Préparation moyenne : 10 à 30 min.\n";
  message += "📞 Contacts La Shish : 07 49 02 03 02 / 01 40 555 666.\n";
  if(comment) message += `\n📝 Commentaire : ${comment}\n`;

  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function showModal(){ el.modal.classList.remove("hidden"); }
function hideModal(){ el.modal.classList.add("hidden"); el.modalContent.innerHTML = ""; }

function escapeHtml(str){
  return String(str || "").replace(/[&<>"']/g, s => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[s]));
}
function escapeAttr(str){ return escapeHtml(str); }

document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add-product]");
  if(add) openProductOptions(add.dataset.addProduct);

  const tab = e.target.closest("[data-category-index]");
  if(tab){
    const value = tab.dataset.categoryIndex;
    activeCategory = value === "ALL" ? "ALL" : getCategories()[Number(value)];
    renderMenu();
    window.scrollTo({top:0, behavior:"smooth"});
  }

  const toggle = e.target.closest("[data-toggle-category]");
  if(toggle){
    const block = toggle.closest("[data-category-block]");
    block.classList.toggle("open");
    const icon = toggle.querySelector(".toggle-icon");
    icon.textContent = block.classList.contains("open") ? "▲" : "▼";
  }

  const close = e.target.closest("[data-close-modal]");
  if(close) hideModal();

  const minus = e.target.closest("[data-cart-minus]");
  if(minus) changeQty(minus.dataset.cartMinus, -1);

  const plus = e.target.closest("[data-cart-plus]");
  if(plus) changeQty(plus.dataset.cartPlus, 1);

  const remove = e.target.closest("[data-cart-remove]");
  if(remove) removeItem(remove.dataset.cartRemove);
});

el.closeModal.addEventListener("click", hideModal);
el.closeCartMobile.addEventListener("click", () => el.cartPanel.classList.remove("open"));
el.modal.addEventListener("click", e => { if(e.target === el.modal) hideModal(); });

// Optimisation 2 : Application du debounce sur la barre de recherche
el.searchInput.addEventListener("input", debounce((e) => {
  searchTerm = e.target.value;
  renderMenu();
}, 300));

el.resetSearch.addEventListener("click", () => {
  searchTerm = "";
  el.searchInput.value = "";
  renderMenu();
});

el.whatsappBtn.addEventListener("click", sendWhatsApp);

el.mobileCartBtn.addEventListener("click", () => {
  el.cartPanel.classList.add("open");
});

el.cartPanel.addEventListener("click", e => {
  if(e.target === el.cartPanel) el.cartPanel.classList.remove("open");
});

renderMenu();
renderCart();
