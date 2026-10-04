import menu from "../data/menu.json";

export type CatalogProduct = (typeof menu.products)[number];

export const products = menu.products;

export function priceOf(product: CatalogProduct) {
  if (typeof product.prix === "number") return product.prix;
  const prices = product.tailles?.map((x) => x.prix).filter((x): x is number => typeof x === "number") ?? [];
  return prices.length ? Math.min(...prices) : null;
}

export function imageUrl(photo?: string) {
  const base = "https://raw.githubusercontent.com/mountaga-tall/menushish/main/images/";
  return base + (photo || "no-image.webp");
}

export function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
}
