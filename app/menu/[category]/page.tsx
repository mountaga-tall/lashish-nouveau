import Link from "next/link";
import { products, slugify } from "../../../lib/catalog";

export async function generateStaticParams() {
  return [...new Set(products.map((p) => p.categorie))].map((category) => ({ category: slugify(category) }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const found = products.find((p) => slugify(p.categorie) === category);
  return found ? { title: found.categorie, description: `Découvrez la catégorie ${found.categorie} de La Shish.` } : { title: "Catégorie" };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const matches = products.filter((p) => slugify(p.categorie) === category);
  const title = matches[0]?.categorie ?? "Catégorie";

  return (
    <main className="min-h-screen bg-[#f5f0e7] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Link href="/menu" className="text-sm font-bold text-black/45 hover:text-[#b68a42]">← Toutes les catégories</Link>
        <p className="mt-7 text-xs font-bold uppercase tracking-[.3em] text-[#b68a42]">Catégorie</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">{title}</h1>
        <p className="mt-4 text-black/50">{matches.length} produit{matches.length > 1 ? "s" : ""}</p>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {matches.map((p) => (
            <Link href={`/menu/produit/${p.id}`} key={p.id} className="rounded-3xl border border-black/8 bg-white/60 p-6 transition hover:-translate-y-1 hover:bg-white">
              <span className="text-xs font-bold text-[#b68a42]">{p.sousCategorie || "La Shish"}</span>
              <h2 className="mt-10 text-xl font-black">{p.nom}</h2>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-black/50">{p.description}</p>
              <span className="mt-5 inline-flex text-sm font-bold">Voir le produit →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
