import { combineReducers } from "redux";
import pokemonsReducer from "./pokemonReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  pokemons: pokemonsReducer,
  error: errorReducer,
});
