export const metadata = { title: "Fidélité", description: "Programme de fidélité Menu Shish." };

export default function LoyaltyPage() {
  return (
    <main className="min-h-screen bg-[#f5f0e7] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-[.3em] text-[#b68a42]">Programme client</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">Votre fidélité mérite plus.</h1>
        <div className="mt-10 rounded-[2rem] border border-black/10 bg-white/60 p-8 sm:p-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-sm text-black/45">Solde actuel</p><p className="mt-2 text-5xl font-black">0 <span className="text-base">points</span></p></div>
            <p className="max-w-sm text-sm leading-6 text-black/55">Le moteur de points sera connecté à l’historique des commandes dans la couche base de données.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
