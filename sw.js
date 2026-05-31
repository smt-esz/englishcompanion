// My English Companion – Service Worker v4 (offline-first)
const CACHE = 'my-english-companion-v14';
const CORE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

// Precache CDN assets we know we need
const CDN = [
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// Install: cache all core assets immediately
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => {
      // Cache core files (must succeed)
      return c.addAll(CORE).then(() => {
        // Try to cache CDN (best-effort, won't fail install if CDN unavailable)
        return Promise.allSettled(CDN.map(url =>
          fetch(url, {mode:'no-cors'}).then(res => c.put(url, res)).catch(()=>{})
        ));
      });
    })
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first for everything, network fallback
self.addEventListener('fetch', e => {
  // Skip non-GET
  if(e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if(cached) {
        // Return cached immediately, revalidate in background
        const revalidate = fetch(e.request).then(res => {
          if(res && res.status === 200) {
            caches.open(CACHE).then(c => c.put(e.request, res.clone()));
          }
          return res;
        }).catch(() => {});
        return cached;
      }

      // Not in cache: try network
      return fetch(e.request).then(res => {
        if(!res || res.status !== 200) return res;
        // Cache successful responses (including opaque cross-origin)
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }).catch(() => {
        // Offline fallback: serve index.html for navigation requests
        if(e.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return new Response('Offline', {status: 503});
      });
    })
  );
});
