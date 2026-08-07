const CACHE_NAME = "lashish-v4";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json",

    "./data/plats.js",
    "./data/pizzas.js",
    "./data/tacos.js",
    "./data/boissons.js",

    "./images/logo.webp",
    "./images/banner.webp",
    "./images/no-image.webp"
];

// Installation
self.addEventListener("install", event => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );
});

// Activation
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

// Fetch
self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") return;

    event.respondWith(

        caches.match(event.request).then(cacheResponse => {

            const networkFetch = fetch(event.request)
                .then(networkResponse => {

                    if (
                        networkResponse &&
                        networkResponse.status === 200 &&
                        networkResponse.type === "basic"
                    ) {

                        const clone = networkResponse.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => cache.put(event.request, clone));

                    }

                    return networkResponse;

                })
                .catch(() => cacheResponse);

            return cacheResponse || networkFetch;

        })

    );

});
