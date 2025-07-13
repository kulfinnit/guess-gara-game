const CACHE_NAME = "guess-gara-v2";
const urlsToCache = [
  "./",
  "./index.html",
  "./favicon.ico",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap",
  "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg",
  "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg",
  "https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        }),
      );
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request)),
  );
});
