"use client";

import Image from "next/image";
import Link from "../../../components/locale-link";
import menu from "../../../data/menu.json;
import { useFavorites } from "../../../components/favorite-store;
import FavoriteButton from "../../../components/favorite-button;
import { imageUrl } from "../../../lib/catalog;
import { useI18n } from "../../../components/i18n-provider;
import { ProductName, ProductDescription } from "../../../components/product-text;

export default function FavoritesPage(){const {ids}=useFavorites();const {t}=useI18n();const items=menu.products.filter(p=>ids.includes(p.id));return <main className="min-h-screen bg-[#f5f0e7] px-5 pb-20 pt-32 sm:px-8 lg:px-12"><div className="mx-auto max-w-6xl"><p className="text-xs font-bold uppercase tracking-[.3em] text-[#b68a42]">{t("favorites.eyebrow")}</p><h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">{t("favorites.title")}</h1>{items.length===0?<div className="mt-10 rounded-[2rem] bg-[#11100e] p-8 text-white sm:p-12"><p className="text-white/50">{t("favorites.empty")}</p><p className="mt-3 text-xl font-black">{t("favorites.emptyTitle")}</p><Link href="/menu" className="mt-7 inline-flex rounded-full bg-[#d4b273] px-6 py-3 text-sm font-bold text-[#11100e]">{t("favorites.explore")}</Link></div>:<div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map(p=><article key={p.id} className="overflow-hidden rounded-3xl border border-black/8 bg-white/60"><div className="relative aspect-[4/3]"><FavoriteButton id={p.id}/><Image src={imageUrl(p.photo)} alt={p.nom} fill unoptimized sizes="(max-width:768px) 100vw, 33vw" className="object-cover"/></div><div className="p-5"><h2 className="font-black"><ProductName value={p.nom}/></h2><p className="mt-2 text-sm text-black/55"><ProductDescription value={p.description}/></p><Link href={"/menu/produit/"+p.id} className="mt-5 inline-flex rounded-full bg-[#11100e] px-4 py-2 text-xs font-bold text-white">{t("favorites.view")}</Link></div></article>)}</div>}</div></main>}
