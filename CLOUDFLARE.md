# Menu Shish — production Cloudflare

La V2 est une application Next.js 16 + TypeScript préparée pour Cloudflare Workers avec OpenNext.

## Architecture

- GitHub = source et historique
- Next.js + React = application
- Cloudflare Workers = production
- Cloudflare D1 = comptes, commandes, réservations, favoris, fidélité, coupons
- Cloudflare R2 = images/médias
- Cloudflare DNS = domaine, HTTPS, CDN et protection

Cloudflare recommande aujourd'hui vinext pour les nouvelles applications Next.js sur Workers. OpenNext reste documenté pour les applications Next.js déjà structurées sur cette voie. La V2 utilise OpenNext pour conserver un chemin de migration stable et explicite.

## Ressources à créer dans Cloudflare

Créer :
- Worker : `menushish`
- Base D1 : `menushish-db`
- Bucket R2 : `menushish-images`

Puis copier la structure de `wrangler.example.jsonc` dans `wrangler.jsonc` en remplaçant uniquement le vrai `database_id`.

Appliquer ensuite :
- `db/schema.sql`
- `db/seed.sql`

Le seed contient les 253 produits déjà normalisés.

## GitHub Actions

Le workflow `.github/workflows/deploy-cloudflare.yml` est volontairement manuel.

Ajouter dans GitHub :
Settings → Secrets and variables → Actions

Secrets attendus :
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Aucun token n'est stocké dans le dépôt.

## Commandes

```bash
npm install
npm run build
npm run preview:cloudflare
npm run deploy:cloudflare
```

Les scripts utilisent l'adaptateur OpenNext Cloudflare.

## Domaine

Le domaine reste chez Netim.

Après validation de la V2 :
1. récupérer les nameservers fournis par Cloudflare ;
2. les mettre chez Netim ;
3. ajouter `menushish.ci` et `www.menushish.ci` au Worker ;
4. vérifier le certificat HTTPS ;
5. tester `https://menushish.ci`, `https://www.menushish.ci`, `/api/health`, `/menu`, une fiche produit, le panier, la réservation et le suivi.

Ne rebranche pas le domaine sur GitHub Pages.

## D1 / R2

Le code ne suppose aucun identifiant avant la création des ressources. Après provisionnement, les bindings `DB` et `IMAGES` doivent être définis dans Wrangler.

## Note sur le plan gratuit

D1 et Workers disposent d'un niveau gratuit, mais les limites et règles du free tier doivent être surveillées en production. La V2 utilise des requêtes ciblées et des index pour limiter les lectures inutiles.

## Validation

Le dépôt principal doit rester la seule source de production. Les anciennes pages HTML de la V1 ont été retirées de `main`.
