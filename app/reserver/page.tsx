export const metadata = { title: "Réserver", description: "Réservez votre table chez La Shish." };

export default function ReservePage() {
  return (
    <main className="min-h-screen bg-[#f5f0e7] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[.3em] text-[#b68a42]">Réservation</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">Votre table vous attend.</h1>
        <p className="mt-5 max-w-2xl text-black/55">La réservation sera reliée au moteur client dans la prochaine couche de la V2.</p>
        <div className="mt-10 rounded-[2rem] border border-black/10 bg-white/70 p-6 sm:p-10">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold">Nom<input className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]" /></label>
            <label className="text-sm font-semibold">Téléphone<input className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]" /></label>
            <label className="text-sm font-semibold">Date<input type="date" className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]" /></label>
            <label className="text-sm font-semibold">Heure<input type="time" className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]" /></label>
            <label className="text-sm font-semibold sm:col-span-2">Nombre de personnes<input type="number" min="1" defaultValue="2" className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]" /></label>
          </div>
          <button className="mt-7 rounded-full bg-[#11100e] px-6 py-3 text-sm font-bold text-white hover:bg-[#b68a42] hover:text-[#11100e]">Continuer la réservation</button>
        </div>
      </div>
    </main>
  );
}
