"use client";

import { useFavorites } from "./favorite-store";

export default function FavoriteButton({ id }: { id: number }) {
  const { has, toggle } = useFavorites();
  const active = has(id);
  return (
    <button
      type="button"
      aria-label={active ? "Retirer des favoris" : "Ajouter aux favoris"}
      aria-pressed={active}
      onClick={() => toggle(id)}
      className={`absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-lg text-white backdrop-blur transition hover:scale-105 ${active ? "text-[#d4b273]" : ""}`}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}
