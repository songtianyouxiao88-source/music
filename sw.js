const CACHE_NAME = 'sounddeck-cache-v1';
const ASSETS = [
'index.html',
'logo.png',
'song.mo3',
];

self.addEventListener('install', e => {
e.waitUntil(
caches.open(CACHE_NAME).then(cache => {
return cache.addAll(ASSETS);
}).then(() => self.skipWaiting())
);
});

self.addEventListener('activate', e => {
e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
e.respondWith(
caches.match(e.request).then(cachedResponse => {
return cachedResponse || fetch(e.request);
})
);
});
