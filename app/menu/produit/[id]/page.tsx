import Image from "next/image";
import Link from "next/link";
import ProductAction from "../../../../components/product-action";
import { products, priceOf, slugify } from "../../../../lib/catalog";

const raw = "https://raw.githubusercontent.com/mountaga-tall/lashish-nouveau/main/images/";

export async function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = products.find((item) => String(item.id) === id);
  return p ? {
    title: p.nom,
    description: p.description || `Découvrez ${p.nom} chez La Shish.`,
  } : { title: "Produit" };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = products.find((item) => String(item.id) === id);
  if (!p) return <main className="min-h-screen bg-[#f5f0e7] px-5 pb-20 pt-32"><div className="mx-auto max-w-5xl"><h1 className="text-5xl font-black">Produit introuvable</h1></div></main>;
  const price = priceOf(p);

  return (
    <main className="min-h-screen bg-[#f5f0e7] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Link href="/menu" className="text-sm font-bold text-black/45 hover:text-[#b68a42]">← Retour au menu</Link>
        <div className="mt-7 grid gap-8 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-black/[.04]">
            {p.photo ? <Image src={raw + p.photo} alt={p.nom} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /> : null}
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[.3em] text-[#b68a42]">{p.sousCategorie || p.categorie}</p>
            <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-6xl">{p.nom}</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-black/60">{p.description}</p>
            {p.tailles?.length ? (
              <div className="mt-8">
                <p className="text-sm font-bold">Choisir une taille</p>
                <div className="mt-3 flex flex-wrap gap-2">{p.tailles.map((size) => <span key={size.nom} className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold">{size.nom} · {size.prix.toLocaleString("fr-FR")} F</span>)}</div>
              </div>
            ) : null}
            <div className="mt-8 flex items-end justify-between gap-6">
              <div><span className="text-xs font-bold uppercase tracking-[.2em] text-black/40">À partir de</span><p className="mt-1 text-4xl font-black">{price ? price.toLocaleString("fr-FR") : "—"} <span className="text-base">F</span></p></div>
              <ProductAction product={{ id: p.id, nom: p.nom, prix: price ?? 0, photo: p.photo, tailles: p.tailles }} />
            </div>
            <p className="mt-6 text-xs text-black/40">Référence produit #{p.id} · <span className={p.disponible ? "text-emerald-700" : "text-red-700"}>{p.disponible ? "Disponible" : "Indisponible"}</span></p>
          </div>
        </div>
      </div>
    </main>
  );
}
