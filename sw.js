const CACHE_NAME = 'studio-clock-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  // Añade aquí tus iconos si quieres que funcionen offline
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
