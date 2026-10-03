const CACHE_NAME = "lashish-v6";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./menu.html",
  "./petit-dejeuner.html",
  "./entrees.html",
  "./snacks.html",
  "./plats.html",
  "./specialites.html",
  "./pizzas.html",
  "./tacos.html",
  "./boissons.html",
  "./desserts.html",
  "./cocktails.html",
  "./vins.html",
  "./commande.html",
  "./contact.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./data/translations.js",
  "./data/plats.js",
  "./data/pizzas.js",
  "./data/tacos.js",
  "./data/boissons.js",
  "./images/logo.webp",
  "./images/banner.webp",
  "./images/no-image.webp"
];

self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(FILES_TO_CACHE)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  event.respondWith(
    caches.match(event.request).then(cached=>{
      const fresh=fetch(event.request).then(response=>{
        if(response&&response.ok&&response.type==="basic"){
          const clone=response.clone();
          caches.open(CACHE_NAME).then(cache=>cache.put(event.request,clone));
        }
        return response;
      }).catch(()=>cached);
      return cached||fresh;
    })
  );
});
