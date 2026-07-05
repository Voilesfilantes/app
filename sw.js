// Service Worker — toujours depuis le réseau, pas de cache
const CACHE = 'vf-app-v5';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Supprimer TOUS les anciens caches
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Toujours aller chercher sur le réseau — jamais depuis le cache
  if (e.request.url.startsWith(self.location.origin)) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
  }
});
