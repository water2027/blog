const CACHE_NAME = 'blog-cache-v1';
const OFFLINE_PAGE = '/offline.html';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/logo.png',
  OFFLINE_PAGE
];

// 安装 Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(STATIC_ASSETS);
      })
  );
});

// 激活 Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 处理fetch事件
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(event.request.url).catch(error => {
        // 如果捕获到异常，返回离线页面
        return caches.match(OFFLINE_PAGE);
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response; // 如果在缓存中找到响应，则返回缓存的版本
          }
          return fetch(event.request)
            .then((response) => {
              // 检查是否是有效的响应
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // 克隆响应
              const responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });

              return response;
            });
        })
    );
  }
});

// 定期更新缓存（每7天）
const CACHE_PERIOD = 7 * 24 * 60 * 60 * 1000; // 7天

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.keys().then((requests) => {
        requests.forEach((request) => {
          cache.match(request).then((response) => {
            if (response && response.headers.get('date')) {
              const cacheDate = new Date(response.headers.get('date'));
              if ((Date.now() - cacheDate.getTime()) > CACHE_PERIOD) {
                cache.delete(request);
              }
            }
          });
        });
      });
    })
  );
});

// 后台同步（如果支持）
self.addEventListener('sync', (event) => {
  if (event.tag === 'update-cache') {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch('/api/get-latest-posts')
          .then((response) => response.json())
          .then((posts) => {
            const updatePromises = posts.map((post) => {
              return cache.add(post.url);
            });
            return Promise.all(updatePromises);
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
    badge: '/images/notification-badge.png'
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});