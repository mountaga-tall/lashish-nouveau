# Menu Shish — D1

Le schéma schema.sql prépare la V2 pour Cloudflare D1.

Ordre prévu :
1. créer la base D1 dans Cloudflare ;
2. appliquer db/schema.sql ;
3. importer data/menu.json dans products ;
4. relier les Route Handlers Next.js aux bindings D1 ;
5. activer l’authentification ;
6. basculer progressivement les données locales vers D1.

Aucun identifiant Cloudflare n'est hardcodé dans le dépôt.
