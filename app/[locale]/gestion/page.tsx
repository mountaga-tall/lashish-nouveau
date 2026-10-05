import type { Metadata } from "next";
import AdminPanel from "../../../components/admin-panel";

export const metadata: Metadata = {
  title: "Gestion — LA SHISH",
  description: "Centre sécurisé de gestion des commandes, réservations et opérations LA SHISH.",
  robots: { index: false, follow: false },
};

export default function ManagementPage() {
  return (
    <main className="min-h-screen bg-[#f5f0e7] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-black uppercase tracking-[.3em] text-[#b68a42]">LA SHISH · Administration</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">Centre de gestion.</h1>
        <p className="mt-5 max-w-2xl text-black/55">
          Un espace interne pour traiter les commandes WhatsApp, confirmer les réservations et faire progresser automatiquement la fidélité des comptes clients.
        </p>
        <AdminPanel />
      </div>
    </main>
  );
}
