"use client";

import { createContext,useContext,useEffect,useMemo,useState } from "react";

export type CartItem={id:number;nom:string;prix:number;photo?:string;qty:number;key?:string};
type StoredItem=CartItem&{key:string};
type CartContextValue={items:StoredItem[];count:number;total:number;add:(item:Omit<CartItem,"qty"|"key">)=>void;remove:(key:string)=>void;clear:()=>void};

const CartContext=createContext<CartContextValue|null>(null);
const STORAGE_KEY="menu-shish-cart-v3";

function lineKey(item:Omit<CartItem,"qty"|"key">){return item.id+"|"+item.prix+"|"+item.nom}

export function CartProvider({children}:{children:React.ReactNode}){
  const [items,setItems]=useState<StoredItem[]>([]);
  useEffect(()=>{try{const saved=window.localStorage.getItem(STORAGE_KEY)||window.localStorage.getItem("menu-shish-cart-v2");if(saved){const parsed=JSON.parse(saved) as CartItem[];setItems(parsed.map((item)=>({...item,key:item.key||lineKey(item)})))}}catch{}},[]);
  useEffect(()=>{try{window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items))}catch{}},[items]);
  const value=useMemo<CartContextValue>(()=>({
    items,
    count:items.reduce((sum,item)=>sum+item.qty,0),
    total:items.reduce((sum,item)=>sum+item.prix*item.qty,0),
    add:(item)=>setItems(current=>{const key=lineKey(item);const found=current.find(x=>x.key===key);if(found)return current.map(x=>x.key===key?{...x,qty:Math.min(50,x.qty+1)}:x);return [...current,{...item,key,qty:1}]}),
    remove:(key)=>setItems(current=>current.flatMap(item=>{if(item.key!==key)return[item];if(item.qty>1)return[{...item,qty:item.qty-1}];return[]})),
    clear:()=>setItems([])
  }),[items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart(){const context=useContext(CartContext);if(!context)throw new Error("useCart must be used inside CartProvider");return context;}
