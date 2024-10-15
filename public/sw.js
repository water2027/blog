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
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        return new Response('Network error happened', {
            status: 408,
            headers: { 'Content-Type': 'text/plain' },
        });
    }
}

async function cacheFirstWithRefresh(request) {
    const cachedResponse = await caches.match(request);
    const fetchPromise = fetch(request).then(async (networkResponse) => {
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }).catch(error => {
        console.error('Fetching failed:', error);
        return cachedResponse || new Response('Network error happened', {
            status: 408,
            headers: { 'Content-Type': 'text/plain' },
        });
    });
    
    return cachedResponse || fetchPromise;
}

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (event.request.mode === 'navigate' || url.pathname === '/') {
        event.respondWith(networkFirst(event.request));
    } else {
        event.respondWith(cacheFirstWithRefresh(event.request));
    }
});

// 推送通知（如果您的博客支持）
self.addEventListener('push', (event) => {
	const data = event.data.json();
	const options = {
		body: data.body,
		icon: '/images/notification-icon.png',
		badge: '/images/notification-badge.png',
	};

	event.waitUntil(self.registration.showNotification(data.title, options));
});
