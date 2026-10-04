"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
type Props=Omit<ComponentProps<typeof Link>,"href"> & {href:string};
export default function LocaleLink({href,...props}:Props){
 const pathname=usePathname();
 const locale=(pathname.match(/^\/(fr|en|ar)(?:\/|$)/)?.[1]||"fr");
 const path=href.startsWith("/")?href:"/"+href;
 const localized=path==="/" ? "/"+locale : (/^\/(fr|en|ar)(?:\/|$)/.test(path)?path:"/"+locale+path);
 return <Link href={localized} {...props}/>;
}