// Service Worker - DISABLED CACHING
const CACHE_NAME = 'tourwow-v1';

// Clear all caches immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('🗑️ Clearing cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Disable caching - always fetch fresh content
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // Return a proper Response when network fails
      return caches.match(event.request).then((response) => {
        return response || new Response('Network error occurred', {
          status: 500,
          statusText: 'Network Error'
        });
      });
    })
  );
});

// Clear all caches on activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('🗑️ Clearing cache on activate:', cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Clear caches every hour
setInterval(() => {
  caches.keys().then((cacheNames) => {
    cacheNames.forEach((cacheName) => {
      console.log('🗑️ Auto-clearing cache:', cacheName);
      caches.delete(cacheName);
    });
  });
}, 60 * 60 * 1000); // 1 hour