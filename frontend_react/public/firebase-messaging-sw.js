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
  
  // const notificationTitle = payload.notification.title;
  // const notificationOptions = {
  //   body: payload.notification.body,
  //   icon: payload.notification.image
  // };

  // ブラウザの通知バナー（ネイティブ通知）を表示
  // self.registration.showNotification(notificationTitle, notificationOptions);
});

// self.addEventListener("push", (event) => {
//   // const data = event.data.json();
//   let data = {}

//   try {
//     data = JSON.parse(event.data.text());
//   } catch (error) {
//     console.error("Push data parse error:", error)
//   }

//   event.waitUntil(
//     self.registration.showNotification(data.title, {
//       body: data.body,
//       data: { url: data.url, targetId: data.target_id } // データを保持
//     })
//   );
// });

// self.addEventListener("notificationclick", (event) => {
//   event.notification.close();

//   event.waitUntil(
//     clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
//       // 既存タブがあればそこを開く
//       for (const client of clientList) {
//         if (client.url.includes("/") && "focus" in client) {
//           client.postMessage(event.notification.data); // データ送信
//           return client.focus();
//         }
//       }
//       // タブがなければ新規作成
//       if (clients.openWindow) {
//         return clients.openWindow(event.notification.data.url);
//       }
//     })
//   );
// });