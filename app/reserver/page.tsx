"use client";

import { useState } from "react";

export default function ReservePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [party, setParty] = useState("2");
  const [notes, setNotes] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      "Bonjour La Shish, je souhaite réserver une table.",
      "",
      `Nom : ${name}`,
      `Téléphone : ${phone}`,
      `Date : ${date}`,
      `Heure : ${time}`,
      `Personnes : ${party}`,
      notes ? `Notes : ${notes}` : ""
    ].filter(Boolean).join("\n");
    void fetch("/api/reservations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ customerName: name, customerPhone: phone, reservationDate: date, reservationTime: time, partySize: Number(party), notes }) }).then(() => { window.open("https://wa.me/2250140555666?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer"); });
  };

  return (
    <main className="min-h-screen bg-[#f5f0e7] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[.3em] text-[#b68a42]">Réservation</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">Votre table vous attend.</h1>
        <p className="mt-5 max-w-2xl text-black/55">Choisissez votre créneau et envoyez la demande directement au restaurant.</p>
        <form onSubmit={submit} className="mt-10 rounded-[2rem] border border-black/10 bg-white/70 p-6 sm:p-10">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold">Nom<input required value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]" /></label>
            <label className="text-sm font-semibold">Téléphone<input required value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]" /></label>
            <label className="text-sm font-semibold">Date<input required type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]" /></label>
            <label className="text-sm font-semibold">Heure<input required type="time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]" /></label>
            <label className="text-sm font-semibold">Nombre de personnes<input required type="number" min="1" value={party} onChange={(e) => setParty(e.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]" /></label>
            <label className="text-sm font-semibold sm:col-span-2">Demande particulière<textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} className="mt-2 w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b68a42]" placeholder="Anniversaire, emplacement souhaité, etc." /></label>
          </div>
          <button type="submit" className="mt-7 rounded-full bg-[#11100e] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#b68a42] hover:text-[#11100e]">Envoyer la demande sur WhatsApp</button>
        </form>
      </div>
    </main>
  );
}
