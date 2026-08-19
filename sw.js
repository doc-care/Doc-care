self.addEventListener('push', event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch {}

  const title = data.title || 'Galaxy Hospital';
  const body = data.message || 'Aapka number aa gaya hai. Aap doctor ke paas jayein.';
  const token = data.token || '';

  event.waitUntil((async () => {
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of clients) {
      client.postMessage({
        type: 'TOKEN_CALLED',
        token,
        message: data.voiceText || body
      });
    }

    await self.registration.showNotification(title, {
      body,
      tag: token ? `token-called-${token}` : 'galaxy-token-called',
      icon: './icon-192.png',
      badge: './icon-192.png',
      requireInteraction: true,
      data: { token }
    });
  })());
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const client of list) {
      if ('focus' in client) return client.focus();
    }
    if (clients.openWindow) return clients.openWindow('./');
  }));
});
