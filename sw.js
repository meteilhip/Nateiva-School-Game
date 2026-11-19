// public/sw.js - Nateiva School Game Offline Service Worker
// v1.16.0 — NETWORK-FIRST for pages so every deploy reaches kids immediately;
// cache-first only for immutable static assets (audio, images, fonts).
const CACHE_NAME = 'nateiva-school-game-v1-22-0';
const APP_ROOT = new URL('./', self.location.href).href;
const PRECACHE_URLS = [
  APP_ROOT,
  new URL('manifest.json', APP_ROOT).href
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('Pre-caching partial failure', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

const STATIC_ASSET_RE = /\.(?:mp3|ogg|wav|png|jpg|jpeg|webp|svg|gif|woff2?|ttf|ico)(?:\?|$)/i;

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const isPage = request.mode === 'navigate' || /\.html(?:\?|$)/i.test(request.url) || request.url === APP_ROOT;
  const isStatic = STATIC_ASSET_RE.test(request.url);

  if (isPage || !isStatic) {
    // NETWORK-FIRST: pages, scripts and JSON always come fresh; cache is only the offline fallback.
    event.respondWith(
      fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const copy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return networkResponse;
      }).catch(() => {
        return caches.match(request).then((cached) => {
          if (cached) return cached;
          if (request.mode === 'navigate') return caches.match(APP_ROOT);
        });
      })
    );
    return;
  }

  // CACHE-FIRST: immutable static media (studio audio, images) for instant offline play.
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const copy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return networkResponse;
      });
    })
  );
});
