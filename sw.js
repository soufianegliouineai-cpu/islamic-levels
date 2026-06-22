const CACHE_NAME = 'islamic-levels-v4';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/premium-styles.css',
  '/premium-redesign.css',
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
  '/icons/icon-512.png'
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

// Fetch
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
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
