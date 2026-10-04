# Menu Shish V2

Application web La Shish, construite avec Next.js 16, TypeScript et Tailwind CSS.

## Architecture

- GitHub : source code et CI
- Next.js 16 / React 19 : application
- Cloudflare Workers + OpenNext : production
- Cloudflare D1 : données clients, commandes, réservations et fidélité
- Cloudflare R2 : images et médias
- Cloudflare DNS : domaine, HTTPS et CDN

## Catalogue

Les 253 produits sont centralisés dans `data/menu.json`.
Le seed D1 correspondant est dans `db/seed.sql`.

## Développement

```bash
npm install
npm run dev
npm run build
```

## Compte client

La page `/compte` propose maintenant une inscription et une connexion par email ou téléphone avec mot de passe.

Les sessions sont stockées côté serveur dans D1 et protégées par un cookie HTTP-only. Les commandes et réservations créées pendant une session authentifiée sont rattachées automatiquement au compte.

## Cloudflare

```bash
npm run preview:cloudflare
npm run deploy:cloudflare
```

Le workflow GitHub applique automatiquement les migrations D1 puis déploie le Worker à chaque push sur `main`.

## Production

Le dépôt de production est `main). Les anciennes branches de préproduction sont supprimées après validation pour éviter toute confusion entre anciennes et nouvelles versions.

Le domaine attendu est :

- https://menushish.ci
- https://www.menushish.ci
