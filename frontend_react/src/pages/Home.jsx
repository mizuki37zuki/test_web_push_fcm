import React from "react"
import '../App.css';
import logo from '../logo.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateToken, getPermission, messaging } from '../push/firebase';
import { onMessage } from 'firebase/messaging';
import PermissionModal from "../components/PermissionModal";

const HomePage = () => {
  const [permission, setPermission] = useState(getPermission());
  const [fcmToken, setFcmToken] = useState(null);

  const handleGrant = async () => {
    // 現在の権限をチェック
    if (Notification.permission  === "denied") {
      alert("通知が拒否されています。ブラウザの設定から許可してください。");
      return; // ここで処理を終了
    }

    const { permission: perm, token } = await generateToken();
    setPermission(perm);
    setFcmToken(token);
  };

  const navigate = useNavigate();

  useEffect(() => {
    // フォアグラウンド通知（アプリを開いている最中）を受け取るときに実行
    onMessage(messaging, (payload) => {
      console.log('[App.js] フォアグラウンドで通知を受け取りました', payload);

      const target = payload.data.path || "/";
      navigate(target)
    });
  }, []);

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React!!!
      </a>

      <p>通知権限: {permission}</p>
      {fcmToken && <p style={{ wordBreak: "break-all", fontSize: "16px" }}>FCMトークン: {fcmToken}</p>}
      {(!fcmToken || permission !== "granted") && (
        <PermissionModal requestPermission={handleGrant} />
      )}
    </header>
  )
}

export default HomePage