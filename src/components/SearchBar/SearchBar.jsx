import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { MdPersonAddAlt1 } from "react-icons/md";
export default function SearchBar({ onSearch }) {
  const [id, setId] = useState(''); // Estado para almacenar el valor del input
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputChange = (event) => {
    setId(event.target.value)
  };

  const handleAddtChange = () => {
    if (id.trim() !== "") {
      onSearch(id); // Llama a onSearch con el nuevo personaje.
      setId("");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddtChange(); // Llama a la función de manejo al presionar Enter.
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div className={styles.container}>
      <input
        type="number"
        placeholder={isInputFocused ? "" : "Agregar ID"}
        value={id}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress} 
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <button className={styles.btn} onClick={handleAddtChange}>
      <MdPersonAddAlt1 style={{ color: '#f5f5f5', transform: 'rotate(-360deg)', width: '35px', }}/>
      </button>
    </div>
  );
}
