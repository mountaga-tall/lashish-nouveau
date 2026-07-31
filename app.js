/* =====================================================
   LA SHISH PREMIUM APP JS - VERSION FINALE (CORRIGEE)
===================================================== */

const numeroWhatsApp = "2250140555666";

// Fusionner tous les produits depuis les fichiers data
const allProducts = [
    ...(window.MENU_PLATS || []),
    ...(window.MENU_PIZZAS || []),
    ...(window.MENU_TACOS || []),
    ...(window.MENU_BOISSONS || [])
]
.filter(p => p.disponible !== false)
.sort((a, b) => Number(a.id) - Number(b.id));

// Initialisation et NETTOYAGE DU PANIER
let cart = JSON.parse(localStorage.getItem("laShishCart")) || [];
if (!Array.isArray(cart)) {
    cart = [];
}
// 🛡️ CORRECTION : On nettoie la mémoire des anciens bugs (supprime les articles à 0 FCFA)
cart = cart.map(item => {
    item.prix = Number(item.prix) || 0;
    item.qty = Number(item.qty) || 1;
    return item;
}).filter(item => item.prix > 0);

let activeCategory = "ALL";
let searchTerm = "";
let currentModalProduct = null;

// Éléments du DOM
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
    cartPanel: document.querySelector(".cart-panel"),
    clientName: document.getElementById("clientName"),
    clientPhone: document.getElementById("clientPhone"),
    clientZone: document.getElementById("clientZone"),
    clientAddress: document.getElementById("clientAddress"),
    clientComment: document.getElementById("clientComment")
};

// Fonctions utilitaires
function saveCart() {
    localStorage.setItem("laShishCart", JSON.stringify(cart));
}

function formatPrice(n) {
    return Number(n || 0).toLocaleString("fr-FR");
}

function normalize(str) {
    return String(str || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
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

function escapeHtml(s) {
    return String(s || "").replace(/[&<>"']/g, m => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    }[m]));
}

// Catégories et affichage du menu
function getCategories() {
    const map = new Map();
    allProducts.forEach(p => {
        if (!map.has(p.categorie)) map.set(p.categorie, p.id);
    });
    return [...map.keys()];
}

function renderCategoryTabs() {
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

function renderMenu() {
    renderCategoryTabs();
    let products = allProducts.filter(p => {
        if (activeCategory !== "ALL" && p.categorie !== activeCategory) return false;
        if (searchTerm) {
            return normalize([p.nom, p.description, p.categorie].join(" "))
                .includes(normalize(searchTerm));
        }
        return true;
    });

    if (!products.length) {
        el.menuContainer.innerHTML = `<div class="search-empty">Aucun produit trouvé</div>`;
        return;
    }

    const groups = groupBy(products, "categorie");
    el.menuContainer.innerHTML = Object.keys(groups).map(cat => `
        <section class="category-block open">
            <button class="category-header">
                ${escapeHtml(cat)} <span>▲</span>
            </button>
            <div class="category-content">
                <div class="products-grid">
                    ${groups[cat].map(productCard).join("")}
                </div>
            </div>
        </section>
    `).join("");
}

function productCard(p) {
    let prixDisplay = "0 FCFA";
    
    // Si c'est une pizza (ou un produit avec des tailles), on affiche le prix "À partir de"
    if (p.tailles && p.tailles.length > 0) {
        let minPrice = Math.min(...p.tailles.map(t => Number(t.prix) || 0));
        prixDisplay = formatPrice(minPrice) + " FCFA";
    } else {
        prixDisplay = formatPrice(p.prix) + " FCFA";
    }
        
    return `
        <article class="product-card">
            <img class="product-img" src="${getProductImageSrc(p)}" loading="lazy" decoding="async" data-product-id="${p.id}" onerror="handleImageError(this)">
            <h4>${escapeHtml(p.nom)}</h4>
            <p>${escapeHtml(p.description || "")}</p>
            <div class="price">${prixDisplay}</div>
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

// Modale (Options / Tailles pour Pizzas)
function openModal(p) {
    currentModalProduct = p;
    
    let optionsHtml = "";
    if (p.tailles && p.tailles.length > 0) {
        optionsHtml = `
            <div class="options-list">
                <h4>Choisissez la taille :</h4>
                ${p.tailles.map((t, idx) => `
                    <label style="display: flex; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                        <input type="radio" name="modalOption" value="${idx}" ${idx === 0 ? "checked" : ""}>
                        <span>${escapeHtml(t.nom)} - ${formatPrice(t.prix)} FCFA</span>
                    </label>
                `).join("")}
            </div>
        `;
    }

    let modalHtml = `
        <div style="text-align: center; margin-bottom: 15px;">
            <img src="${getProductImageSrc(p)}" style="max-width: 100px; border-radius: 8px;" onerror="handleImageError(this)">
            <h3 style="margin: 10px 0 5px 0;">${escapeHtml(p.nom)}</h3>
            <p style="font-size: 0.9em; color: #666;">${escapeHtml(p.description || "")}</p>
        </div>
        ${optionsHtml}
        <button id="confirmModalAdd" class="add-btn" style="width: 100%; margin-top: 15px; padding: 12px;">Ajouter au panier</button>
    `;

    el.modalContent.innerHTML = modalHtml;
    el.modal.classList.remove("hidden");

    // 🛡️ CORRECTION : Forcer la récupération du prix en format Nombre
    document.getElementById("confirmModalAdd").onclick = () => {
        let prix = Number(p.prix) || 0;
        let optionText = "";
        
        if (p.tailles && p.tailles.length > 0) {
            let selectedRadio = document.querySelector('input[name="modalOption"]:checked');
            if (selectedRadio) {
                let selectedIdx = parseInt(selectedRadio.value, 10);
                let selectedTaille = p.tailles[selectedIdx];
                prix = Number(selectedTaille.prix) || 0;
                optionText = selectedTaille.nom || "";
            }
        }

        addToCart({
            productId: p.id,
            nom: p.nom,
            prix: prix,
            optionsText: optionText
        });
        
        closeModal();
    };
}

function closeModal() {
    el.modal.classList.add("hidden");
    el.modalContent.innerHTML = "";
    currentModalProduct = null;
}

// Panier
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
    
    el.mobileCartBtn.classList.add("cart-bounce");
    setTimeout(() => el.mobileCartBtn.classList.remove("cart-bounce"), 500);
    showToast("Ajouté au panier 🛒");
}

function getTotal() {
    // 🛡️ CORRECTION : Calcul du total sécurisé avec des Nombres
    return cart.reduce((total, item) => {
        let p = Number(item.prix) || 0;
        let q = Number(item.qty) || 1;
        return total + (p * q);
    }, 0);
}

function renderCart() {
    if (!cart.length) {
        el.cartItems.innerHTML = "Votre panier est vide.";
    } else {
        el.cartItems.innerHTML = cart.map(i => `
            <div class="cart-item">
                <b>${i.qty} x ${escapeHtml(i.nom)}</b>
                <p style="font-size:0.8em; color:gray;">${i.optionsText || ""}</p>
                <div style="margin-top:5px;">
                    <button data-minus="${i.key}">-</button>
                    ${i.qty}
                    <button data-plus="${i.key}">+</button>
                    <button data-remove="${i.key}" style="margin-left:10px;">❌</button>
                </div>
            </div>
        `).join("");
    }
    
    let total = formatPrice(getTotal());
    el.cartTotal.textContent = total;
    el.mobileTotal.textContent = total;
}

// Envoi WhatsApp
function sendWhatsApp() {
    if (!cart.length) {
        showToast("Panier vide");
        return;
    }
    
    let name = el.clientName.value.trim();
    let phone = el.clientPhone.value.trim();
    let zone = el.clientZone.value.trim();
    let address = el.clientAddress.value.trim();
    let comment = el.clientComment.value.trim();
    
    if (!name || !phone || !zone || !address) {
        showToast("Complétez vos informations de livraison");
        return;
    }
    
    let msg = `🔥 *COMMANDE LA SHISH* 🔥\n\n👤 ${name}\n📞 ${phone}\n📍 ${zone}\n🏠 ${address}\n\n`;
    if (comment) {
        msg += `📝 ${comment}\n\n`;
    }
    
    msg += "🛒 Commande:\n";
    cart.forEach(i => {
        msg += `\n${i.qty}x ${i.nom}`;
        if (i.optionsText) msg += `\n   ${i.optionsText}`;
        msg += `\n   ${formatPrice((Number(i.prix) || 0) * i.qty)} FCFA\n`;
    });
    
    msg += `\n💰 TOTAL : ${formatPrice(getTotal())} FCFA`;
    
    window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(msg)}`, "_blank");
}

function showToast(t) {
    let x = document.createElement("div");
    x.className = "toast";
    x.textContent = t;
    document.body.appendChild(x);
    setTimeout(() => x.remove(), 2000);
}

// Événements globaux
document.addEventListener("click", e => {
    // Bouton Ajouter
    let add = e.target.closest("[data-add]");
    if (add) {
        let p = allProducts.find(x => x.id == add.dataset.add);
        if (p.tailles && p.tailles.length > 0) {
            openModal(p);
        } else {
            addToCart({
                productId: p.id,
                nom: p.nom,
                prix: Number(p.prix) || 0,
                optionsText: ""
            });
        }
    }
    
    // Onglets catégories
    let tab = e.target.closest("[data-category]");
    if (tab) {
        activeCategory = tab.dataset.category;
        renderMenu();
    }
    
    // Bouton + panier
    let plus = e.target.closest("[data-plus]");
    if (plus) {
        let i = cart.find(x => x.key === plus.dataset.plus);
        if (i) i.qty++;
        saveCart();
        renderCart();
    }
    
    // Bouton - panier
    let minus = e.target.closest("[data-minus]");
    if (minus) {
        let i = cart.find(x => x.key === minus.dataset.minus);
        if (i) {
            i.qty--;
            if (i.qty <= 0) cart = cart.filter(x => x !== i);
        }
        saveCart();
        renderCart();
    }
    
    // Bouton Supprimer
    let remove = e.target.closest("[data-remove]");
    if (remove) {
        cart = cart.filter(item => item.key !== remove.dataset.remove);
        saveCart();
        renderCart();
        showToast("Produit supprimé");
    }
});

// Événements modale
el.closeModal.onclick = closeModal;
el.modal.addEventListener("click", e => {
    if (e.target === el.modal) closeModal();
});

// Barre de recherche
el.searchInput.addEventListener("input", debounce(e => {
    searchTerm = e.target.value;
    renderMenu();
}, 300));

el.resetSearch.onclick = () => {
    searchTerm = "";
    el.searchInput.value = "";
    renderMenu();
};

// Actions principales
el.whatsappBtn.onclick = sendWhatsApp;
el.mobileCartBtn.onclick = () => el.cartPanel.classList.add("open");
el.closeCartMobile.onclick = () => el.cartPanel.classList.remove("open");

// Initialisation au chargement
renderMenu();
renderCart();
