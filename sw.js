// cache per uso offline: dopo la prima apertura l'app non ha bisogno di rete
const C = 'scheda-gt-cf8a36';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon-180.png', 'icon-512.png'];
// GIF dei movimenti: salvate anche loro, così si vedono senza rete
const GIF = ["gif/app-extra-01.gif", "gif/app-extra-02.gif", "gif/app-extra-03.gif", "gif/app-extra-04.gif", "gif/app-extra-05.gif", "gif/app-extra-06.gif", "gif/app-extra-07.gif", "gif/app-extra-08.gif", "gif/bicipiti-03.gif", "gif/bicipiti-10.gif", "gif/femorali-glutei-01.gif", "gif/femorali-glutei-03.gif", "gif/femorali-glutei-05.gif", "gif/petto-02.gif", "gif/petto-04.gif", "gif/petto-06.gif", "gif/petto-07.gif", "gif/petto-08.gif", "gif/petto-10.gif", "gif/polpacci-01.gif", "gif/polpacci-02.gif", "gif/polpacci-05.gif", "gif/polpacci-07.gif", "gif/quadricipiti-02.gif", "gif/quadricipiti-03.gif", "gif/quadricipiti-04.gif", "gif/quadricipiti-08.gif", "gif/quadricipiti-10.gif", "gif/schiena-01.gif", "gif/schiena-02.gif", "gif/schiena-03.gif", "gif/schiena-04.gif", "gif/schiena-06.gif", "gif/schiena-09.gif", "gif/spalle-01.gif", "gif/spalle-03.gif", "gif/spalle-05.gif", "gif/spalle-07.gif", "gif/tricipiti-09.gif", "gif/tricipiti-10.gif"];
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(FILES.concat(GIF))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // rete se c'è (così prendi gli aggiornamenti), altrimenti la copia salvata
  e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; })
    .catch(() => caches.match(e.request, {ignoreSearch: true}).then(r => r || caches.match('index.html'))));
});
