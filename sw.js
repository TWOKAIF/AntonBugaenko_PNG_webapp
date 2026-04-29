const CACHE='bugaenko-png-v35';
const ASSETS=['./','./index.html','./manifest.json','./fonts/Benzin Medium.ttf','./fonts/Benzin-bold.ttf','./fonts/Caravan.otf','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()).then(()=>self.clients.matchAll({includeUncontrolled:true}).then(list=>list.forEach(c=>c.postMessage({type:'SW_UPDATED'})))))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
