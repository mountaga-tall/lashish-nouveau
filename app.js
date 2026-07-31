/* =====================================================
   LA SHISH PREMIUM FOOD APP - JAVASCRIPT OPTIMISÉ
===================================================== */

// Définition des éléments du DOM
const el = {
  cartPanel: document.querySelector('.cart-panel'),
  mobileCartBtn: document.querySelector('.mobile-cart-btn'),
  mobileTotal: document.querySelector('#mobileTotal'),
  modal: document.querySelector('.modal'),
  whatsappBtn: document.querySelector('.whatsapp-btn'),
  cartItemsContainer: document.querySelector('.cart-items'),
  cartTotal: document.querySelector('.cart-total strong'),
  closeCartMobile: document.querySelector('.close-cart-mobile')
};

let cart = [];
let isSending = false;

// ----------------------------------------------------
// FONCTIONS UTILITAIRES
// ----------------------------------------------------

// Afficher une notification (Toast)
const showToast = (message) => {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  
  // Réinitialiser l'animation pour pouvoir la rejouer
  toast.style.animation = 'none';
  toast.offsetHeight; // Force le reflow
  toast.style.animation = 'toastShow .25s, toastHide .3s 1.7s forwards';
};

// ----------------------------------------------------
// GESTION DU PANIER
// ----------------------------------------------------

const loadCart = () => {
  try {
    const saved = localStorage.getItem("laShishCart");
    if (saved) cart = JSON.parse(saved);
  } catch (e) {
    console.error("Erreur au chargement du panier", e);
  }
};

// [FIX 2] Sécuriser saveCart() avec try...catch
const saveCart = () => {
  try {
    localStorage.setItem("laShishCart", JSON.stringify(cart));
  } catch (err) {
    console.error("Impossible d'enregistrer le panier", err);
  }
};

// [FIX 1] Éviter une erreur si optionsText est absent
const addToCart = (item) => {
  const options = item.optionsText || "";
  const key = `${item.productId}-${options}`;
  let exist = cart.find(x => x.key === key);
  
  if (exist) {
    exist.qty++;
  } else {
    cart.push({
      ...item,
      optionsText: options,
      key,
      qty: 1
    });
  }
  
  saveCart();
  renderCart();
  showToast("Produit ajouté au panier 🛒");
};

// Affichage et mise à jour du panier
const renderCart = () => {
  let total = 0;
  let totalItems = 0;
  
  // Générer le HTML des articles du panier
  if (el.cartItemsContainer) {
    el.cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
      el.cartItemsContainer.innerHTML = '<div class="cart-items empty">Votre panier est vide</div>';
    } else {
      cart.forEach((item, index) => {
        total += item.price * item.qty;
        totalItems += item.qty;
        
        const itemOptions = item.optionsText ? `<span>(${item.optionsText})</span>` : "";
        el.cartItemsContainer.innerHTML += `
          <div class="cart-item">
            <strong>${item.name}</strong> ${itemOptions}
            <p>${item.price} CFA x ${item.qty} = ${item.price * item.qty} CFA</p>
            <div class="cart-actions">
              <button onclick="changeQty('${item.key}', 1)">+</button>
              <button onclick="changeQty('${item.key}', -1)">-</button>
              <button data-remove onclick="removeItem('${item.key}')">🗑</button>
            </div>
          </div>
        `;
      });
    }
  } else {
    // Fallback pour calculer le total si le conteneur n'est pas présent
    cart.forEach(item => {
      total += item.price * item.qty;
      totalItems += item.qty;
    });
  }

  // Mettre à jour le texte du total principal
  if (el.cartTotal) {
    el.cartTotal.textContent = `${total} CFA`;
  }

  // [FIX 4] Ne pas recréer le HTML du bouton mobile (préserve le <span> mobileTotal)
  if (el.mobileCartBtn && el.mobileCartBtn.firstChild) {
    el.mobileCartBtn.firstChild.textContent = `🛒 ${totalItems} article(s) • `;
    if (el.mobileTotal) {
      el.mobileTotal.textContent = `${total} CFA`;
    }
  }
};

// Modifier la quantité
window.changeQty = (key, delta) => {
  let item = cart.find(x => x.key === key);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(x => x.key !== key);
    }
    saveCart();
    renderCart();
  }
};

// Supprimer un article
window.removeItem = (key) => {
  cart = cart.filter(x => x.key !== key);
  saveCart();
  renderCart();
};

// ----------------------------------------------------
// ENVOI DE COMMANDE (WHATSAPP)
// ----------------------------------------------------

const sendWhatsApp = () => {
  if (cart.length === 0) {
    showToast("Votre panier est vide !");
    return;
  }
  if (isSending) return;

  // [FIX 8] Désactiver le bouton pendant l'envoi
  isSending = true;
  if (el.whatsappBtn) el.whatsappBtn.disabled = true;

  const numeroWhatsApp = "2250000000000"; // Remplacer par ton numéro
  let total = 0;
  
  let msg = "Nouvelle commande ! 🚀\n\n";
  cart.forEach(item => {
    const opts = item.optionsText ? ` (${item.optionsText})` : "";
    msg += `- ${item.qty}x ${item.name}${opts} : ${item.price * item.qty} CFA\n`;
    total += item.price * item.qty;
  });
  msg += `\nTotal : ${total} CFA`;

  // [FIX 7] Vérifier que WhatsApp n'est pas bloqué (anti-popup)
  const popup = window.open(
    `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
  
  if (!popup) {
    showToast("⚠️ Autorisez les fenêtres popup pour ouvrir WhatsApp.");
  } else {
    // Vider le panier après succès
    cart = [];
    saveCart();
    
    // [FIX 5] Fermer automatiquement le panier après commande (mobile)
    el.cartPanel?.classList.remove("open");
    
    // [FIX 6] Ajouter un message de confirmation
    showToast("Commande envoyée avec succès ✅");
  }

  // [FIX 8] Réactiver le bouton après délai
  setTimeout(() => {
    isSending = false;
    if (el.whatsappBtn) el.whatsappBtn.disabled = false;
    renderCart();
  }, 1000);
};

// Attacher l'événement au bouton WhatsApp
if (el.whatsappBtn) {
  el.whatsappBtn.addEventListener("click", sendWhatsApp);
}

// ----------------------------------------------------
// ÉVÉNEMENTS GLOBAUX & INTERFACE
// ----------------------------------------------------

// Gestion du panier sur Mobile
if (el.mobileCartBtn) {
  el.mobileCartBtn.addEventListener("click", () => {
    el.cartPanel?.classList.add("open");
  });
}
if (el.closeCartMobile) {
  el.closeCartMobile.addEventListener("click", () => {
    el.cartPanel?.classList.remove("open");
  });
}

// [FIX 3] Corriger la fermeture de la modal
document.addEventListener("click", (e) => {
  if (
    el.modal &&
    (e.target === el.modal || e.target.closest("#closeModal") || e.target.closest(".close-modal"))
  ) {
    el.modal.classList.add("hidden");
  }
});

// Initialisation au chargement
document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  renderCart();
  
  // Suppression du loader
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 300);
    }, 800);
  }
});
