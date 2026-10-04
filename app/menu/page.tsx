import menu from "../../data/menu.json";
import MenuBrowser from "../../components/menu-browser";

export const metadata = {
  title: "Menu",
  description: "Découvrez les 253 produits de La Shish.",
};

export default function MenuPage() {
  const categories = [...new Set(menu.products.map((p) => p.categorie))].filter(Boolean);
  return (
    <main className="min-h-screen bg-[#f5f0e7] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.3em] text-[#b68a42]">Carte digitale</p>
          <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">Le menu La Shish.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-black/55">Recherche instantanée, catégories et accès direct à la commande. Les 253 produits existants sont déjà importés.</p>
        </div>
        <MenuBrowser products={menu.products} categories={categories} />
      </div>
    </main>
  );
}
