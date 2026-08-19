self.addEventListener('push', event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch {}
  const title = data.title || 'Galaxy Hospital';
  const body = data.message || 'Aapka number aa gaya hai. Aap doctor ke paas jayein.';
  const token = data.token || '';
  event.waitUntil((async () => {
    const clientsList = await self.clients.matchAll({ type:'window', includeUncontrolled:true });
    for (const client of clientsList) {
      client.postMessage({type:'TOKEN_CALLED', token, message:body, voiceText:data.voiceText || body, callId:data.callId || ''});
    }
    await self.registration.showNotification(title, {
      body,
      tag: data.callId ? `token-called-${data.callId}` : (token ? `token-called-${token}` : 'galaxy-token-called'),
      icon:'./icon-192.png', badge:'./icon-192.png', requireInteraction:true,
      vibrate:[300,150,300,150,500], data:{token}
    });
  })());
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{
    for(const client of list){ if('focus' in client) return client.focus(); }
    if(self.clients.openWindow) return self.clients.openWindow('./');
  }));
});
