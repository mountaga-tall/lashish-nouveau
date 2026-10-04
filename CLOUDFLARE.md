# Menu Shish — production Cloudflare

La production utilise Next.js 16 + OpenNext sur Cloudflare Workers.

## Architecture

- GitHub = source et historique
- Next.js + React = application
- Cloudflare Workers = production
- Cloudflare D1 = comptes, commandes, réservations, favoris, fidélité et coupons
- Cloudflare R2 = images/médias
- Cloudflare DNS = domaine, HTTPS et CDN

## Ressources Cloudflare

- Worker : `menushish`
- Base D1 : `menushish-db`
- Bucket R2 : `menushish-images`

Les bindings `DB` et `IMAGES` sont déclarés dans `wrangler.jsonc`.

## GitHub Actions

Le workflow `.github/workflows/deploy-cloudflare.yml` :

1. installe les dépendances ;
2. applique les migrations D1 distantes ;
3. construit et déploie le Worker.

Secrets GitHub attendus :

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Aucun secret n'est stocké dans le dépôt.

## Base de données

Les migrations sont dans `db/migrations/`.

La migration `0002_auth.sql` active les mots de passe et les sessions pour le compte client.

## Domaine

Le domaine de production est géré par Cloudflare.

Tester après déploiement :

- `https://menushish.ci`
- `https://www.menushish.ci`
- `https://menushish.ci/api/health`
- `/menu`
- une fiche produit
- `/compte`
- le panier
- la réservation
- le suivi de commande

Ne pas rebrancher la production sur GitHub Pages.

## Validation

`main` est l'unique branche de production.
