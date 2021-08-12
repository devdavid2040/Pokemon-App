import {
  GET_POKEMONS,
  GET_TYPES,
  GET_BY_NAME,
  GET_DETAIL,
  POST_POKEMON,
  ORDER_BY_NAME,
  ORDER_BY_ATTACK,
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
      const pokemons =
        state.pokemons.length === 40 ? state.pokemons : action.payload;
      return {
        ...state,
        allPokemons: action.payload,
        pokemons: pokemons,
      };

    case GET_TYPES:
      const types = state.types.length ? state.types : action.payload;
      return {
        ...state,
        types: types,
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
      const orderByName =
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
        pokemons: orderByName,
      };

    case ORDER_BY_ATTACK:
      const orderByAttack =
        action.payload === "min"
          ? state.pokemons.sort((a, b) => a.attack - b.attack)
          : state.pokemons.sort((a, b) => b.attack - a.attack);
      return {
        ...state,
        pokemons: orderByAttack,
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
      const allPokemonsCreated = state.allPokemons;
      let createdFilter;
      if (action.payload === "all") {
        createdFilter = allPokemonsCreated;
      }
      if (action.payload === "created") {
        createdFilter = allPokemonsCreated.filter((elem) => elem.createdInDb);
      }
      if (action.payload === "api") {
        createdFilter = allPokemonsCreated.filter((elem) => !elem.createdInDb);
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

const filter = (state, option) => {
  const allPokemons = state.allPokemons;
  const filteredPokemons = state.pokemons;
  const typesRender = filteredPokemons
    .map(({ types }) => types)
    .flat()
    .map(({ name }) => name);

  if (state.pokemons.length < state.allPokemons.length) {
    if (option === "allTypes") {
      return !filteredPokemons.length
        ? (filteredPokemons[0] = null)
        : filteredPokemons;
    }
    if (typesRender.includes(option)) {
      const results = filteredPokemons.filter(({ types }) => {
        return types.find(({ name }) => name === option);
      });
      return !results.length ? (results[0] = null) : results;
    }
  } else {
    return allPokemons;
  }
};
