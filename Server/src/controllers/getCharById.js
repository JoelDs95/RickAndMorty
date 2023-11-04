const axios = require("axios");
const URL = "https://rickandmortyapi.com/api/character/";

const getCharById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios(`${URL}${id}`);
    const { name, status, species, gender, origin, image } = response.data;

    const character = { id, name, status, species, gender, origin, image };

    return character.name
      ? res.status(200).json(character)
      : res.status(404).send("Not Found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
module.exports = { getCharById };
