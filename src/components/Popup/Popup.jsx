import React from "react";
import styles from "./Popup.module.css";


export default function Popup(props) {
  const { isOpen, onClose, content } = props;

  return isOpen ? (
    <div className={styles.popup}>
      <div className={styles.popupHeader}>
        <div className={styles.controls}>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
          <button className={styles.minimizeButton}>-</button>
          <button className={styles.maximizeButton}>+</button>
        </div>
      </div>
      <div className={styles.popupContent}>
        <h2 className={styles.name}>{content.name}</h2>
        <p className={`${styles.typing} ${styles.popupContent} ${styles.status}`}  >Estado: {content.status}</p>
        <p className={`${styles.typing} ${styles.popupContent} ${styles.species}`}>Especie: {content.species}</p>
        <p className={`${styles.typing} ${styles.popupContent} ${styles.gender}`} >Género: {content.gender}</p>
        <p className={`${styles.typing} ${styles.popupContent} ${styles.origin}`}> rigen: {content.origin.name}</p>
      </div>
    </div>
  ) : null;
}