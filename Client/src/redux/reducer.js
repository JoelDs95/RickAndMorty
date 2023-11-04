import { ADD_FAV, FILTER, ORDER, REMOVE_FAV } from './actions-types';

const initialState = {
  myFavorites: [],
  allCharacters: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAV:
      const newCharacter = action.payload;
      if (!state.myFavorites.some((fav) => fav.id === newCharacter.id)) {
        return {
          ...state,
          myFavorites: [...state.myFavorites, newCharacter],
        };
      }
      return state; // No hagas ningún cambio si el personaje ya está en favoritos

    case REMOVE_FAV:
      return {
        ...state,
        myFavorites: state.myFavorites.filter((fav) => fav.id !== Number(action.id)),
      };

    case FILTER:
      return {
        ...state,
        myFavorites: state.allCharacters.filter(
          (character) => character.gender === action.payload
        ),
      };

    case ORDER:
      const sortedAllCharacters = [...state.allCharacters].sort((a, b) =>
        action.payload === "A" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
      return {
        ...state,
        myFavorites: sortedAllCharacters,
      };

    default:
      return state;
  }
};

export default rootReducer;

