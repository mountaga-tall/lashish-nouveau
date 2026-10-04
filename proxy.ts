import { NextResponse, type NextRequest } from "next/server";
const locales=["fr","en","ar"] as const;
type Locale=(typeof locales)[number];
function preferredLocale(request:NextRequest):Locale{
  const cookie=request.cookies.get("menushish_locale")?.value;
  if(cookie==="fr"||cookie==="en"||cookie==="ar")return cookie;
  const accepted=request.headers.get("accept-language")?.toLowerCase()||"";
  if(accepted.startsWith("ar")||accepted.includes(",ar"))return "ar";
  if(accepted.startsWith("en")||accepted.includes(",en"))return "en";
  return "fr";
}
export function proxy(request:NextRequest){
  const path=request.nextUrl.pathname;
  if(path.startsWith("/api/")||path.startsWith("/_next/")||/\.[^/]+$/.test(path))return NextResponse.next();
  const match=path.match(/^\/(fr|en|ar)(?:\/|$)/);
  if(match){
    const response=NextResponse.next();
    response.cookies.set("menushish_locale",match[1],{path:"/",maxAge:31536000,sameSite:"lax"});
    return response;
  }
  const locale=preferredLocale(request);
  const url=request.nextUrl.clone();
  url.pathname="/"+locale+(path==="/"?"":path);
  const response=NextResponse.redirect(url,308);
  response.cookies.set("menushish_locale",locale,{path:"/",maxAge:31536000,sameSite:"lax"});
  return response;
}
export const config={matcher:["/((?!api|_next/static|_next/image|favicon.ico).*)"]};