import type { MetadataRoute } from "next";
import { products, slugify } from "../lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://menushish.ci";
  const staticPaths = ["", "/menu", "/commande", "/reserver", "/contact", "/compte", "/favoris", "/fidelite", "/promotions"];
  const categories = [...new Set(products.map((p) => p.categorie))].map((category) => `/menu/${slugify(category)}`);
  const productPaths = products.map((p) => `/menu/produit/${p.id}`);
  return [...staticPaths, ...categories, ...productPaths].map((path) => ({
    url: base + path,
    lastModified: new Date(),
  }));
}
