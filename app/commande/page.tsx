import OrderPanel from "../../components/order-panel";

export const metadata = { title: "Ma commande", description: "Votre commande La Shish." };

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-[#f5f0e7] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[.3em] text-[#b68a42]">Ma commande</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">Votre panier.</h1>
        <p className="mt-5 max-w-2xl text-black/55">Le panier reste disponible pendant votre navigation et est conservé sur cet appareil.</p>
        <OrderPanel />
      </div>
    </main>
  );
}
