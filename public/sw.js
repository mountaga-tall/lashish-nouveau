const VERSION = "menushish-v5";
const SHELL = ["/","/menu","/commande","/reserver","/contact","/compte","/favoris","/fidelite","/promotions","/manifest.webmanifest","/icon.svg"];

self.addEventListener("install",(event)=>{event.waitUntil(caches.open(VERSION).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",(event)=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==VERSION).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});

self.addEventListener("fetch",(event)=>{
  if(event.request.method!=="GET") return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin && !url.hostname.endsWith("githubusercontent.com")) return;
  if(url.pathname.startsWith("/api/")) return;

  if(event.request.mode==="navigate"){
    event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(VERSION).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match(event.request).then(cached=>cached||caches.match("/"))));
    return;
  }
  if(url.hostname.endsWith("githubusercontent.com")||/\.(?:png|jpe?g|webp|svg|gif|avif)$/i.test(url.pathname)){
    event.respondWith(caches.match(event.request).then(cached=>{
      const network=fetch(event.request).then(response=>{const copy=response.clone();caches.open(VERSION).then(cache=>cache.put(event.request,copy));return response}).catch(()=>cached);
      return cached||network;
    }));
    return;
  }
  event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(VERSION).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match(event.request)));
});
