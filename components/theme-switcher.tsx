"use client";
import { useEffect,useState } from "react";
import { useI18n } from "./i18n-provider";
type Theme="system"|"light"|"dark";
const KEY="la_shish_theme";
function resolve(theme:Theme){return theme==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):theme}
function apply(theme:Theme){const value=resolve(theme);document.documentElement.dataset.theme=value;document.documentElement.dataset.themePreference=theme;document.documentElement.style.colorScheme=value}
export default function ThemeSwitcher({compact=false}:{compact?:boolean}){
 const {t}=useI18n(); const [theme,setTheme]=useState<Theme>("system");
 useEffect(()=>{const saved=window.localStorage.getItem(KEY);const next=(saved==="light"||saved==="dark"||saved==="system"?saved:"system") as Theme;setTheme(next);apply(next)},[]);
 useEffect(()=>{apply(theme);const media=window.matchMedia("(prefers-color-scheme: dark)");const onChange=()=>theme==="system"&&apply("system");media.addEventListener?.("change",onChange);return()=>media.removeEventListener?.("change",onChange)},[theme]);
 const choose=(next:Theme)=>{setTheme(next);window.localStorage.setItem(KEY,next);apply(next)};
 const items:[Theme,string,string][]=[["system","AUTO","theme.system"],["light","☼","theme.light"],["dark","◐","theme.dark"]];
 const index=items.findIndex(x=>x[0]===theme);
 return <div className={"theme-switcher relative grid grid-cols-3 items-center rounded-full border border-[color:var(--border)] bg-[color:var(--glass)] p-1.5 "+(compact?"w-[150px]":"w-[176px]")} aria-label={t("theme.label")} dir="ltr">
  <span aria-hidden="true" className="theme-switcher-pill pointer-events-none absolute bottom-1.5 top-1.5 left-1.5 w-[calc((100%-12px)/3)] rounded-full bg-[color:var(--gold)] shadow-[0_0_24px_rgba(212,178,115,.35)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]" style={{transform:"translateX(calc("+index+" * (100% + 4px)))"}}/>
  {items.map(([value,icon,label])=><button key={value} type="button" onClick={()=>choose(value)} aria-pressed={theme===value} title={t(label)} className={"relative z-10 min-h-9 rounded-full px-2 text-[9px] font-black tracking-[.08em] transition "+(theme===value?"text-[#11100e]":"text-[color:var(--muted)]")}>{icon}<span className="sr-only">{t(label)}</span></button>)}
 </div>;
}
