const CACHE_NAME = 'urban-clothing-v2';
const STATIC_ASSETS = ['/', '/index.html', '/manifest.json'];

// Install: cache static shell
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .catch(() => {})
  );
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

// Fetch strategy:
//  - Navigations / HTML  -> network-first (always serve the freshest shell so the
//    document references chunk hashes that actually exist after a deploy).
//  - Same-origin static assets (hashed, immutable) -> stale-while-revalidate.
//  - Cross-origin (API, fonts, image CDN) -> bypass the SW entirely.
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET; let the browser handle everything else.
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Never intercept cross-origin requests (API calls, Google Fonts, CDN images).
  if (url.origin !== self.location.origin) return;

  // Network-first for navigations so new deploys are picked up immediately.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put('/index.html', clone))
            .catch(() => {});
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match('/index.html'))
        )
    );
    return;
  }

  // Stale-while-revalidate for static assets.
  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const clone = response.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(request, clone))
              .catch(() => {});
          }
          return response;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
