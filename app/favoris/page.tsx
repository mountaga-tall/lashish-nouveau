export const metadata = { title: "Mes favoris", description: "Vos plats favoris." };

export default function FavoritesPage() {
  return (
    <main className="min-h-screen bg-[#f5f0e7] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-[.3em] text-[#b68a42]">Espace client</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">Mes favoris.</h1>
        <div className="mt-10 rounded-[2rem] bg-[#11100e] p-8 text-white sm:p-12">
          <p className="text-white/50">Votre liste est vide pour le moment.</p>
          <p className="mt-3 text-xl font-black">Ajoutez vos incontournables depuis le menu.</p>
        </div>
      </div>
    </main>
  );
}
