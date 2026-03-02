const CACHE = 'tasko-v1';
const FILES = [
  '/tasks-app/',
  '/tasks-app/index.html',
  '/tasks-app/script.js',
  '/tasks-app/icon.png',
  '/tasks-app/icon-192.png',
  '/tasks-app/css/base.css',
  '/tasks-app/css/header.css',
  '/tasks-app/css/chips.css',
  '/tasks-app/css/tasks.css',
  '/tasks-app/css/empty.css',
  '/tasks-app/css/bottom-nav.css',
  '/tasks-app/css/modal.css',
];

// Install — cache all files
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — serve from cache first, fallback to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
