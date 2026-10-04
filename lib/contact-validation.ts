import { parsePhoneNumberFromString } from "libphonenumber-js";
export function validPhone(value:string,country:string){
  const parsed=parsePhoneNumberFromString(value.trim(),country as any);
  return parsed?.isValid() ? parsed.number : null;
}
export function validEmail(value:string){
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim().toLowerCase());
}
export async function domainHasMailRecords(email:string){
  const domain=email.split("@")[1]?.toLowerCase();
  if(!domain)return false;
  try{
    const mx=await fetch("https://cloudflare-dns.com/dns-query?name="+encodeURIComponent(domain)+"&type=MX",{headers:{accept:"application/dns-json"}});
    if(mx.ok){
      const data=await mx.json() as {Status?:number;Answer?:unknown[]};
      if((data.Answer?.length??0)>0)return true;
    }
    const a=await fetch("https://cloudflare-dns.com/dns-query?name="+encodeURIComponent(domain)+"&type=A",{headers:{accept:"application/dns-json"}});
    if(a.ok){
      const data=await a.json() as {Status?:number;Answer?:unknown[]};
      return (data.Answer?.length??0)>0;
    }
  }catch{}
  return true;
}