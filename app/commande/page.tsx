export const metadata = { title: "Ma commande", description: "Votre commande La Shish." };

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-[#f5f0e7] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-[.3em] text-[#b68a42]">Ma commande</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">Votre panier.</h1>
        <div className="mt-10 rounded-[2rem] bg-[#11100e] p-8 text-white sm:p-12">
          <p className="text-white/50">Aucun article pour le moment.</p>
          <h2 className="mt-3 text-3xl font-black">Votre prochaine commande commence avec le menu.</h2>
          <a href="/menu" className="mt-7 inline-flex rounded-full bg-[#d4b273] px-6 py-3 text-sm font-bold text-[#11100e]">Explorer le menu</a>
        </div>
      </div>
    </main>
  );
}
