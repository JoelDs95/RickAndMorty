import React, { useState } from "react";
import styles from './PopupMove.module.css';
import { useDrag } from "react-dnd";


export default function PopupMove(props) {
  const { isOpen, onClose, content } = props;

  const [position, setPosition] = useState({ x: 100, y: 100 });

  const itemType = "POPUP";

  const [, drag] = useDrag({
    type: itemType,
    item: { content },
  });

  const handleMouseDown = (e) => {
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e) => {
      const newX = e.clientX - startX;
      const newY = e.clientY - startY;
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return isOpen ? (
    <div
      className={`${styles.popup}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: "move", // Cambia el cursor para indicar que se puede mover
      }}
      onMouseDown={handleMouseDown}
      ref={drag}
    >
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
        <p>Estado: {content.status}</p>
        <p>Especie: {content.species}</p>
        <p>Género: {content.gender}</p>
        <p>Origen: {content.origin.name}</p>
      </div>
    </div>
  ) : null;
}