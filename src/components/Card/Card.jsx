import React, { useState, useRef, useEffect } from "react";
import styles from "./Card.module.css";
import PopupMove from "../PopupMove/PopupMove";
import { AiTwotoneDelete } from "react-icons/ai";
import { connect } from "react-redux";
import { addFav, removeFav } from "../../redux/actions";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";

const truncateTextAfterSecondSpace = (text) => {
  const words = text.split(" ");
  if (words.length >= 3) {
    const truncatedText = words.slice(0, 2).join(" ");
    return `${truncatedText}...`;
  }
  return text;
};
const Card = function (props) {
  const {
    id,
    name,
    status,
    species,
    gender,
    origin,
    image,
    onClose,
    addFav,
    removeFav,
    myFavorites,
  } = props;
  const truncatedName = truncateTextAfterSecondSpace(name);

  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const cardRef = useRef(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFav, setIsFav] = useState(false);

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
  const handleFavorite = () => {
    if (isFav) {
      removeFav(id);
      setIsFav(false);
    } else {
      addFav({
        name,
        status,
        species,
        gender,
        origin,
        image,
        id,
      });
      setIsFav(true);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    if (myFavorites && myFavorites.length > 0) {
      myFavorites.forEach((fav) => {
        if (fav.id === props.id) {
          setIsFavorite(true);
        }
      });
    }

    return () => clearTimeout(timeoutId);
  }, [myFavorites, props.id]);

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${isActive ? styles.active : ""}`}
      draggable="false"
    >
      {isVisible && (
        <div>
          <div className={`${styles.divContainer} ${styles.rotating}`}>
            <img src={image} alt="" className={`${styles.image}`} />
          </div>

          <div className={`${styles.name} ${isActive ? "" : ""}`}>
            <h2 onClick={handleCardClick}>{name}</h2>
            <button
              className={`${styles.closeButton} ${
                isActive ? styles.active : ""
              }`}
              onClick={() => onClose(id)}
            >
              <AiTwotoneDelete style={{ fontSize: "20px",color: '#63b421' }}/>
            </button>
            <button
              onClick={handleFavorite}
              className={
                isFav ? styles.favoriteButton : styles.notFavoriteButton
              }
            >
              {isFav ?  <MdOutlineFavorite style={{ fontSize: "20px",color: 'red' }} /> :<MdOutlineFavorite style={{ fontSize: "20px", color: '#c24c6f' }}/>}
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
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
          position={popupPosition}
          draggable="false"
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  myFavorites: state.myFavorites,
});

export default connect(mapStateToProps, { addFav, removeFav })(Card);
