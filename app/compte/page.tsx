export const metadata = { title: "Mon espace", description: "Compte client Menu Shish." };

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-[#f5f0e7] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-[.3em] text-[#b68a42]">Espace client</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">Mon espace.</h1>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {[
            ["Commandes", "Retrouvez votre historique et recommandez en un geste."],
            ["Favoris", "Gardez vos plats préférés à portée de main."],
            ["Fidélité", "Cumulez des points et débloquez vos avantages."],
            ["Promotions", "Découvrez les offres réservées aux clients."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-3xl border border-black/10 bg-white/60 p-7">
              <h2 className="text-2xl font-black">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-black/55">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
