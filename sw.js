const CACHE_NAME = "lashish-v10";

const FILES_TO_CACHE = [
  "./","./index.html","./menu.html","./commande.html","./contact.html",
  "./petit-dejeuner.html","./entrees.html","./snacks.html","./plats.html","./specialites.html",
  "./pizzas.html","./tacos.html","./boissons.html","./desserts.html","./cocktails.html","./vins.html",
  "./style.css","./app.js","./manifest.json","./data/translations.js",
  "./data/petit-dejeuner.js","./data/entrees.js","./data/snacks.js","./data/plats.js","./data/specialites.js",
  "./data/pizzas.js","./data/tacos.js","./data/boissons.js","./data/desserts.js","./data/cocktails.js","./data/vins.js","./data/menu.js",
  "./images/logo.webp","./images/banner.webp","./images/no-image.webp"
];

self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(FILES_TO_CACHE)).then(()=>self.skipWaiting()));
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  const request=event.request;
  const isDocument=request.mode==="navigate" || request.destination==="document";

  if(isDocument){
    event.respondWith(
      fetch(request)
        .then(response=>{
          if(response.ok){
            const clone=response.clone();
            caches.open(CACHE_NAME).then(cache=>cache.put(request,clone));
          }
          return response;
        })
        .catch(()=>caches.match(request).then(cached=>cached||caches.match("./index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached=>{
      if(cached)return cached;
      return fetch(request).then(response=>{
        if(response.ok && response.type==="basic"){
          const clone=response.clone();
          caches.open(CACHE_NAME).then(cache=>cache.put(request,clone));
        }
        return response;
      });
    })
  );
});
