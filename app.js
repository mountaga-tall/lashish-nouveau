/* =====================================================
   LA SHISH PREMIUM APP JS - VERSION 10/10 (PRODUCTION)
===================================================== */

const numeroWhatsApp = "2250140555666";

const allProducts = [
    ...(window.MENU_PLATS || []),
    ...(window.MENU_PIZZAS || []),
    ...(window.MENU_TACOS || []),
    ...(window.MENU_BOISSONS || [])
]
.filter(p => p.disponible !== false)
.sort((a, b) => Number(a.id) - Number(b.id));

let cart = [];
try {
    cart = JSON.parse(localStorage.getItem("laShishCart")) || [];
    if (!Array.isArray(cart)) cart = [];
} catch (e) {
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
    if (!img.dataset.try) {
        img.dataset.try = "jpg";
        img.src = `images/${id}.jpg`;
        return;
    }
    if (img.dataset.try === "jpg") {
        img.dataset.try = "png";
        img.src = `images/${id}.png`;
        return;
    }
    img.src = "images/no-image.webp";
}
window.handleImageError = handleImageError;

function getCategories() {
    const map = new Map();
    allProducts.forEach(p => {
        if (!map.has(p.categorie)) map.set(p.categorie, p.id);
    });
    return [...map.keys()];
}

function renderCategoryTabs() {
    if (!el.categoryTabs) return;

    const cats = getCategories();
    el.categoryTabs.innerHTML = `
        <button class="${activeCategory === "ALL" ? "active" : ""}" data-category="ALL">Tout</button>
        ${cats.map(c => `
            <button class="${activeCategory === c ? "active" : ""}" data-category="${c}">
                ${escapeHtml(c)}
            </button>
        `).join("")}
    `;
}

function groupBy(arr, key) {
    return arr.reduce((o, x) => {
        (o[x[key]] ??= []).push(x);
        return o;
    }, {});
}

function renderMenu() {
    if (!el.menuContainer) return;

    renderCategoryTabs();
    let products = allProducts.filter(p => {
        if (activeCategory !== "ALL" && p.categorie !== activeCategory) return false;
        if (searchTerm) {
            return normalize([p.nom, p.description, p.categorie].join(" ")).includes(normalize(searchTerm));
        }
        return true;
    });

    if (!products.length) {
        el.menuContainer.innerHTML = `<div class="search-empty">Aucun produit trouvé</div>`;
        return;
    }

    const groups = groupBy(products, "categorie");
    el.menuContainer.innerHTML = Object.keys(groups).map(cat => `
        <section class="category-block">
            <button class="category-header">${escapeHtml(cat)} <span>▲</span></button>
            <div class="category-content">
                <div class="products-grid">${groups[cat].map(productCard).join("")}</div>
            </div>
        </section>
    `).join("");

    // Ajout propre des écouteurs d'erreur sur les images (Amélioration #8)
    el.menuContainer.querySelectorAll('.product-img').forEach(img => {
        img.addEventListener('error', function() {
            handleImageError(this);
        }, { once: true });
    });
}

function productCard(p) {
    let prix;
    // Protection tableau tailles (Amélioration #1)
    if (p.type === "pizza" && Array.isArray(p.tailles) && p.tailles.length) {
        prix = Math.min(...p.tailles.map(t => Number(t.prix) || 0)) + " FCFA";
    } else {
        prix = formatPrice(p.prix) + " FCFA";
    }
    
    // Suppression de onerror inline pour utiliser addEventListener
    return `
        <article class="product-card">
            <img class="product-img" src="${getProductImageSrc(p)}" loading="lazy" decoding="async" data-product-id="${p.id}">
            <h4>${escapeHtml(p.nom)}</h4>
            <p>${escapeHtml(p.description || "")}</p>
            <div class="price">${prix}</div>
            <button class="add-btn" data-add="${p.id}">Ajouter</button>
        </article>
    `;
}

function addToCart(item) {
    const key = item.productId + "-" + item.optionsText;
    let exist = cart.find(x => x.key === key);
    if (exist) {
        exist.qty++;
    } else {
        cart.push({ ...item, key, qty: 1 });
    }
    saveCart();
    renderCart();

    el.mobileCartBtn?.classList.add("cart-bounce");
    setTimeout(() => {
        el.mobileCartBtn?.classList.remove("cart-bounce");
    }, 500);
    
    showToast("Ajouté au panier 🛒");
}

function getTotal() {
    return cart.reduce((a, b) => a + ((Number(b.prix) || 0) * (Number(b.qty) || 0)), 0);
}

function renderCart() {
    if (!el.cartItems) return;

    if (!cart.length) {
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
    if (el.cartTotal) el.cartTotal.textContent = total;
    if (el.mobileTotal) el.mobileTotal.textContent = total;
}

function sendWhatsApp() {
    if (!cart.length) {
        showToast("Panier vide");
        return;
    }
    
    const name = document.getElementById("clientName")?.value.trim() || "";
    const phone = document.getElementById("clientPhone")?.value.trim() || "";
    const zone = document.getElementById("clientZone")?.value.trim() || "";
    const address = document.getElementById("clientAddress")?.value.trim() || "";

    if (!name || !phone || !zone || !address) {
        showToast("Complétez vos informations");
        return;
    }

    let msg = `🔥 *COMMANDE LA SHISH* 🔥\n\n👤 ${name}\n📞 ${phone}\n📍 ${zone}\n🏠 ${address}\n\n🛒 Commande:\n`;
    cart.forEach(i => {
        msg += `\n${i.qty}x ${i.nom}`;
        if (i.optionsText) msg += `\n${i.optionsText}`;
        msg += `\n${i.prix * i.qty} FCFA\n`;
    });
    msg += `\n💰 TOTAL ${formatPrice(getTotal())} FCFA`;

    // Utilisation sécurisée de window.open (Amélioration #3)
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
}

function showToast(t) {
    // Nettoyage des anciens toasts (Amélioration #9)
    document.querySelectorAll(".toast").forEach(toast => toast.remove());
    
    let x = document.createElement("div");
    x.className = "toast";
    x.textContent = t;
    document.body.appendChild(x);
    setTimeout(() => x.remove(), 2000);
}

function escapeHtml(s) {
    return String(s || "").replace(/[&<>"']/g, m => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[m]));
}

// LOGIQUE MODAL
function openModal(p) {
    if (!el.modal || !el.modalContent) return;

    currentModalProduct = p;
    let html = `<h3>${escapeHtml(p.nom)}</h3>`;
    
    // Vérification stricte des tailles (Amélioration #2)
    if (p.type === "pizza" && Array.isArray(p.tailles) && p.tailles.length) {
        html += `<p>Choisir la taille :</p>`;
        p.tailles.forEach((t, i) => {
            html += `<label><input type="radio" name="taille" value="${Number(t.prix)||0}" data-nom="${escapeHtml(t.nom)}" ${i===0?'checked':''}> ${escapeHtml(t.nom)} (${formatPrice(t.prix)} FCFA)</label><br>`;
        });
    } else {
        html += `<p class="error">Options indisponibles pour ce produit.</p>`;
    }
    
    el.modalContent.innerHTML = html;
    el.modal.style.display = "block";
}

document.addEventListener("click", e => {
    // Gestion fermeture/ouverture des catégories (Amélioration ajoutée)
    let header = e.target.closest(".category-header");
    if (header) {
        const block = header.closest(".category-block");
        if (block) block.classList.toggle("closed");
    }

    let add = e.target.closest("[data-add]");
    if (add) {
        let p = allProducts.find(x => x.id == add.dataset.add);
        if (!p) return;
        
        if (p.type === "pizza") {
            openModal(p);
        } else {
            // Protection prix cast en Number (Amélioration #10)
            addToCart({ productId: p.id, nom: p.nom, prix: Number(p.prix) || 0, optionsText: "" });
        }
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
            if (i.qty <= 0) cart = cart.filter(x => x !== i);
            saveCart();
            renderCart();
        }
    }

    let remove = e.target.closest("[data-remove]");
    if (remove) {
        cart = cart.filter(x => x.key !== remove.dataset.remove);
        saveCart();
        renderCart();
    }
});

// Confirmation Modal avec protections
if (el.closeModal) {
    el.closeModal.addEventListener("click", () => { 
        if (el.modal) el.modal.style.display = "none"; 
        currentModalProduct = null; // Nettoyage de la mémoire (Amélioration #4)
    });
}

document.getElementById("confirmModal")?.addEventListener("click", () => {
    if (!currentModalProduct) return;
    if (currentModalProduct.type !== "pizza") return;
    
    const selected = document.querySelector('input[name="taille"]:checked');
    if (!selected) return;
    
    const prix = Number(selected.value) || 0;
    const option = selected.dataset.nom || "";
    
    addToCart({ 
        productId: currentModalProduct.id, 
        nom: currentModalProduct.nom, 
        prix: prix, 
        optionsText: option 
    });
    
    if (el.modal) el.modal.style.display = "none";
    currentModalProduct = null; // Nettoyage de la mémoire (Amélioration #7)
});

// Écouteurs globaux
el.searchInput?.addEventListener("input", debounce(e => { 
    searchTerm = e.target.value; 
    renderMenu(); 
}, 300));

el.resetSearch?.addEventListener("click", () => { 
    searchTerm = ""; 
    if (el.searchInput) el.searchInput.value = ""; 
    renderMenu(); 
});

el.whatsappBtn?.addEventListener("click", sendWhatsApp);

el.mobileCartBtn?.addEventListener("click", () => { 
    el.cartPanel?.classList.add("open"); 
});

el.closeCartMobile?.addEventListener("click", () => { 
    el.cartPanel?.classList.remove("open"); 
});

// Initialisation
renderMenu();
renderCart();
