import menu from "../data/menu.json";

export type CatalogProduct = {
  id: number;
  type?: string;
  categorie: string;
  sousCategorie?: string;
  nom: string;
  description?: string;
  prix?: number;
  disponible: boolean;
  photo?: string;
  tailles?: { nom: string; prix: number }[];
  choix?: unknown[];
  supplement?: { label: string; prix: number };
};

export const products = menu.products as CatalogProduct[];

export function priceOf(product: CatalogProduct) {
  if (typeof product.prix === "number") return product.prix;
  const prices = product.tailles?.map((x) => x.prix).filter((x): x is number => typeof x === "number") ?? [];
  return prices.length ? Math.min(...prices) : null;
}

export function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
