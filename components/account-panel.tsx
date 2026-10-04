"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

type User = {
  id: string;
  email: string | null;
  phone: string | null;
  display_name: string | null;
  created_at?: string;
};

type AccountData = {
  user: User | null;
  orders?: Array<{ id: string; status: string; total: number; fulfillment_type: string; created_at: string }>;
  reservations?: Array<{ id: string; status: string; reservation_date: string; reservation_time: string; party_size: number; notes: string | null }>;
  loyalty?: { points: number; lifetime_points: number };
};

const money = (value: number) => Number(value || 0).toLocaleString("fr-FR") + " F";
const date = (value: string) => new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(new Date(value));

export default function AccountPanel() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [data, setData] = useState<AccountData | null>(null);
  const [identifier, setIdentifier] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/account", { cache: "no-store" });
      const next = await response.json();
      if (!response.ok) throw new Error(next.error || "Impossible de charger le compte.");
      setData(next);
      if (next.user) {
        setName(next.user.display_name ?? "");
        setEmail(next.user.email ?? "");
        setPhone(next.user.phone ?? "");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de charger le compte.");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => { void load(); }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const url = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const body = mode === "login"
        ? { identifier, password }
        : { name, email, phone, password };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Opération impossible.");
      setPassword("");
      setIdentifier("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Opération impossible.");
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    setBusy(true);
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => undefined);
    setData({ user: null });
    setBusy(false);
  };

  if (busy && !data) {
    return <div className="mt-10 rounded-[2rem] bg-[#11100e] p-8 text-white">Chargement de votre espace…</div>;
  }

  if (!data?.user) {
    return (
      <div className="mt-10 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <div className="rounded-[2rem] bg-[#11100e] p-8 text-white sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[.25em] text-[#d4b273]">Compte client</p>
          <h2 className="mt-3 text-3xl font-black">{mode === "login" ? "Bienvenue." : "Créez votre espace."}</h2>
          <p className="mt-4 text-sm leading-6 text-white/55">
            Retrouvez vos commandes, réservations et points de fidélité grâce à un compte sécurisé.
          </p>
          <div className="mt-7 grid gap-3 text-sm font-semibold text-white/75">
            <div>✓ Historique des commandes</div>
            <div>✓ Historique des réservations</div>
            <div>✓ Fidélité reliée au compte</div>
          </div>
        </div>

        <form onSubmit={submit} className="rounded-[2rem] border border-black/10 bg-white/70 p-6 sm:p-10">
          <div className="flex gap-2 rounded-full bg-black/[.04] p-1">
            <button type="button" onClick={() => { setMode("login"); setError(""); }} className={"flex-1 rounded-full px-4 py-2.5 text-sm font-bold " + (mode === "login" ? "bg-[#11100e] text-white" : "")}>Se connecter</button>
            <button type="button" onClick={() => { setMode("register"); setError(""); }} className={"flex-1 rounded-full px-4 py-2.5 text-sm font-bold " + (mode === "register" ? "bg-[#11100e] text-white" : "")}>Créer un compte</button>
          </div>

          {mode === "register" ? (
            <>
              <label className="mt-6 block text-sm font-semibold">Nom complet<input required minLength={2} maxLength={80} value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]" /></label>
              <label className="mt-4 block text-sm font-semibold">Email <span className="font-normal text-black/40">(facultatif)</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]" /></label>
              <label className="mt-4 block text-sm font-semibold">Téléphone <span className="font-normal text-black/40">(facultatif)</span><input inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]" /></label>
            </>
          ) : (
            <label className="mt-6 block text-sm font-semibold">Email ou téléphone<input required autoComplete="username" value={identifier} onChange={(e) => setIdentifier(e.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]" /></label>
          )}

          <label className="mt-4 block text-sm font-semibold">Mot de passe<input required minLength={8} maxLength={128} autoComplete={mode === "login" ? "current-password" : "new-password"} type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]" /></label>

          {error ? <p className="mt-4 text-sm font-semibold text-red-700">{error}</p> : null}
          <button disabled={busy} type="submit" className="mt-6 w-full rounded-full bg-[#11100e] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#b68a42] hover:text-[#11100e] disabled:opacity-50">
            {busy ? "Traitement…" : mode === "login" ? "Se connecter" : "Créer mon compte"}
          </button>
          {mode === "register" ? <p className="mt-3 text-xs leading-5 text-black/45">Un email ou un téléphone suffit pour créer le compte. Aucun mot de passe n’est conservé en clair.</p> : null}
        </form>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
      <section className="rounded-[2rem] bg-[#11100e] p-8 text-white sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.25em] text-[#d4b273]">Compte activé</p>
            <h2 className="mt-3 text-3xl font-black">{data.user.display_name || "Client La Shish"}</h2>
            <p className="mt-2 text-sm text-white/50">{data.user.email || data.user.phone}</p>
          </div>
          <button onClick={logout} disabled={busy} className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-white/75 hover:border-[#d4b273] hover:text-[#d4b273]">Déconnexion</button>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5"><p className="text-xs text-white/40">Commandes</p><p className="mt-2 text-3xl font-black">{data.orders?.length ?? 0}</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5"><p className="text-xs text-white/40">Réservations</p><p className="mt-2 text-3xl font-black">{data.reservations?.length ?? 0}</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5"><p className="text-xs text-white/40">Points</p><p className="mt-2 text-3xl font-black">{data.loyalty?.points ?? 0}</p></div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-black/10 bg-white/70 p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4"><h2 className="text-2xl font-black">Mes commandes</h2><Link href="/menu" className="text-sm font-bold text-[#b68a42]">Commander →</Link></div>
        <div className="mt-5 divide-y divide-black/8">
          {data.orders?.length ? data.orders.map((order) => (
            <Link href={"/commande/suivi/" + order.id} key={order.id} className="flex items-center justify-between gap-4 py-4 transition hover:text-[#b68a42]">
              <div><p className="font-black">{order.id}</p><p className="mt-1 text-xs text-black/45">{date(order.created_at)} · {order.status}</p></div>
              <span className="font-black">{money(order.total)}</span>
            </Link>
          )) : <p className="py-5 text-sm text-black/45">Aucune commande enregistrée pour le moment.</p>}
        </div>
      </section>

      <section className="rounded-[2rem] border border-black/10 bg-white/70 p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4"><h2 className="text-2xl font-black">Mes réservations</h2><Link href="/reserver" className="text-sm font-bold text-[#b68a42]">Réserver →</Link></div>
        <div className="mt-5 divide-y divide-black/8">
          {data.reservations?.length ? data.reservations.map((reservation) => (
            <div key={reservation.id} className="py-4">
              <div className="flex items-center justify-between gap-4"><p className="font-black">{reservation.reservation_date} · {reservation.reservation_time}</p><span className="text-xs font-bold text-[#b68a42]">{reservation.status}</span></div>
              <p className="mt-1 text-xs text-black/45">{reservation.party_size} personne{reservation.party_size > 1 ? "s" : ""}</p>
            </div>
          )) : <p className="py-5 text-sm text-black/45">Aucune réservation enregistrée pour le moment.</p>}
        </div>
      </section>

      <section className="rounded-[2rem] border border-black/10 bg-white/70 p-6 sm:p-8">
        <h2 className="text-2xl font-black">Ma fidélité</h2>
        <p className="mt-5 text-5xl font-black">{data.loyalty?.points ?? 0} <span className="text-base">points</span></p>
        <p className="mt-2 text-sm text-black/45">Total cumulé : {data.loyalty?.lifetime_points ?? 0} points.</p>
        <Link href="/fidelite" className="mt-5 inline-flex rounded-full bg-[#11100e] px-5 py-3 text-sm font-bold text-white">Voir la fidélité</Link>
      </section>
    </div>
  );
}
