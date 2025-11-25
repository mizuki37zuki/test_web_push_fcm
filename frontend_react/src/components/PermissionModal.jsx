import React from "react";
import styles from "./PermissionModal.module.css";

const PermissionModal = ({ requestPermission }) => {
  return (
    <div className={styles.modalContainer}>
      <p>通知を受け取りますか？</p>
      <button onClick={requestPermission}>受け取る</button>
    </div>
  )
}

export default PermissionModal;