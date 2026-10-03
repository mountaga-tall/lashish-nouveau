/* =====================================================
   LA SHISH PREMIUM APP JS
   VERSION FINALE
===================================================== */

const numeroWhatsApp = "2250140555666";

const allProducts = [
    ...(window.MENU_PLATS || []),
    ...(window.MENU_PIZZAS || []),
    ...(window.MENU_TACOS || []),
    ...(window.MENU_BOISSONS || [])
].filter(p => p.disponible !== false).sort((a,b) => Number(a.id) - Number(b.id));

let cart = JSON.parse(localStorage.getItem("laShishCart")) || [];
if(!Array.isArray(cart)) {
    cart = [];
}

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
    mobileCartBtn: document.getElementById("mobileCartBtn"),
    closeCartMobile: document.getElementById("closeCartMobile"),
    cartPanel: document.querySelector(".cart-panel")
};

// Éléments spécifiques à la popup Pizza
const pizzaModal = document.getElementById("pizzaModal");
const pizzaTitle = document.getElementById("pizzaTitle");
const pizzaSizes = document.getElementById("pizzaSizes");
const pizzaAdd = document.getElementById("pizzaAdd");
const pizzaCancel = document.getElementById("pizzaCancel");
let currentPizza = null;

function saveCart() {
    localStorage.setItem("laShishCart", JSON.stringify(cart));
}

function formatPrice(n) {
    return Number(n || 0).toLocaleString("fr-FR");
}

function normalize(str) {
    return String(str || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function debounce(fn, time) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), time);
    };
}

function getProductImageSrc(p) {
    return `images/${p.id}.webp`;
}

function handleImageError(img) {
    let id = img.dataset.productId;
    if(!img.dataset.try) {
        img.dataset.try = "jpg";
        img.src = `images/${id}.jpg`;
        return;
    }
    if(img.dataset.try === "jpg") {
        img.dataset.try = "png";
        img.src = `images/${id}.png`;
        return;
    }
    img.src = "images/no-image.webp";
}

function getCategories() {
    const map = new Map();
    allProducts.forEach(p => {
        if(!map.has(p.categorie)) map.set(p.categorie, p.id);
    });
    return [...map.keys()];
}

function renderCategoryTabs() {
    const cats = getCategories();
    el.categoryTabs.innerHTML = `
        <button class="${activeCategory === "ALL" ? "active" : ""}" data-category="ALL">Tout</button>
        ${cats.map(c => `<button class="${activeCategory === c ? "active" : ""}" data-category="${c}">${escapeHtml(c)}</button>`).join("")}
    `;
}

function renderMenu() {
    renderCategoryTabs();
    let products = allProducts.filter(p => {
        if(activeCategory !== "ALL" && p.categorie !== activeCategory) return false;
        if(searchTerm) {
            return normalize([p.nom, p.description, p.categorie].join(" ")).includes(normalize(searchTerm));
        }
        return true;
    });

    if(!products.length) {
        el.menuContainer.innerHTML = `<div class="search-empty">Aucun produit trouvé</div>`;
        return;
    }

    const groups = groupBy(products, "categorie");
    el.menuContainer.innerHTML = Object.keys(groups).map(cat => `
        <section class="category-block open">
            <button class="category-header">${escapeHtml(cat)}<span>▲</span></button>
            <div class="category-content">
                <div class="products-grid">
                    ${groups[cat].map(productCard).join("")}
                </div>
            </div>
        </section>
    `).join("");
}

function productCard(p) {
    let prix = (p.type === "pizza") 
        ? Math.min(...p.tailles.map(t => t.prix)) + " FCFA" 
        : formatPrice(p.prix) + " FCFA";

    return `
        <article class="product-card">
            <img class="product-img" src="${getProductImageSrc(p)}" loading="lazy" decoding="async" data-product-id="${p.id}" onerror="handleImageError(this)">
            <h4>${escapeHtml(p.nom)}</h4>
            <p>${escapeHtml(p.description || "")}</p>
            <div class="price">${prix}</div>
            <button class="add-btn" data-add="${p.id}">Ajouter</button>
        </article>
    `;
}

function groupBy(arr, key) {
    return arr.reduce((o, x) => {
        (o[x[key]] ??= []).push(x);
        return o;
    }, {});
}

function addToCart(item) {
    const key = item.productId + "-" + item.optionsText;
    let exist = cart.find(x => x.key === key);

    if (exist) {
        exist.qty++;
    } else {
        cart.push({
            ...item,
            prix: Number(item.prix),
            key,
            qty: 1
        });
    }

    saveCart();
    renderCart();

    el.mobileCartBtn.classList.add("cart-bounce");
    setTimeout(() => {
        el.mobileCartBtn.classList.remove("cart-bounce");
    }, 500);

    showToast("Ajouté au panier 🛒");
}

function getTotal() {
    return cart.reduce((total, item) => total + ((Number(item.prix) || 0) * Number(item.qty || 0)), 0);
}
function getItemCount() {
    return cart.reduce((count, item) => count + Number(item.qty || 0), 0);
}

function renderCart() {
    if(!cart.length) {
        el.cartItems.innerHTML = "Votre panier est vide.";
    } else {
        el.cartItems.innerHTML = cart.map(i => `
            <div class="cart-item">
                <b>${i.qty} x ${escapeHtml(i.nom)}</b>
                <p>${i.optionsText || ""}</p>
                <button data-minus="${i.key}">-</button>
                ${i.qty}
                <button data-plus="${i.key}">+</button>
                <button data-remove="${i.key}">❌</button>
            </div>
        `).join("");
    }
    let total = formatPrice(getTotal());
    el.cartTotal.textContent = total;
    el.mobileTotal.textContent = total;
    const mobileCount = document.getElementById("mobileCount");
    if(mobileCount) mobileCount.textContent = getItemCount();
    if(el.whatsappBtn) el.whatsappBtn.disabled = !cart.length;
}

function sendWhatsApp() {
    if(!cart.length) {
        showToast("Panier vide");
        return;
    }

    let name = document.getElementById("clientName").value.trim();
    let phone = document.getElementById("clientPhone").value.trim();
    let zone = document.getElementById("clientZone").value.trim();
    let address = document.getElementById("clientAddress").value.trim();
    let comment = document.getElementById("clientComment").value.trim();

    if(!name || !phone || !zone || !address) {
        showToast("Complétez nom, téléphone, zone et adresse");
        document.querySelector(".client-form")?.classList.add("form-attention");
        return;
    }

    let msg = `🍽️ *COMMANDE LA SHISH*\n\n*Client*\n👤 ${name}\n📞 ${phone}\n📍 ${zone}\n🏠 ${address}\n`;
    if(comment) msg += `💬 ${comment}\n`;
    msg += `\n*Commande*\n`;

    cart.forEach(i => {
        msg += `\n${i.qty}x ${i.nom}`;
        if(i.optionsText) msg += `\n${i.optionsText}`;
        msg += `\n${i.prix * i.qty} FCFA\n`;
    });

    msg += `\n💰 *TOTAL : ${formatPrice(getTotal())} FCFA*\n\n🚚 Livraison à la charge du client.\n💳 Paiement Wave : lien envoyé sur WhatsApp.`;
    window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(msg)}`, "_blank");
}

function showToast(t) {
    let x = document.createElement("div");
    x.className = "toast";
    x.textContent = t;
    document.body.appendChild(x);
    setTimeout(() => x.remove(), 2000);
}

function escapeHtml(s) {
    return String(s || "").replace(/[&<>"']/g, m => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    }[m]));
}

// ==========================================
// GESTION DE LA POPUP PIZZA
// ==========================================

function openPizzaModal(product) {
    currentPizza = product;
    pizzaTitle.textContent = product.nom;
    
    pizzaSizes.innerHTML = product.tailles.map((t, i) => `
        <label>
            <span>
                <input type="radio" name="pizzaSize" value="${i}" ${i === 0 ? "checked" : ""}>
                ${t.nom}
            </span>
            <strong>${formatPrice(t.prix)} FCFA</strong>
        </label>
    `).join("");

    pizzaModal.classList.add("open");
    document.body.classList.add("modal-open");
}

if (pizzaAdd && pizzaCancel && pizzaModal) {
    pizzaAdd.onclick = () => {
        const checkedInput = document.querySelector('input[name="pizzaSize"]:checked');
        if (!checkedInput) return;
        
        const index = Number(checkedInput.value);
        const taille = currentPizza.tailles[index];

        addToCart({
            productId: currentPizza.id,
            nom: currentPizza.nom,
            prix: taille.prix,
            optionsText: taille.nom
        });

        pizzaModal.classList.remove("open");
    };

    pizzaCancel.onclick = () => {
        pizzaModal.classList.remove("open");
    };

    pizzaModal.onclick = (e) => {
        if (e.target === pizzaModal) {
            pizzaModal.classList.remove("open");
        }
    };
}

// ==========================================
// ÉCOUTEURS D'ÉVÉNEMENTS
// ==========================================

el.whatsappBtn.addEventListener("click", sendWhatsApp);
el.mobileCartBtn.addEventListener("click", () => { el.cartPanel.classList.add("open"); document.body.classList.add("cart-open"); });
el.closeCartMobile.addEventListener("click", () => { el.cartPanel.classList.remove("open"); document.body.classList.remove("cart-open"); });

// Délégation d'événements (pour les éléments générés dynamiquement)
document.addEventListener("click", e => {
    // Ajouter au panier
    let add = e.target.closest("[data-add]");
    if (add) {
        let p = allProducts.find(x => x.id == add.dataset.add);
        
        // --- MODIFICATION ICI POUR LES PIZZAS ---
        if (p.type === "pizza") {
            openPizzaModal(p);
        } else {
            addToCart({
                productId: p.id,
                nom: p.nom,
                prix: p.prix,
                optionsText: ""
            });
        }
    }

    // Toggle Catégories
    let catHeader = e.target.closest(".category-header");
    if (catHeader) {
        catHeader.parentElement.classList.toggle("open");
    }

    // Changer de catégorie
    let tab = e.target.closest("[data-category]");
    if (tab) {
        activeCategory = tab.dataset.category;
        renderMenu();
    }

    // Plus / Moins / Supprimer dans le panier
    let plus = e.target.closest("[data-plus]");
    if (plus) {
        let i = cart.find(x => x.key === plus.dataset.plus);
        if(i) { i.qty++; saveCart(); renderCart(); }
    }

    let minus = e.target.closest("[data-minus]");
    if (minus) {
        let i = cart.find(x => x.key === minus.dataset.minus);
        if(i) {
            i.qty--;
            if (i.qty <= 0) cart = cart.filter(x => x.key !== i.key);
            saveCart();
            renderCart();
        }
    }
    
    let remove = e.target.closest("[data-remove]");
    if (remove) {
        cart = cart.filter(x => x.key !== remove.dataset.remove);
        saveCart();
        renderCart();
        showToast("Article supprimé 🗑️");
    }
});

el.searchInput.addEventListener("input", debounce(e => {
    searchTerm = e.target.value;
    renderMenu();
}, 300));

el.resetSearch.onclick = () => {
    searchTerm = "";
    el.searchInput.value = "";
    renderMenu();
};

renderMenu();
renderCart();
