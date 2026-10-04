import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#11100e] px-5 py-32 text-white">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[.35em] text-[#d4b273]">404</p>
        <h1 className="mt-4 text-6xl font-black tracking-tight">Cette page n’existe pas.</h1>
        <p className="mt-5 max-w-xl text-white/55">Retournez au menu pour retrouver votre prochaine commande.</p>
        <Link href="/menu" className="mt-8 inline-flex rounded-full bg-[#d4b273] px-6 py-3 text-sm font-black text-[#11100e]">Retour au menu</Link>
      </div>
    </main>
  );
}