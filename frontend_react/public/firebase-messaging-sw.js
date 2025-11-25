importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyDb-CQMI0kjUaWk3KabVib26obXU0Bm-wg',
  authDomain: 'test-web-push-fcm.firebaseapp.com',
  projectId: 'test-web-push-fcm',
  storageBucket: 'test-web-push-fcm.firebasestorage.app',
  messagingSenderId: '678293422902',
  appId: '1:678293422902:web:5739aa293c5840eabaa997',
  measurementId: 'BIZfUZex4jypuLNrqDD6CdglfWjcyCSUkudGoJ8Vn0eoSisl9I02p1fz90H6EO7jXzyj8CzvAEBKSC1ccp3fCNk',
});

const messaging = firebase.messaging();

// バックグラウンド通知（閉じている、または別タブにいる）のときに実行
messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] バックグラウンドで通知を受け取りました',
    payload
  );

  // 通知バナーを表示
  // self.registration.showNotification(payload.data.title, {
  //   body: payload.data.body,
  //   data: {
  //     path: payload.data.path,
  //     targetId: payload.data.targetId,
  //   }
  // });
});

// 通知をクリックしたら、ウィンドウを開くかフォーカスする
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetPath = event.notification?.data?.path || "/"
  const targetId = event.notification?.data?.targetId

  // デフォルトのURL
  const origin = self.location.origin;

  const url = new URL(targetPath, origin);
  if (targetId) {
    url.searchParams.set("id", targetId);
  }

  event.waitUntil(
    clients.openWindow(url.toString())
  );
});