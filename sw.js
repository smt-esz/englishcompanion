// My English Companion – Service Worker
// Strategie:
//   - Seite, Skripte und Styles: zuerst aus dem Netz (network-first), offline
//     aus dem Cache. So passen index.html und die js/-Dateien immer zusammen.
//   - Schriften und Bilder: zuerst aus dem Cache, im Hintergrund aktualisieren.
// Alle Assets liegen lokal (kein CDN) – die App ist komplett offline-fähig.
//
// WICHTIG: Bei jeder Veröffentlichung die Zahl in CACHE um 1 erhöhen.
// Neue Dateien unter js/ oder data/ zusätzlich hier in CORE eintragen,
// sonst fehlen sie offline.
const CACHE = 'my-english-companion-v27';
const CORE = [
  './',
  './index.html',
  './tailwind.css',
  './css/app.css',
  './js/config.js',
  './data/grammar.js',
  './data/vocab.js',
  './data/irregular-verbs.js',
  './data/skills.js',
  './data/badges.js',
  './js/storage.js',
  './js/i18n.js',
  './js/core.js',
  './js/srs.js',
  './data/grammar-ohe.js',
  './js/router.js',
  './js/features/home.js',
  './js/features/onboarding.js',
  './js/features/grammar.js',
  './js/features/vocabulary.js',
  './js/features/irregular-verbs.js',
  './js/features/skills.js',
  './js/features/games.js',
  './js/features/practice.js',
  './js/features/today.js',
  './js/features/progress.js',
  './js/features/help.js',
  './js/app.js',
  './fonts/inter-latin.woff2',
  './fonts/inter-latin-ext.woff2',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', e => {
  // cache:'reload' umgeht den HTTP-Cache des Browsers → garantiert frische Dateien.
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(CORE.map(u => new Request(u, {cache: 'reload'}))))
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
function isCodeRequest(req){
  const p = new URL(req.url).pathname;
  return p.endsWith('.js') || p.endsWith('.css');
}

self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  if(new URL(e.request.url).origin !== self.location.origin) return;

  // NETWORK-FIRST für die Seite → online immer die neueste Version.
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

  // NETWORK-FIRST auch für Skripte und Styles (gleicher Stand wie die Seite).
  if(isCodeRequest(e.request)){
    e.respondWith(
      fetch(e.request, {cache: 'no-cache'}).then(res => {
        if(res && res.status === 200){
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  // STALE-WHILE-REVALIDATE für alles andere (Schriften, Bilder, Manifest).
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
