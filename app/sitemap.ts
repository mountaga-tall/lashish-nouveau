import type { MetadataRoute } from "next";
import { products,slugify } from "../lib/catalog";
const base="https://menushish.ci";
const locales=["fr","en","ar"] as const;
const staticPaths=["","/menu","/commande","/reserver","/contact","/compte","/favoris","/fidelite"];
export default function sitemap():MetadataRoute.Sitemap{
 const now=new Date();
 const entries:MetadataRoute.Sitemap=[];
 for(const locale of locales){
  for(const path of staticPaths)entries.push({url:base+"/"+locale+path,lastModified:now,changeFrequency:path==="/menu"?("daily" as const):("weekly" as const),priority:path===""?1:path==="/menu"?0.95:0.7});
  for(const category of [...new Set(products.map(p=>p.categorie))])entries.push({url:base+"/"+locale+"/menu/"+slugify(category),lastModified:now,changeFrequency:"weekly",priority:0.8});
  for(const p of products)entries.push({url:base+"/"+locale+"/menu/produit/"+p.id,lastModified:now,changeFrequency:"weekly",priority:0.65});
 }
 return entries;
}