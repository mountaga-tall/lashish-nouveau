# Menu Shish — production Cloudflare setup

The V2 is built as a Next.js 16 application and prepared for Cloudflare Workers using OpenNext.

## Cloudflare resources

Create:
- a Workers application named `menushish`
- one D1 database for application data
- one R2 bucket for product and editorial images

Then add the generated D1 and R2 bindings to `wrangler.jsonc`.

## Deployment

Install:
`npm install`

Build for Cloudflare:
`npm run deploy:cloudflare`

Local Workers preview:
`npm run preview:cloudflare`

## DNS

Keep the domain at Netim. Point the authoritative nameservers to Cloudflare, then attach:
- `menushish.ci`
- `www.menushish.ci`

Do not change the DNS while the V2 is under validation.

## D1 free plan

D1 remains available on the Workers Free plan for prototyping. Cloudflare began enforcing daily free-tier row read/write limits on September 1, 2026, so the production application should use indexed, small queries and monitor usage.


## Bindings template

Use `wrangler.example.jsonc` to copy the D1 and R2 binding structure into `wrangler.jsonc` after creating the resources in the Cloudflare dashboard. Never commit API tokens, database secrets, or real credential values.
