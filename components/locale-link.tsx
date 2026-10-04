"use client";
import Link from "next/link";
import type { ComponentProps } from "react";
import { useI18n } from "./i18n-provider";
type Props=Omit<ComponentProps<typeof Link>,"href"> & {href:string};
export default function LocaleLink({href,...props}:Props){
 const {locale}=useI18n();
 const path=href.startsWith("/")?href:"/"+href;
 const localized=path==="/" ? "/"+locale : (/^\/(fr|en|ar)(?:\/|$)/.test(path)?path:"/"+locale+path);
 return <Link href={localized} {...props}/>;
}