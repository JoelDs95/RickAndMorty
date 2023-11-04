import React, { useState } from "react";
import axios from 'axios';
import "./App.css";

import Cards from "./components/Cards/Cards.jsx";
import Nav from "./components/Nav/Nav";
import About from "./components/About/About.jsx";
import Details from "./components/Details/Details.jsx";
import MyForm from "./components/MyForm/MyForm";
import NotFound from "./components/NotFound/NotFound";
import MyFavorites from "./components/MyFavorites/MyFavorites";

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Routes, Route, useLocation } from 'react-router-dom';
//import Card from "./components/Card.jsx";

const access = {
  userName: 'prueba@example.com',
  password: '123456',
}

function App() {
  const [characters, setCharacters] = useState([])
  const location = useLocation()

  // const char = characters
  const onSearch = async (id) => {

    const find = characters.find((character) => character.id === +id);
    console.log('find ', find);
    if (find) return window.alert("¡Este personaje ya fue agregado!");
    
    // axios(`https://rickandmortyapi.com/api/character/${id}`)
    axios(`http://localhost:3001/rickandmorty/character/${id}`)
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
  const login = (data) => {
    console.log(data);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      
        {location.pathname !== "/" && <Nav onSearch={onSearch} characters={characters} />}
        {/* <Cards characters={characters} onClose={onClose} /> */}
        <Routes >
          <Route path='/' element={<MyForm />} />
          <Route path='/home' element={<Cards characters={characters} onClose={onClose} />} />
          <Route path='/about' element={<About />} />
          <Route path="/myfavorites" element={<MyFavorites/>}/>
          <Route path='/details/:id' element={<Details />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      
    </DndProvider >
  );
}

export default App;
