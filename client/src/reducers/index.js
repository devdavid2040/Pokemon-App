import {
  GET_POKEMONS,
  GET_TYPES,
  GET_BY_NAME,
  GET_DETAIL,
  POST_POKEMON,
  ORDER_BY_NAME,
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
      return {
        ...state,
        types: action.payload,
      };

    case GET_BY_NAME:
      return {
        ...state,
        pokemons: action.payload,
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
    case ORDER_BY_NAME:
      let arr =
        action.payload === "asc"
          ? state.pokemons.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.pokemons.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        pokemons: arr,
      };

    case FILTER_BY_TYPE:
      const allPokemons = state.allPokemons;
      const typeFilter =
        action.payload === "all"
          ? allPokemons
          : allPokemons.filter((elem) => elem.type.includes(action.payload));
      return {
        ...state,
        pokemons: typeFilter,
      };

    case FILTER_CREATED:
      const allPokemonsCreated = state.allPokemons;
      const createdFilter =
        action.payload === "created"
          ? allPokemonsCreated.filter((elem) => elem.createdInDb)
          : allPokemonsCreated.filter((elem) => !elem.createdInDb);
          
      return {
        ...state,
        pokemons: createdFilter,
      };

    default:
      return state;
  }
};

export default rootReducer;
