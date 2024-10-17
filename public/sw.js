const CACHE_NAME = 'blog-cache-v1';
const OFFLINE_PAGE = '/offline.html';

// 定期更新缓存（每7天）
const CACHE_PERIOD = 7 * 24 * 60 * 60 * 1000; // 7天

const STATIC_ASSETS = [
	'/',
	'/index.html',
	'/styles/main.css',
	'/scripts/main.js',
	'/images/logo.png',
	'/offline.html',
];

function cleanOldCaches() {
	return caches.keys().then((cacheNames) => {
		return Promise.all(
			cacheNames.map((cacheName) => {
				if (cacheName !== CACHE_NAME) {
					console.log('Deleting old cache:', cacheName);
					return caches.delete(cacheName);
				}
			})
		);
	});
}

function updateCachePeriodically() {
	return caches.open(CACHE_NAME).then((cache) => {
		return cache.keys().then((requests) => {
			return Promise.all(
				requests.map((request) => {
					return cache.match(request).then((response) => {
						if (response && response.headers.get('date')) {
							const cacheDate = new Date(
								response.headers.get('date')
							);
							if (
								Date.now() - cacheDate.getTime() >
								CACHE_PERIOD
							) {
								return cache.delete(request);
							}
						}
					});
				})
			);
		});
	});
}

// 安装 Service Worker
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log('Opened cache');
			return cache.addAll(STATIC_ASSETS);
		})
	);
});

// 激活 Service Worker
self.addEventListener('activate', (event) => {
	event.waitUntil(Promise.all([cleanOldCaches(), updateCachePeriodically()]));
});

async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request, { redirect: 'follow' });
        if (networkResponse.ok || networkResponse.type === 'opaqueredirect') {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.error('Network request failed:', error);
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        return caches.match(OFFLINE_PAGE);
    }
}

async function cacheFirstWithRefresh(request) {
    const cachedResponse = await caches.match(request);
    const fetchPromise = fetch(request, { redirect: 'follow' }).then(async (networkResponse) => {
        if (networkResponse.ok || networkResponse.type === 'opaqueredirect') {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }).catch(error => {
        console.error('Fetching failed:', error);
        return cachedResponse || caches.match(OFFLINE_PAGE);
    });
    
    return cachedResponse || fetchPromise;
}

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (event.request.mode === 'navigate' || url.pathname === '/' || event.request.url.startsWith('https://giscus.app/api')) {
        event.respondWith(networkFirst(event.request));
    } else if (event.request.method === 'GET') {
        event.respondWith(cacheFirstWithRefresh(event.request));
    } else {
        event.respondWith(fetch(event.request));
    }
});