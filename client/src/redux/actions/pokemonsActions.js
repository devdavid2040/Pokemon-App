import axios from "axios";
import * as types from "../types/pokemonTypes";

const BASE_URL = "http://localhost:3001";

export const getPokemons = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.GET_POKEMONS_REQUEST });
      const { data, status } = await axios(`${BASE_URL}/pokemons`);
      return status === 200
        ? dispatch({ type: types.GET_POKEMONS_SUCCESS, payload: data })
        : dispatch({ type: types.GET_POKEMONS_FAILED, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: types.GET_POKEMONS_FAILED, payload: error.message });
    }
  };
};

export const getTypes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${BASE_URL}/types`);
      return dispatch({ type: types.GET_TYPES, payload: data });
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
      return dispatch({ type: types.GET_BY_NAME, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`http://localhost:3001/pokemons/${id}`);
      return dispatch({ type: types.GET_DETAIL, payload: data });
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
    type: types.ORDER,
    payload,
  };
};

export const filterByType = (payload) => {
  return {
    type: types.FILTER_BY_TYPE,
    payload,
  };
};

export const filterCreated = (payload) => {
  return {
    type: types.FILTER_CREATED,
    payload,
  };
};
