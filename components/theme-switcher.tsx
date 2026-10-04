"use client";
import { useEffect,useState } from "react";
import { useI18n } from "./i18n-provider";
type Theme="system"|"light"|"dark";
const KEY="menushish_theme";
function resolveTheme(theme:Theme){return theme==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):theme}
function applyTheme(theme:Theme){const value=resolveTheme(theme);document.documentElement.dataset.theme=value;document.documentElement.dataset.themePreference=theme;document.documentElement.style.colorScheme=value}
export default function ThemeSwitcher({compact=false}:{compact?:boolean}){
 const {t}=useI18n(); const [theme,setTheme]=useState<Theme>("system");
 useEffect(()=>{const saved=window.localStorage.getItem(KEY);const initial=(saved==="light"||saved==="dark"||saved==="system"?saved:"system") as Theme;setTheme(initial);applyTheme(initial)},[]);
 useEffect(()=>{applyTheme(theme);const media=window.matchMedia("(prefers-color-scheme: dark)");const onChange=()=>{if(theme==="system")applyTheme("system")};media.addEventListener?.("change",onChange);return()=>media.removeEventListener?.("change",onChange)},[theme]);
 const choose=(value:Theme)=>{setTheme(value);window.localStorage.setItem(KEY,value);applyTheme(value)};
 return <div className={"theme-switcher relative grid grid-cols-3 items-center gap-1 rounded-full border border-[color:var(--border)] bg-[color:var(--glass)] p-1 "+(compact?"w-[138px]":"w-[170px]")} aria-label={t("theme.label")} dir="ltr">
 {(["system","light","dark"] as Theme[]).map(value=><button key={value} type="button" onClick={()=>choose(value)} aria-pressed={theme===value} title={t("theme."+value)} className={"theme-option relative z-10 min-h-8 rounded-full px-2 text-[9px] font-black tracking-[.08em] transition "+(theme===value?"active":"")}>{value==="system"?"AUTO":value==="light"?"☼":"◐"}<span className="sr-only">{t("theme."+value)}</span></button>)}
 </div>;
}
