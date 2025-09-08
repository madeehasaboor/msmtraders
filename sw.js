// Service Worker for MSM Traders E-commerce
const CACHE_NAME = 'msm-traders-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/perfumes.html',
    '/electronics.html',
    '/laptops.html',
    '/car_care.html',
    '/house_care.html',
    '/sale.html',
    '/contact.html',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Install event - cache resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                if (response) {
                    return response;
                }
                return fetch(event.request).then(response => {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    return response;
                });
            }
        )
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Background sync for offline orders
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

function doBackgroundSync() {
    // Handle offline orders when connection is restored
    return fetch('/api/offline-orders')
        .then(response => response.json())
        .then(orders => {
            // Process offline orders
            console.log('Processing offline orders:', orders);
        })
        .catch(error => {
            console.error('Background sync failed:', error);
        });
}
