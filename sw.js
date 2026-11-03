// cache per uso offline: dopo la prima apertura l'app non ha bisogno di rete
const C = 'scheda-gt-782a32';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon-180.png', 'icon-512.png'];
// GIF dei movimenti: salvate anche loro, così si vedono senza rete
const GIF = ["gif/bicipiti-10.gif", "gif/femorali-glutei-03.gif", "gif/femorali-glutei-04.gif", "gif/femorali-glutei-05.gif", "gif/petto-03.gif", "gif/petto-04.gif", "gif/petto-07.gif", "gif/petto-08.gif", "gif/petto-09.gif", "gif/polpacci-01.gif", "gif/polpacci-02.gif", "gif/quadricipiti-01.gif", "gif/quadricipiti-02.gif", "gif/quadricipiti-03.gif", "gif/quadricipiti-04.gif", "gif/schiena-02.gif", "gif/schiena-03.gif", "gif/schiena-04.gif", "gif/schiena-05.gif", "gif/schiena-07.gif", "gif/schiena-09.gif", "gif/spalle-02.gif", "gif/spalle-03.gif", "gif/spalle-05.gif", "gif/spalle-07.gif", "gif/spalle-10.gif", "gif/tricipiti-04.gif", "gif/tricipiti-10.gif"];
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(FILES.concat(GIF))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // rete se c'è (così prendi gli aggiornamenti), altrimenti la copia salvata
  e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; })
    .catch(() => caches.match(e.request, {ignoreSearch: true}).then(r => r || caches.match('index.html'))));
});
