import React, { useState} from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";


export default function Nav(props) {
  const { onSearch, characters } = props;
  const [randomCharacter, setRandomCharacter] = useState(null);
  const getRandomCharacter = () => {
    // Genera un ID aleatorio dentro del rango de 1 a 826
    const randomId = Math.floor(Math.random() * 825) + 1;

    // Verifica si el personaje ya está en la lista actual
    const find = characters.find((character) => character.id === randomId);
    if (find) {
      // Si el personaje ya está en la lista, intenta nuevamente
      getRandomCharacter();
    } else {
      // Si el personaje no está en la lista, llama a onSearch con el ID aleatorio
      onSearch(randomId.toString());
    }
  };

  // Función para generar un personaje aleatorio
  const generateRandomCharacter = () => {
    const randomCharacter = getRandomCharacter(); // Implementa esta función según tus necesidades
    setRandomCharacter(randomCharacter);
  };

  return (
    <div className="nav">
      <SearchBar onSearch={onSearch} />
      <button className="add-button" onClick={getRandomCharacter}>
        Random
      </button>
      < Link to={'/'}>
      <button >Home</button>
      </Link>
      < Link to={'/about'}>
      <button >About</button>
      </Link>
    </div>
  );
}


