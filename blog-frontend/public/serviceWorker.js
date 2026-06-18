// 自动清除旧 service worker（来自浏览器扩展或其他项目缓存）
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => {
  self.registration.unregister().then(() => {
    clients.matchAll({ type: "window" }).then((clients) => {
      clients.forEach((client) => client.navigate(client.url));
    });
  });
});
