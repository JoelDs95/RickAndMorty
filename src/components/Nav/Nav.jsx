import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import styles from "../Nav/Nav.module.css";
import { FaTachometerAlt } from "react-icons/fa";
import { GiCardRandom } from "react-icons/gi";
import { BsPersonVcardFill, BsInfoLg } from "react-icons/bs";

export default function Nav(props) {
  const { onSearch, characters } = props;
  const [randomCharacter, setRandomCharacter] = useState(null);
  const getRandomCharacter = () => {
    // Genera un ID aleatorio dentro del rango de 1 a 826
    const randomId = Math.floor(Math.random() * 825) + 1;

    // Verifica si el personaje ya está en la lista actual
    const find = characters.find((character) => character.id === randomId);
    if (find) {
      getRandomCharacter();
    } else {
      onSearch(randomId.toString());
    }
  };


  return (
    <div className={styles.nav}>
      {/* <img src="https://logos-world.net/wp-content/uploads/2022/01/Rick-And-Morty-Logo.png" alt="logo" className={styles.logoImage}/> */}
      <Link to={"/home"}>
        <button className={styles.homeButton}>
          <FaTachometerAlt style={{fontSize:'40px'}} /> Home
        </button>
      </Link>
      <button className={styles.addButton} onClick={getRandomCharacter}>
        <GiCardRandom style={{fontSize:'40px'}} /> Random
      </button>
      {/* < Link to={'/home'}></Link> */}
      <Link to={"/about"}>
        <button className={styles.aboutButton}>
          <BsInfoLg style={{fontSize:'40px'}}/> About
        </button>
      </Link>
      <div>
        <SearchBar onSearch={onSearch} />
      </div>
    </div>
  );
}
