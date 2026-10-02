# La Shish — Commande en ligne

Application web mobile-first pour commander les plats, pizzas, tacos et boissons de La Shish.

## Fonctionnalités

- Menu par catégories avec recherche instantanée.
- Panier persistant dans le navigateur.
- Personnalisation des pizzas par taille.
- Formulaire de livraison avec validation minimale.
- Récapitulatif complet envoyé vers WhatsApp.
- Paiement annoncé via lien Wave après validation.
- PWA installable avec service worker.
- Interface responsive pensée d'abord pour mobile.

## Structure

```text
/
├── index.html
├── style.css
├── app.js
├── manifest.json
├── sw.js
├── data/
│   ├── plats.js
│   ├── pizzas.js
│   ├── tacos.js
│   └── boissons.js
└── images/
```

## Modifier le menu

Les produits sont stockés dans `data/*.js`. Les prix et disponibilités peuvent être modifiés sans toucher au moteur de commande.

## Commandes

Le numéro WhatsApp utilisé par le bouton de commande est configuré dans `app.js`. Le message généré contient le client, l'adresse, les articles, les options, le total et les précisions éventuelles.

## Déploiement

Le projet est un site statique : il peut être servi directement par GitHub Pages, Vercel ou tout autre hébergement statique. Aucun build n'est nécessaire.

## UX / maintenance

Les anciennes briques de modal non utilisées ont été retirées du flux principal. Le panier reste compatible avec les données existantes grâce à sa clé `laShishCart`.

