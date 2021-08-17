import { order } from "../utils/index";
import {
  GET_POKEMONS,
  GET_TYPES,
  GET_BY_NAME,
  GET_DETAIL,
  POST_POKEMON,
  ORDER,
  FILTER_BY_TYPE,
  FILTER_CREATED,
} from "../actions/index";

const initialState = {
  allPokemons: [],
  pokemons: [],
  types: [],
  detail: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
        pokemons: action.payload,
      };

    case GET_TYPES:
      const types = state.types.length > 0 ? state.types : action.payload;
      return {
        ...state,
        types: types,
      };

    case GET_BY_NAME:
      const pokemonFound = !action.payload.length
        ? (action.payload[0] = null)
        : action.payload;
      return {
        ...state,
        pokemons: pokemonFound,
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case POST_POKEMON:
      return {
        ...state,
      };

    // Order and filter
    case ORDER:
      return {
        ...state,
        pokemons: order(state, action.payload),
      };

    case FILTER_BY_TYPE:
      const allPokemons = state.allPokemons;
      const typeFilter =
        action.payload === "allTypes"
          ? allPokemons
          : allPokemons.filter(({ types }) => {
              return types.find(({ name }) => name === action.payload);
            });
      return {
        ...state,
        pokemons: typeFilter,
      };

    case FILTER_CREATED:
      const allPokemonsFilter = state.allPokemons;
      let createdFilter;
      if (action.payload === "all") {
        createdFilter = allPokemonsFilter;
      }
      if (action.payload === "created") {
        createdFilter = allPokemonsFilter.filter((elem) => elem.createdInDb);
      }
      if (action.payload === "api") {
        createdFilter = allPokemonsFilter.filter((elem) => !elem.createdInDb);
      }
      return {
        ...state,
        pokemons: createdFilter,
      };

    default:
      return state;
  }
};

export default rootReducer;
