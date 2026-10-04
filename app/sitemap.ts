import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://menushish.ci";
  return [
    "", "/menu", "/commande", "/reserver", "/contact", "/compte", "/favoris", "/fidelite", "/promotions"
  ].map((path) => ({ url: base + path, lastModified: new Date() }));
}
