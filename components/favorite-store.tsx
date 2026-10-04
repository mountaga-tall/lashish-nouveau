"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type FavoriteContext = {
  ids: number[];
  has: (id: number) => boolean;
  toggle: (id: number) => void;
};

const FavoriteCtx = createContext<FavoriteContext | null>(null);
const KEY = "menu-shish-favorites-v2";

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<number[]>([]);
  useEffect(() => {
    try { const saved = window.localStorage.getItem(KEY); if (saved) setIds(JSON.parse(saved)); } catch {}
  }, []);
  useEffect(() => {
    try { window.localStorage.setItem(KEY, JSON.stringify(ids)); } catch {}
  }, [ids]);
  const value = useMemo(() => ({
    ids,
    has: (id: number) => ids.includes(id),
    toggle: (id: number) => setIds((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id]),
  }), [ids]);
  return <FavoriteCtx.Provider value={value}>{children}</FavoriteCtx.Provider>;
}

export function useFavorites() {
  const value = useContext(FavoriteCtx);
  if (!value) throw new Error("useFavorites must be used inside FavoriteProvider");
  return value;
}
