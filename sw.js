// My English Companion – Service Worker v5
// Strategy: network-first for the page (HTML) so a new version is loaded
// as soon as the device is online; stale-while-revalidate for other assets;
// cache fallback when offline.
const CACHE = 'my-english-companion-v15';
const CORE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];
const CDN = [
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      c.addAll(CORE).then(() =>
        Promise.allSettled(CDN.map(url =>
          fetch(url, {mode:'no-cors'}).then(res => c.put(url, res)).catch(()=>{})
        ))
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Allow the page to tell a waiting worker to take over immediately.
self.addEventListener('message', e => {
  if(e.data === 'SKIP_WAITING') self.skipWaiting();
});

function isHTMLRequest(req){
  if(req.mode === 'navigate') return true;
  const url = new URL(req.url);
  return url.pathname.endsWith('/') || url.pathname.endsWith('index.html');
}

self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;

  // NETWORK-FIRST for the page itself -> always the newest version when online.
  if(isHTMLRequest(e.request)){
    e.respondWith(
      fetch(e.request).then(res => {
        if(res && res.status === 200){
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put('./index.html', clone));
        }
        return res;
      }).catch(() =>
        caches.match(e.request).then(c => c || caches.match('./index.html'))
      )
    );
    return;
  }

  // STALE-WHILE-REVALIDATE for everything else (assets, fonts, CDN).
  e.respondWith(
    caches.match(e.request).then(cached => {
      const network = fetch(e.request).then(res => {
        if(res && res.status === 200){
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
