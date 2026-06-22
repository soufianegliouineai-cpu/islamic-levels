const CACHE_NAME = 'islamic-levels-v8';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/premium-styles.css',
  '/premium-redesign.css',
  '/splash.css',
  '/app.js',
  '/data.js',
  '/analytics.js',
  '/family.js',
  '/community.js',
  '/seasonal.js',
  '/notifications.js',
  '/prayer-times.js',
  '/supabase.js',
  '/supabase-setup.js',
  '/premium-enhancements.js',
  '/premium-icons.js',
  '/advanced-features.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/tests.html',
  '/privacy.html'
];

// Install
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — cache-first for same-origin, network-first (with cache fallback) for cross-origin
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return; // don't intercept POST/PATCH etc.
  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;
  if (isSameOrigin) {
    e.respondWith(
      caches.match(req).then(res => res || fetch(req).then(net => {
        // Cache successful same-origin GETs for next time
        if (net && net.ok) {
          const clone = net.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, clone)).catch(() => {});
        }
        return net;
      }).catch(() => caches.match('/index.html')))
    );
  } else {
    // Cross-origin: network-first, fall back to cached copy if available
    e.respondWith(
      fetch(req).then(net => {
        if (net && net.ok) {
          const clone = net.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, clone)).catch(() => {});
        }
        return net;
      }).catch(() => caches.match(req))
    );
  }
});

// Push notifications
self.addEventListener('push', (e) => {
  let data = { title: 'المستويات الإيمانية', body: 'لديك إشعار جديد' };
  try {
    if (e.data) data = e.data.json();
  } catch (err) {
    console.error('[SW] Invalid push payload', err);
  }
  e.waitUntil(
    self.registration.showNotification(data.title || 'المستويات الإيمانية', {
      body: data.body || 'لديك إشعار جديد',
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      vibrate: [100, 50, 100],
      data: { url: data.url || '/' }
    })
  );
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});
