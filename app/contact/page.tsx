export const metadata = { title: "Contact", description: "Contact, localisation et horaires de La Shish à Abidjan." };

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f5f0e7] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[.3em] text-[#b68a42]">Contact</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">Nous trouver.</h1>
        <div className="mt-10 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-[2rem] bg-[#11100e] p-8 text-white sm:p-10">
            <p className="text-sm text-white/50">La Shish</p>
            <h2 className="mt-3 text-3xl font-black">Riviera Bonoumin</h2>
            <p className="mt-3 text-white/60">Voie de la Djibi, Abidjan</p>
            <div className="mt-8 space-y-4 text-sm">
              <a className="block font-semibold text-[#d4b273]" href="tel:+2250700000000">Téléphone →</a>
              <a className="block font-semibold text-[#d4b273]" href="mailto:lashish2@bonoumin.ci">lashish2@bonoumin.ci →</a>
              <a className="block font-semibold text-[#d4b273]" href="https://wa.me/" target="_blank" rel="noreferrer">WhatsApp →</a>
            </div>
          </div>
          <div className="min-h-[420px] overflow-hidden rounded-[2rem] border border-black/10 bg-white">
            <iframe
              title="La Shish Riviera Bonoumin"
              src="https://www.google.com/maps?q=La%20Shish%20Riviera%20Bonoumin%20Abidjan&output=embed"
              className="h-full min-h-[420px] w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
