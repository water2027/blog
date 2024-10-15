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

// 处理fetch事件
self.addEventListener('fetch', (event) => {
	if (
		event.request.mode === 'navigate' ||
		(event.request.method === 'GET' &&
			event.request.headers.get('accept').includes('text/html'))
	) {
		event.respondWith(
			fetch(event.request.url).catch((error) => {
				// 如果网络请求发生错误，使用缓存
				return caches
					.match(event.request)
					.then((response) => {
						if (response) {
							return response;
						}
						// 如果缓存也没有，那就试试离线页面吧
						return caches.match(OFFLINE_PAGE);
					})
					.catch((err) => {
						// 缓存也发生了问题
						console.error('Error in cache lookup:', err);
						return new Response('Offline page not available', {
							status: 503,
							statusText: 'Service Unavailable',
						});
					});
			})
		);
	} else {
		event.respondWith(
			caches.match(event.request).then((response) => {
				if (response) {
					return response; // 如果在缓存中找到响应，则返回缓存的版本
				}
				return fetch(event.request).then((response) => {
					// 检查是否是有效的响应
					if (
						!response ||
						response.status !== 200 ||
						response.type !== 'basic'
					) {
						return response;
					}

					// 克隆响应
					const responseToCache = response.clone();

					caches.open(CACHE_NAME).then((cache) => {
						cache.put(event.request, responseToCache);
					});

					return response;
				});
			})
		);
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
