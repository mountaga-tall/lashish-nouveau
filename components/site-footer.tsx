import Link from "next/link";

function Svg({ children }: { children: React.ReactNode }) {
  return <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/50">{children}</span>;
}

export default function SiteFooter() {
  return (
    <footer className="bg-[#ece4d7] px-5 py-14 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="text-2xl font-black">MENU SHISH</div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-black/55">La nouvelle expérience digitale La Shish. Menu, commande, réservation et fidélité dans un seul espace.</p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[.25em] text-[#b68a42]">Navigation</p>
          <div className="mt-5 grid gap-3 text-sm font-semibold">
            <Link href="/menu">Menu</Link>
            <Link href="/commande">Commander</Link>
            <Link href="/reserver">Réserver</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[.25em] text-[#b68a42]">Nous suivre</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="https://wa.me/" aria-label="WhatsApp" target="_blank" rel="noreferrer"><Svg><span className="text-sm font-black">WA</span></Svg></a>
            <a href="https://instagram.com/restaurantlashish" aria-label="Instagram" target="_blank" rel="noreferrer"><Svg><span className="text-sm font-black">IG</span></Svg></a>
            <a href="https://facebook.com/" aria-label="Facebook" target="_blank" rel="noreferrer"><Svg><span className="text-sm font-black">FB</span></Svg></a>
            <a href="https://maps.google.com/?q=La+Shish+Riviera+Bonoumin+Abidjan" aria-label="Google Maps" target="_blank" rel="noreferrer"><Svg><span className="text-sm font-black">MAP</span></Svg></a>
          </div>
          <p className="mt-5 text-sm text-black/55">Riviera Bonoumin • Voie de la Djibi • Abidjan</p>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-black/10 pt-5 text-xs text-black/45">© 2026 Menu Shish — V2 en construction.</div>
    </footer>
  );
}
