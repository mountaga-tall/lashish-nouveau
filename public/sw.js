const VERSION="la-shish-v12";
const SHELL=["/fr","/en","/ar","/fr/menu","/en/menu","/ar/menu","/fr/commande","/en/commande","/ar/commande","/fr/compte","/en/compte","/ar/compte","/fr/reserver","/en/reserver","/ar/reserver","/fr/contact","/en/contact","/ar/contact","/manifest.webmanifest","/logo.webp"];

async function fetchWithTimeout(request,ms=6500){
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),ms);
  try{return await fetch(request,{signal:controller.signal,cache:"no-store"})}
  finally{clearTimeout(timer)}
}

self.addEventListener("install",event=>event.waitUntil(caches.open(VERSION).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==VERSION).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));

self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin||url.pathname.startsWith("/api/"))return;

  if(event.request.mode==="navigate"){
    event.respondWith(
      fetchWithTimeout(event.request,6500)
      .then(response=>{if(response.ok){const copy=response.clone();caches.open(VERSION).then(cache=>cache.put(event.request,copy));}return response})
      .catch(()=>caches.match(event.request).then(c=>c||caches.match("/fr")))
    );
    return;
  }

  if(url.pathname.startsWith("/_next/")||url.pathname.startsWith("/icons/")||/\.(?:svg|webp|png|jpe?g|avif|gif)$/i.test(url.pathname)){
    event.respondWith(caches.match(event.request).then(cached=>{
      if(cached)return cached;
      return fetchWithTimeout(event.request,6500).then(response=>{
        if(response.ok){const copy=response.clone();caches.open(VERSION).then(cache=>cache.put(event.request,copy));}
        return response;
      });
    }));
  }
});
