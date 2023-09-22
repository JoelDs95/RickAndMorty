import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
  const [id, setId] = useState(''); // Estado para almacenar el valor del input
  // const [inputValue, setInputValue] = useState("");
  

  const handleInputChange = (event) => {
    setId(event.target.value); // Actualiza el estado con el valor del input
  };


  const handleAddtChange = () => {
    if (id.trim() !== "") {
      onSearch(id); // Llama a onSearch con el nuevo personaje.
      setId("");
    }
  };


  // const handleAddClick = () => {
  //   // Ejecuta la función onSearch pasándole el valor actual
  //   props.onSearch(inputValue);
  // };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Agregar personaje..."
        value={id}
        onChange={handleInputChange}
      />
      <button className="add-button" onClick={handleAddtChange}>
        Agregar
      </button>
    </div>
  );
}
