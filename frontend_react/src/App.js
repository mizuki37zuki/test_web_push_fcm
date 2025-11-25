import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { generateToken, getPermission, messaging } from './push/firebase';
import { onMessage } from 'firebase/messaging';
import PermissionModal from './components/PermissionModal';

function App() {
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


  // const handleRevoke = () => {
  //   const { permission: perm, token } = revokePermission();
  //   setPermission(perm);
  //   setFcmToken(token);
  // };

  useEffect(() => {
    // フォアグラウンド通知（アプリを開いている最中）を受け取るときに実行
    // onMessage(messaging, (payload) => {
    //   console.log('[App.js] フォアグラウンドで通知を受け取りました', payload);
    // });
    

  // const unsubscribe = onMessage(messaging, (payload) => {
  //   console.log('[App.js] フォアグラウンドで通知を受け取りました', payload);
  // });

  // return () => {
  //   unsubscribe();
  // };

    navigator.serviceWorker.addEventListener("message", (event) => {
      const data = event.data;
      console.log("通知クリックで受け取ったデータ:", data);

    if (data?.url) {
      console.log("ここに遷移する予定:", data.url);
    }
    })
  }, []);

  return (
    <div className="App">
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
        {fcmToken && <p>FCMトークン: {fcmToken}</p>}
        {(!fcmToken || permission !== "granted") && (
          <PermissionModal requestPermission={handleGrant} />
        )}
      </header>

      {/* <button onClick={handleGrant}>通知権限を付与</button>
      <button onClick={handleRevoke}>通知権限を削除</button> */}
    </div>
  );
}

export default App;
