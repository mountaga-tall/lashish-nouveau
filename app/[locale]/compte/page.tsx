import AccountPanel from "../../../components/account-panel";


export default function AccountPage() {
  return (
    <main className="min-h-screen bg-[#f5f0e7] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[.3em] text-[#b68a42]">Espace client</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">Mon espace.</h1>
        <p className="mt-5 max-w-2xl text-black/55">Créez votre compte pour retrouver vos commandes, réservations et points de fidélité sur tous vos passages.</p>
        <AccountPanel />
      </div>
    </main>
  );
}
