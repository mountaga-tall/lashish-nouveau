/* =====================================================
   LA SHISH - VERSION COMPLÈTE & OPTIMISÉE
===================================================== */

const numeroWhatsApp = "2250140555666";

// Consolidation des menus avec vérification de disponibilité
const allProducts = [
    ...(window.MENU_PLATS || []),
    ...(window.MENU_PIZZAS || []),
    ...(window.MENU_TACOS || []),
    ...(window.MENU_BOISSONS || [])
].filter(p => p.disponible !== false);

let cart = JSON.parse(localStorage.getItem("laShishCart")) || [];
if (!Array.isArray(cart)) cart = [];

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
    mobileCartBtn: document.getElementById("mobileCartBtn"),
    closeCartMobile: document.getElementById("closeCartMobile"),
    cartPanel: document.querySelector(".cart-panel"),
    clientName: document.getElementById("clientName"),
    clientPhone: document.getElementById("clientPhone"),
    clientZone: document.getElementById("clientZone"),
    clientAddress: document.getElementById("clientAddress"),
    clientComment: document.getElementById("clientComment")
};

// Fonctions Utilitaires
function saveCart() { localStorage.setItem("laShishCart", JSON.stringify(cart)); }
function formatPrice(n) { return Number(n || 0).toLocaleString("fr-FR"); }
function escapeHtml(s) { return String(s || "").replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m])); }

// Rendu du Menu (avec prise en compte de la recherche et des catégories)
function renderMenu() {
    let products = allProducts.filter(p => {
        const matchesCategory = (activeCategory === "ALL" || p.categorie === activeCategory);
        const searchLower = searchTerm.toLowerCase().trim();
        const matchesSearch = !searchLower || 
            (p.nom && p.nom.toLowerCase().includes(searchLower)) || 
            (p.description && p.description.toLowerCase().includes(searchLower));
        
        return matchesCategory && matchesSearch;
    });

    if (products.length === 0) {
        el.menuContainer.innerHTML = `<div class="no-results"><p>Aucun produit trouvé.</p></div>`;
        return;
    }

    const groups = products.reduce((o, x) => { (o[x.categorie] ??= []).push(x); return o; }, {});
    
    el.menuContainer.innerHTML = Object.keys(groups).map(cat => `
        <section class="category-block open">
            <h3>${escapeHtml(cat)}</h3>
            <div class="products-grid">
                ${groups[cat].map(productCard).join("")}
            </div>
        </section>
    `).join("");
}

function productCard(p) {
    let priceLabel = "";
    if (p.tailles && p.tailles.length > 0) {
        let min = Math.min(...p.tailles.map(t => t.prix));
        priceLabel = `À partir de ${formatPrice(min)} FCFA`;
    } else {
        priceLabel = formatPrice(p.prix) + " FCFA";
    }
    return `
        <article class="product-card">
            <h4>${escapeHtml(p.nom)}</h4>
            <p>${escapeHtml(p.description || "")}</p>
            <div class="price">${priceLabel}</div>
            <button class="add-btn" data-id="${p.id}">Ajouter</button>
        </article>
    `;
}

// LOGIQUE D'ÉVÉNEMENTS ET CLICS
document.addEventListener("click", e => {
    // 1. Clic "Ajouter" sur la carte produit
    let btn = e.target.closest(".add-btn");
    if (btn && !btn.id) { // s'assure qu'il ne s'agit pas du bouton de la modale
        let p = allProducts.find(x => String(x.id) === String(btn.dataset.id));
        if (p) {
            if (p.tailles && p.tailles.length > 0) {
                openModal(p);
            } else {
                addToCart({ productId: p.id, nom: p.nom, prix: p.prix, options: "" });
            }
        }
    }

    // 2. Clic "Valider" dans la modale
    if (e.target.id === "confirmModalAdd") {
        let selected = document.querySelector('input[name="modalOption"]:checked');
        if (selected && currentModalProduct) {
            let index = selected.value;
            let taille = currentModalProduct.tailles[index];
            
            addToCart({
                productId: currentModalProduct.id,
                nom: currentModalProduct.nom,
                prix: taille.prix,
                options: taille.nom
            });
            el.modal.classList.add("hidden");
        }
    }

    // 3. Fermer modale
    if (e.target.classList.contains("close-modal") || e.target.id === "optionModal") {
        el.modal.classList.add("hidden");
    }

    // 4. Modificateurs de Quantité dans le Panier (+ / - / Supprimer)
    if (e.target.classList.contains("cart-qty-btn")) {
        const key = e.target.dataset.key;
        const action = e.target.dataset.action;
        updateQuantity(key, action);
    }

    // 5. Filtres par Onglet / Catégorie
    let catTab = e.target.closest(".category-tab");
    if (catTab) {
        document.querySelectorAll(".category-tab").forEach(tab => tab.classList.remove("active"));
        catTab.classList.add("active");
        activeCategory = catTab.dataset.category || "ALL";
        renderMenu();
    }
});

// Modale des options
function openModal(p) {
    currentModalProduct = p;
    el.modalContent.innerHTML = `
        <h3>${escapeHtml(p.nom)}</h3>
        ${p.tailles.map((t, i) => `
            <label style="display:block; margin: 10px 0; cursor:pointer;">
                <input type="radio" name="modalOption" value="${i}" ${i === 0 ? 'checked' : ''}>
                ${escapeHtml(t.nom)} - ${formatPrice(t.prix)} FCFA
            </label>
        `).join('')}
        <button id="confirmModalAdd" class="add-btn" style="width:100%; padding:15px; margin-top:10px;">Valider</button>
    `;
    el.modal.classList.remove("hidden");
}

// Gestion du Panier
function addToCart(item) {
    let key = item.productId + (item.options ? "-" + item.options : "");
    let exist = cart.find(x => x.key === key);
    if (exist) { 
        exist.qty++; 
    } else { 
        cart.push({ ...item, key, qty: 1 }); 
    }
    saveCart();
    renderCart();
}

function updateQuantity(key, action) {
    let item = cart.find(x => x.key === key);
    if (!item) return;

    if (action === "increase") {
        item.qty++;
    } else if (action === "decrease") {
        item.qty--;
        if (item.qty <= 0) {
            cart = cart.filter(x => x.key !== key);
        }
    } else if (action === "remove") {
        cart = cart.filter(x => x.key !== key);
    }

    saveCart();
    renderCart();
}

function renderCart() {
    if (!el.cartItems) return;

    if (cart.length === 0) {
        el.cartItems.innerHTML = `<p class="empty-cart-msg">Votre panier est vide.</p>`;
    } else {
        el.cartItems.innerHTML = cart.map(i => `
            <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <div class="cart-item-info">
                    <strong>${escapeHtml(i.nom)}</strong>
                    ${i.options ? `<small style="display:block; color:#666;">${escapeHtml(i.options)}</small>` : ''}
                    <span>${formatPrice(i.prix * i.qty)} FCFA</span>
                </div>
                <div class="cart-item-controls" style="display:flex; align-items:center; gap:5px;">
                    <button class="cart-qty-btn" data-key="${i.key}" data-action="decrease">-</button>
                    <span>${i.qty}</span>
                    <button class="cart-qty-btn" data-key="${i.key}" data-action="increase">+</button>
                    <button class="cart-qty-btn" data-key="${i.key}" data-action="remove" style="color:red; margin-left:5px;">&times;</button>
                </div>
            </div>
        `).join("");
    }

    const grandTotal = cart.reduce((a, b) => a + (b.prix * b.qty), 0);
    const totalFormatted = formatPrice(grandTotal) + " FCFA";

    if (el.cartTotal) el.cartTotal.textContent = totalFormatted;
    if (el.mobileTotal) el.mobileTotal.textContent = totalFormatted;
}

// Recherche dynamique
if (el.searchInput) {
    el.searchInput.addEventListener("input", e => {
        searchTerm = e.target.value;
        if (el.resetSearch) {
            el.resetSearch.style.display = searchTerm ? "block" : "none";
        }
        renderMenu();
    });
}

if (el.resetSearch) {
    el.resetSearch.addEventListener("click", () => {
        searchTerm = "";
        if (el.searchInput) el.searchInput.value = "";
        el.resetSearch.style.display = "none";
        renderMenu();
    });
}

// Panier Mobile (Ouverture / Fermeture)
if (el.mobileCartBtn && el.cartPanel) {
    el.mobileCartBtn.addEventListener("click", () => {
        el.cartPanel.classList.add("open");
    });
}

if (el.closeCartMobile && el.cartPanel) {
    el.closeCartMobile.addEventListener("click", () => {
        el.cartPanel.classList.remove("open");
    });
}

// Envoi de la commande via WhatsApp
if (el.whatsappBtn) {
    el.whatsappBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Votre panier est vide !");
            return;
        }

        const nom = el.clientName?.value.trim() || "Non spécifié";
        const phone = el.clientPhone?.value.trim() || "Non spécifié";
        const zone = el.clientZone?.value.trim() || "Non spécifiée";
        const adresse = el.clientAddress?.value.trim() || "Non spécifiée";
        const commentaire = el.clientComment?.value.trim() || "Aucun";

        let text = `*NOUVELLE COMMANDE - LA SHISH*\n`;
        text += `--------------------------------\n`;
        text += `👤 *Nom:* ${nom}\n`;
        text += `📞 *Téléphone:* ${phone}\n`;
        text += `📍 *Zone/Quartier:* ${zone}\n`;
        text += `🏠 *Adresse:* ${adresse}\n`;
        if (commentaire !== "Aucun") text += `💬 *Note:* ${commentaire}\n`;
        text += `--------------------------------\n\n`;
        text += `🛒 *DÉTAIL DU PANIER :*\n`;

        cart.forEach(item => {
            const opt = item.options ? ` (${item.options})` : "";
            text += `• ${item.qty}x ${item.nom}${opt} - ${formatPrice(item.prix * item.qty)} FCFA\n`;
        });

        const total = cart.reduce((a, b) => a + (b.prix * b.qty), 0);
        text += `\n💰 *TOTAL:* ${formatPrice(total)} FCFA`;

        const encodedUrl = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(text)}`;
        window.open(encodedUrl, "_blank");
    });
}

// Lancement initial
renderMenu();
renderCart();
