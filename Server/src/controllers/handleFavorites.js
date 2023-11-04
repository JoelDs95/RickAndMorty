let myFavorites = []


const postFav = (req, res) => {
  myFavorites.push(req.body) 
  return res.status(200).json(myFavorites) 
}

const deleteFav = (req, res) => {
  const { id } = req.params 
  const deleteChars = myFavorites.filter((chars) => {
    return chars.id !== Number(id) && chars.id !== id
  })
  myFavorites = deleteChars 
  return res.status(200).json(myFavorites) 
}

module.exports = { postFav, deleteFav }