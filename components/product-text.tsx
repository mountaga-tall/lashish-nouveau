"use client";

import { useI18n } from "./i18n-provider";
import { productName, productDescription } from "../lib/product-localization";

export function ProductName({ value, className="" }: { value:string; className?:string }) {
  const { locale } = useI18n();
  return <span className={className}>{productName(value,locale)}</span>;
}
export function ProductDescription({ value, className="" }: { value?:string; className?:string }) {
  const { locale } = useI18n();
  return <span className={className}>{productDescription(value,locale)}</span>;
}