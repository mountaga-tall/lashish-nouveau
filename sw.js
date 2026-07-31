/* =====================================================
   LA SHISH PWA SERVICE WORKER
===================================================== */

const CACHE_NAME = "la-shish-v2";

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



/* INSTALLATION */

self.addEventListener(
"install",
event => {

event.waitUntil(

caches.open(CACHE_NAME)

.then(cache => {

return cache.addAll(FILES_TO_CACHE);

})

);

self.skipWaiting();

});





/* ACTIVATION */

self.addEventListener(
"activate",
event => {

event.waitUntil(

caches.keys()

.then(keys => {

return Promise.all(

keys.map(key => {

return caches.delete(key);

})

);

})

);

self.clients.claim();

});







/* CACHE + RESEAU */

self.addEventListener(
"fetch",
event => {

event.respondWith(

fetch(event.request)

.then(response => {

const responseClone = response.clone();


caches.open(CACHE_NAME)

.then(cache => {

cache.put(event.request, responseClone);

});


return response;

})

.catch(() => {

return caches.match(event.request);

})

);

});
