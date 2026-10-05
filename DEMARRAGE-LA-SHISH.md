# LA SHISH — checklist de mise en production

Ce document contient uniquement les opérations externes à faire après les changements du site.

## 1. Architecture finale

- GitHub : source du projet et CI.
- Next.js / OpenNext : application.
- Cloudflare Workers : production.
- Cloudflare D1 : comptes, commandes, réservations, fidélité.
- Cloudflare R2 : médias.
- Google Places API (New) : note et avis Google.
- WhatsApp : canal commercial.
- Domaine : `menushish.ci` et `www.menushish.ci`.

Aucun composant Vercel ou Neon n'est requis par le projet.

## 2. Google Reviews

### Google Cloud

1. Ouvrir un projet Google Cloud avec facturation activée.
2. Activer **Places API (New)**.
3. Créer une clé API dédiée au site.
4. Restreindre cette clé au strict nécessaire, idéalement à **Places API (New)**.
5. Récupérer le **vrai Place ID** de la fiche Google officielle de LA SHISH Riviera Bonoumin.
6. Tester que Place Details renvoie bien la fiche LA SHISH et ses avis avant de mettre la clé en production.

Le site demande à Place Details les champs nécessaires au nom, à la note, au nombre d'avis, aux avis et aux liens Google Maps. Google demande un FieldMask sur Place Details et les liens peuvent fournir notamment le lien pour écrire un avis et celui pour lire les avis.

### Cloudflare

Dans **Workers & Pages → Worker menushish → Settings → Variables and Secrets** :

- Secret : `GOOGLE_PLACES_API_KEY` = clé Google.
- Variable : `GOOGLE_PLACE_ID` = Place ID officiel.
- Secret : `LA_SHISH_ADMIN_TOKEN` = jeton d'administration aléatoire et long.

Ne mets jamais la clé Google ni le jeton admin dans GitHub, dans `.env` versionné, dans le code client ou dans le localStorage.

Alternative en terminal :

```bash
npx wrangler secret put GOOGLE_PLACES_API_KEY
npx wrangler secret put LA_SHISH_ADMIN_TOKEN
```

Pour `GOOGLE_PLACE_ID`, une variable Cloudflare non secrète suffit.

## 3. Administration du restaurant

Le centre interne est :

`https://menushish.ci/fr/gestion`

Il faut d'abord configurer `LA_SHISH_ADMIN_TOKEN`.

Le jeton reste uniquement en mémoire dans la page d'administration.

### Cycle commande

Reçue → En préparation → Prête → En livraison → Terminée.

Quand une commande liée à un compte client passe à **Terminée**, les points sont crédités automatiquement :

- 1 000 F CFA = 1 point.
- 10 000 points = 500 F CFA.

Une commande annulée après attribution restitue les points de cette commande sans diminuer le cumul historique.

## 4. Vérifications à faire après déploiement

Tester ces URLs :

- `/fr`
- `/en`
- `/ar`
- `/fr/menu`
- `/fr/reserver`
- `/fr/commande`
- `/fr/compte`
- `/fr/fidelite`
- `/fr/gestion`
- `/api/health`
- `/api/google-reviews?locale=fr`

### Parcours commande

1. Ajouter un produit simple.
2. Ajouter un produit avec taille.
3. Ajouter un produit avec choix obligatoire.
4. Vérifier que deux choix différents créent bien deux lignes distinctes.
5. Envoyer la commande.
6. Vérifier que le numéro `LS-XXXXXXXXXXXX` est identique dans WhatsApp, le suivi et le centre de gestion.
7. Passer la commande dans les statuts.
8. Vérifier le crédit de fidélité lors du statut **Terminée**.

### Parcours réservation

1. Réserver une date future.
2. Vérifier le numéro `RSV-XXXXXXXXXXXX`.
3. Ouvrir la gestion.
4. Passer la réservation à **Confirmée**.

## 5. Google Reviews

L'affichage du site utilise Google Places API (New) et limite volontairement l'affichage local à cinq avis, avec attribution et liens Google Maps.

Le site affiche :

- note moyenne ;
- nombre d'avis ;
- avis récents retournés par Google ;
- nom et attribution de l'auteur ;
- lien Google Maps de l'avis ;
- lien pour signaler un contenu lorsque Google le fournit ;
- bouton **Laisser un avis** ;
- bouton **Voir tous les avis**.

Le classement affiché suit la sélection fournie par Google ; la page indique donc que les avis sont affichés selon leur pertinence.

## 6. Domaine et SSL

Dans Cloudflare :

- vérifier que `menushish.ci` est un Custom Domain du Worker `menushish` ;
- vérifier `www.menushish.ci` ;
- vérifier HTTPS actif ;
- tester sans cache et en navigation privée.

## 7. Ancien Vercel

Le dépôt ne contient actuellement aucune dépendance Vercel/Neon.

S'il existe encore un ancien projet Vercel dans ton compte, il faut le supprimer ou le déconnecter manuellement dans Vercel. Le site de production n'en a pas besoin.

## 8. GitHub Pages

Le dépôt contient déjà une logique de nettoyage/désactivation de GitHub Pages, mais GitHub peut avoir une configuration Pages générée historiquement.

Dans **GitHub → Settings → Pages** :

- vérifier que la source de publication n'est pas GitHub Actions ;
- désactiver Pages si aucun autre usage n'est souhaité.

Cela est indépendant de Cloudflare.

## 9. Informations à vérifier avant ouverture au public

- Numéro WhatsApp de commande : +225 01 40 55 56 66.
- Email : lashish2@bonoumin.ci.
- Adresse affichée : Voie de la Djibi, Riviera Bonoumin, Cocody / Abidjan.
- Menu/prix : vérifier les 253 produits, notamment les boissons, tailles, suppléments et choix.
- Horaires d'ouverture : à renseigner/valider si une plage doit être affichée dans le site et les données SEO.

## 10. Important pour demain

Ne partage pas ici la clé Google ni le jeton administrateur.

Il suffit de configurer les trois valeurs Cloudflare :

`GOOGLE_PLACES_API_KEY`
`GOOGLE_PLACE_ID`
`LA_SHISH_ADMIN_TOKEN`

Puis de vérifier le déploiement GitHub Actions et les parcours de test ci-dessus.
