import React, { useState } from "react";
import axios from 'axios';
import "./App.css";

import Cards from "./components/Cards/Cards.jsx";
import Nav from "./components/Nav/Nav";
import About from "./components/About/About.jsx";
import Details from "./components/Details/Details.jsx";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Routes, Route } from 'react-router-dom';
//import Card from "./components/Card.jsx";

function App() {
  const [characters, setCharacters] = useState([])

  // const char = characters
  const onSearch = async (id) => {

    const find = characters.find((character) => character.id === +id);
    console.log('find ', find);
    if (find) return window.alert("¡Este personaje ya fue agregado!");
    
    axios(`https://rickandmortyapi.com/api/character/${id}`)
      .then(({ data }) => {
        if (data.name) {
          setCharacters((oldChars) => [...oldChars, data]);
        } else {
          window.alert('¡No hay personajes con este ID!');
        }
      })
      .catch((error) => {
        console.error('Error al buscar el personaje:', error);
      });

  }
  const onClose = (id) => {
    // Parsea el id a número
    const characterId = parseInt(id, 10);
    // Filtra los personajes para mantener solo aquellos cuyo id sea diferente al proporcionado
    const updatedCharacters = characters.filter((character) => character.id !== characterId);

    // Actualiza el estado con los personajes actualizados
    setCharacters(updatedCharacters);
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Nav onSearch={onSearch} characters={characters} />
        {/* <Cards characters={characters} onClose={onClose} /> */}
        <Routes >
          <Route path='/' element={<Cards characters={characters} onClose={onClose} />} />
          <Route path='/about' element={<About />} />
          <Route path='/details/:id' element={<Details />} />
        </Routes>
      </div>
    </DndProvider >
  );
}

export default App;
