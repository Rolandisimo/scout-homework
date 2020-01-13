import React, { useState } from "react";
import styles from "./Modal.module.scss";

export interface ModalProps {
  title: string;
  body: string;
}

export const Modal: React.FC<ModalProps> = ({ title, body }) => {
  const [isVisible, setIsVisible] = useState(!!body);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <button className={styles.closeModal} onClick={() => setIsVisible(false)}>Close</button>
        <h2 className={styles.title}>{title}</h2>
        <p>{body}</p>
      </div>
    </div>
  )
}
export default Modal;
