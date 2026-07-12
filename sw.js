// sw.js — Nooki's tiny service worker. Its only job is to make desktop / phone
// notifications reliable: notifications shown via registration.showNotification()
// keep appearing while the user is on another tab or has the PWA in the
// background, and clicking one brings Nooki back into focus.

self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

// bring an existing Nooki tab to the front (or open one) when a notification is tapped
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of all) {
      if ('focus' in c) { try { return await c.focus(); } catch (err) {} }
    }
    if (self.clients.openWindow) return self.clients.openWindow('./');
  })());
});
