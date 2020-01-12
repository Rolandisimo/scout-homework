import React from "react";
import styles from "./Modal.module.scss";

export interface ModalProps {
  title: string;
  body: string;
}

export const Modal: React.FC<ModalProps> = ({ title, body }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p>{body}</p>
    </div>
  )
}
export default Modal;
