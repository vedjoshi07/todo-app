// Minimal service worker: cache app shell for offline use.
const CACHE = 'todo-app-v1'
const ASSETS = ['/todo-app/', '/todo-app/index.html', '/todo-app/manifest.webmanifest', '/todo-app/icon.svg']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS).catch(() => undefined))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached
      return fetch(req)
        .then((res) => {
          const url = new URL(req.url)
          if (url.origin === self.location.origin && res.ok) {
            const clone = res.clone()
            caches.open(CACHE).then((cache) => cache.put(req, clone)).catch(() => undefined)
          }
          return res
        })
        .catch(() => cached)
    })
  )
})