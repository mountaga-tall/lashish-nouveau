"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: number;
  nom: string;
  prix: number;
  photo?: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  add: (item: Omit<CartItem, "qty">) => void;
  remove: (id: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "menu-shish-cart-v2";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const value = useMemo(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.qty, 0),
    total: items.reduce((sum, item) => sum + item.prix * item.qty, 0),
    add: (item: Omit<CartItem, "qty">) => setItems((current) => {
      const found = current.find((x) => x.id === item.id);
      if (found) return current.map((x) => x.id === item.id ? { ...x, qty: x.qty + 1 } : x);
      return [...current, { ...item, qty: 1 }];
    }),
    remove: (id: number) => setItems((current) => current.flatMap((item) => {
      if (item.id !== id) return [item];
      if (item.qty > 1) return [{ ...item, qty: item.qty - 1 }];
      return [];
    })),
    clear: () => setItems([]),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
