import Image from "next/image";
import Link from "next/link";
import { slugify } from "../lib/catalog";
import FeaturedProducts from "../components/featured-products";
import menu from "../data/menu.json";

const raw = "https://raw.githubusercontent.com/mountaga-tall/lashish-nouveau/v2-nextjs/images/";

const featured = menu.products.filter((p) => p.disponible && typeof p.prix === "number").slice(0, 6);
const categories = [...new Set(menu.products.map((p) => p.categorie))].slice(0, 6);

export default function HomePage() {
  return (
    <main>
      <section className="relative min-h-[92vh] overflow-hidden bg-[#11100e] text-[#fffaf2]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(182,138,66,.22),transparent_35%),radial-gradient(circle_at_15%_75%,rgba(255,255,255,.06),transparent_28%)]" />
        <div className="absolute left-0 right-0 top-24 h-px gold-line opacity-70" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-between px-5 pb-10 pt-28 sm:px-8 lg:px-12">
          <div className="max-w-3xl fade-up">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[.42em] text-[#d4b273]">La Shish • Abidjan</p>
            <h1 className="max-w-3xl text-5xl font-black leading-[.95] tracking-[-.05em] sm:text-7xl lg:text-8xl">
              L’expérience
              <span className="block text-[#d4b273]">Shish commence ici.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
              Un menu pensé comme une vraie expérience digitale : rapide, élégant, gourmand et prêt pour la commande.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/menu" className="rounded-full bg-[#d4b273] px-6 py-3 text-sm font-bold text-[#11100e] transition hover:-translate-y-0.5 hover:bg-white">Découvrir le menu</Link>
              <Link href="/reserver" className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold backdrop-blur transition hover:-translate-y-0.5 hover:border-[#d4b273] hover:text-[#d4b273]">Réserver une table</Link>
            </div>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="float-in">
              <Image src={raw + "logo.webp"} alt="La Shish" width={310} height={180} priority className="h-auto w-[220px] sm:w-[290px]" />
            </div>
            <div className="hidden max-w-xs text-right text-sm leading-6 text-white/50 sm:block">
              253 créations à découvrir.<br />Votre prochaine commande préférée est peut-être déjà ici.
            </div>
          </div>
        </div>
      </section>

      <section className="luxury-grid px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.3em] text-[#b68a42]">Explorer</p>
              <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Le menu, autrement.</h2>
            </div>
            <Link href="/menu" className="text-sm font-bold underline decoration-[#b68a42] underline-offset-8">Voir les 253 produits →</Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((label, i) => (
              <Link key={label} href={`/menu/${slugify(label)}`} className="card-shine group rounded-3xl border border-black/8 bg-white/60 p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white">
                <span className="text-xs font-bold text-[#b68a42]">0{i + 1}</span>
                <h3 className="mt-12 text-2xl font-black">{label}</h3>
                <p className="mt-2 text-sm text-black/55">Sélection La Shish</p>
                <span className="mt-6 inline-flex text-sm font-bold transition group-hover:translate-x-1">Explorer →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#11100e] px-5 py-20 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.3em] text-[#d4b273]">À goûter</p>
              <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Nos favoris du moment</h2>
            </div>
            <Link href="/menu" className="hidden text-sm font-bold text-[#d4b273] sm:block">Tout le menu →</Link>
          </div>
          <FeaturedProducts products={featured} />               <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-black">{p.nom}</h3>
                    <span className="shrink-0 text-sm font-black text-[#d4b273]">{(p.prix ?? 0).toLocaleString("fr-FR")} F</span>
                  </div>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-white/55">{p.description}</p>
                  <Link href="/commande" className="mt-5 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-bold transition hover:border-[#d4b273] hover:text-[#d4b273]">Ajouter</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f0e7] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-[2rem] bg-[#d8c8ae] p-8 sm:p-12">
            <p className="text-xs font-bold uppercase tracking-[.3em] text-black/50">Plus qu’un menu</p>
            <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">Commandez, réservez, retrouvez vos favoris.</h2>
            <p className="mt-5 max-w-xl leading-7 text-black/65">La V2 est pensée pour réunir menu, commande, compte client, fidélité et réservation dans une seule expérience.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/commande" className="rounded-full bg-[#11100e] px-6 py-3 text-sm font-bold text-white">Commander</Link>
              <Link href="/contact" className="rounded-full border border-black/15 px-6 py-3 text-sm font-bold">Nous trouver</Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-black/10 bg-white/55 p-8 sm:p-12">
            <p className="text-xs font-bold uppercase tracking-[.3em] text-[#b68a42]">Bon à savoir</p>
            <div className="mt-7 space-y-5">
              {["Mobile-first et ultra rapide", "PWA installable", "253 produits déjà récupérés", "Préparation pour compte client + fidélité"].map((item) => (
                <div key={item} className="flex gap-3 text-sm font-semibold">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#b68a42]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
