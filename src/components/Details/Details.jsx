import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Details = () => {
  const [character, setCharacter] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios(`https://rickandmortyapi.com/api/character/${id}`)
      .then(({ data }) => {
        if (data.name) {
          setCharacter("data");
        } else {
          window.alert("¡No hay personajes con este ID!");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });

    return setCharacter({});
  }, [id]);

  return <div>Details</div>;
};

export default Details;
