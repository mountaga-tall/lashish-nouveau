import type { MetadataRoute } from "next";
import { products,slugify } from "../lib/catalog";
const base="https://menushish.ci";
const locales=["fr","en","ar"] as const;
const staticPaths=["","/menu","/commande","/reserver","/contact","/compte","/favoris","/fidelite"];
export default function sitemap():MetadataRoute.Sitemap{
 const now=new Date();
 return locales.flatMap(locale=>[
  ...staticPaths.map(path=>({url:base+"/"+locale+path,lastModified:now,changeFrequency:path==="/menu"?"daily":"weekly",priority:path===""?1:path==="/menu"?0.95:0.7})),
  ...[...new Set(products.map(p=>p.categorie))].map(category=>({url:base+"/"+locale+"/menu/"+slugify(category),lastModified:now,changeFrequency:"weekly",priority:0.8})),
  ...products.map(p=>({url:base+"/"+locale+"/menu/produit/"+p.id,lastModified:now,changeFrequency:"weekly",priority:0.65}))
 ]);
}