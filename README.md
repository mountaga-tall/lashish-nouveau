# Menu Shish V2

Nouvelle application web La Shish, construite avec Next.js 16, TypeScript et Tailwind CSS.

## Architecture

- GitHub : source code et CI
- Next.js 16 / React 19 : application
- Cloudflare Workers + OpenNext : production
- Cloudflare D1 : données clients, commandes, réservations, fidélité
- Cloudflare R2 : images et médias
- Cloudflare DNS : domaine et HTTPS

## Catalogue

Les 253 produits existants sont centralisés dans `data/menu.json`.
Le seed D1 correspondant est dans `db/seed.sql`.

## Développement

```bash
npm install
npm run dev
```

## Vérification

```bash
npm run build
```

## Cloudflare

```bash
npm run preview:cloudflare
npm run deploy:cloudflare
```

Le workflow `.github/workflows/deploy-cloudflare.yml` est manuel afin de ne jamais déployer par accident sur le domaine de production.

## Statut

La branche `v2-nextjs` est une préproduction. Le domaine `menushish.ci` ne doit être basculé qu'après validation complète.
