import axios from "axios";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_DETAIL = "GET_DETAIL";
export const POST_POKEMON = "POST_POKEMON";
// Order and filter
export const ORDER = "ORDER";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_CREATED = "FILTER_CREATED";

const BASE_URL = "http://localhost:3001";

export const getPokemons = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${BASE_URL}/pokemons`);
      return dispatch({ type: GET_POKEMONS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTypes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${BASE_URL}/types`);
      return dispatch({ type: GET_TYPES, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getByName = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        `http://localhost:3001/pokemons?name=${name}`
      );
      return dispatch({ type: GET_BY_NAME, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`http://localhost:3001/pokemons/${id}`);
      return dispatch({ type: GET_DETAIL, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postPokemon = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/pokemons",
        payload
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

// Order and filters

export const order = (payload) => {
  return {
    type: ORDER,
    payload,
  };
};

export const filterByType = (payload) => {
  return {
    type: FILTER_BY_TYPE,
    payload,
  };
};

export const filterCreated = (payload) => {
  return {
    type: FILTER_CREATED,
    payload,
  };
};
