import React, { useState, useRef, useEffect } from "react";
import styles from "./Card.module.css";
import PopupMove from "../PopupMove/PopupMove";
import { AiTwotoneDelete } from "react-icons/ai";

const truncateTextAfterSecondSpace = (text) => {
  const words = text.split(' ');
  if (words.length >= 3) {
    const truncatedText = words.slice(0, 2).join(' ');
    return `${truncatedText}...`;
  }
  return text;
}
export default function Card(props) {
  const { id, name, status, species, gender, origin, image, onClose } = props;
  const truncatedName = truncateTextAfterSecondSpace(name);

  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const cardRef = useRef(null);

  const handleCardClick = (event) => {
    if (cardRef.current) {
      const rect = event.target.getBoundingClientRect();
      setPopupPosition({
        top: rect.top + window.scrollY + rect.height / 20,
        left: rect.left + window.scrollX + rect.width / 2,
      });

      setIsPopupOpen(true);
      // cardRef.current.classList.add(styles.cardInvisible);
      // setIsVisible(false);
      setIsActive(true);
      // cardRef.current.classList.add(styles.cardInvisible);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setIsVisible(true);
    setPopupPosition({ top: 0, left: 0 });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  
  const handleButtonClick = () => {
    setIsActive(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${isActive ? styles.active : ''}`}
      draggable="false"
    >
      {isVisible && (
        <div>
          <div className={`${styles.divContainer} ${styles.rotating}`} >
            <img src={image} alt="" className={`${styles.image}`} />
          </div>

          <div className={`${styles.name} ${isActive ? '' : ''}`}>
            <h2 onClick={handleCardClick}>
              {name}
            </h2>
            <button
              className={`${styles.closeButton} ${
                isActive ? styles.active : ""
              }`}
              onClick={() => onClose(id)}
            >
              <AiTwotoneDelete />
            </button>
          </div>
        </div>
      )}

      {isPopupOpen && (
        <PopupMove
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          content={{
            name,
            status,
            species,
            gender,
            origin,
          }}
          position={popupPosition}
          draggable="false"
        />
      )}
    </div>
  );
}
