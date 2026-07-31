/* =====================================================
   LA SHISH - VERSION FINALE (ADAPTÉE À TA STRUCTURE JSON)
===================================================== */

const numeroWhatsApp = "2250140555666";

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

function saveCart() { localStorage.setItem("laShishCart", JSON.stringify(cart)); }
function formatPrice(n) { return Number(n || 0).toLocaleString("fr-FR"); }
function escapeHtml(s) { return String(s || "").replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m])); }

function renderMenu() {
    let products = allProducts.filter(p => {
        if (activeCategory !== "ALL" && p.categorie !== activeCategory) return false;
        return true;
    });

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

// LOGIQUE D'AJOUT
document.addEventListener("click", e => {
    // 1. Clic "Ajouter" sur la carte produit
    let btn = e.target.closest(".add-btn");
    if (btn) {
        let p = allProducts.find(x => String(x.id) === String(btn.dataset.id));
        if (p.tailles && p.tailles.length > 0) {
            openModal(p);
        } else {
            addToCart({ productId: p.id, nom: p.nom, prix: p.prix, options: "" });
        }
    }
    // 2. Clic "Ajouter" dans la modale
    if (e.target.id === "confirmModalAdd") {
        let selected = document.querySelector('input[name="modalOption"]:checked');
        let index = selected ? selected.value : 0;
        let taille = currentModalProduct.tailles[index];
        
        addToCart({
            productId: currentModalProduct.id,
            nom: currentModalProduct.nom,
            prix: taille.prix,
            options: taille.nom
        });
        el.modal.classList.add("hidden");
    }
    // 3. Fermer modale
    if (e.target.classList.contains("close-modal") || e.target.id === "optionModal") {
        el.modal.classList.add("hidden");
    }
});

function openModal(p) {
    currentModalProduct = p;
    el.modalContent.innerHTML = `
        <h3>${p.nom}</h3>
        ${p.tailles.map((t, i) => `
            <label style="display:block; margin: 10px 0;">
                <input type="radio" name="modalOption" value="${i}" ${i===0?'checked':''}>
                ${t.nom} - ${t.prix} FCFA
            </label>
        `).join('')}
        <button id="confirmModalAdd" class="add-btn" style="width:100%; padding:15px; margin-top:10px;">Valider</button>
    `;
    el.modal.classList.remove("hidden");
}

function addToCart(item) {
    let key = item.productId + "-" + item.options;
    let exist = cart.find(x => x.key === key);
    if (exist) { exist.qty++; }
    else { cart.push({ ...item, key, qty: 1 }); }
    saveCart();
    renderCart();
}

function renderCart() {
    el.cartItems.innerHTML = cart.map(i => `
        <div>${i.qty}x ${i.nom} (${i.options}) - ${formatPrice(i.prix * i.qty)} FCFA</div>
    `).join("");
    el.cartTotal.textContent = formatPrice(cart.reduce((a, b) => a + (b.prix * b.qty), 0));
}

// Lancement
renderMenu();
renderCart();
