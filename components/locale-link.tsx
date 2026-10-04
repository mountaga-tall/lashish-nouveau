"use client";
import Link from "next/link";
import { useI18n } from "./i18n-provider";
type Props={href:string;children:React.ReactNode;className?:string;[key:string]:unknown};
export default function LocaleLink({href,children,...props}:Props){
  const {locale}=useI18n();
  const path=href.startsWith("/")?href:"/"+href;
  const localized=path==="/" ? "/"+locale : (/^\/(fr|en|ar)(?:\/|$)/.test(path)?path:"/"+locale+path);
  return <Link href={localized} {...props}>{children}</Link>;
}