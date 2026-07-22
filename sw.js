const CACHE_NAME = 'studio-clock-v1';
const assets = [
  './',
  './index.html',
  './manifest.json'
];

// Instalar y cachear archivos
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// Activar y limpiar caches antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Responder peticiones incluso sin internet
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
