import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_ADMIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUDCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// 現在の権限を取得
export const getPermission = () => Notification.permission;

export const generateToken = async () => {
  // 通知権限の確認
  const permission = await Notification.requestPermission();
  console.log("現在の通知権限の状態: ", permission);
  let token = null;
  if (permission === "granted") {
    // 通知権限が付与されていれば、トークンを取得
    token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY
    })
    console.log("トークン: ", token);
  }
  return { permission, token }
}

// JS上で状態を戻す（完全削除は不可）
export const revokePermission = () => ({ permission: "default", token: null });