import axios from "axios";
import * as types from "../types/pokemonTypes";

export const getPokemons = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.GET_POKEMONS_REQUEST });
      const { data, status } = await axios("/pokemons");
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
      const { data } = await axios("/types");
      return dispatch({ type: types.GET_TYPES, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getByName = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/pokemons?name=${name}`);
      return dispatch({ type: types.GET_BY_NAME, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/pokemons/${id}`);
      return dispatch({ type: types.GET_DETAIL, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postPokemon = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/pokemons", payload);
      if (response?.status === 200) {
        dispatch({ type: types.POST_POKEMON });
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const order = (payload) => ({
  type: types.ORDER,
  payload,
});

export const filterByType = (payload) => ({
  type: types.FILTER_BY_TYPE,
  payload,
});

export const filterCreated = (payload) => ({
  type: types.FILTER_CREATED,
  payload,
});
