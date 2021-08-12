const axios = require("axios");
const { Pokemon, Type } = require("../db");

const upperFirst = (str) => {
  return str[0].toUpperCase() + str.substr(1).toLowerCase();
};

const setPokemon = (data) => {
  return {
    id: data.id,
    name: upperFirst(data.name),
    hp: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    speed: data.stats[5].base_stat,
    height: data.height,
    weight: data.weight,
    image:
      data.sprites.other.dream_world.front_default ||
      data.sprites.other["official-artwork"].front_default,
    types: data.types.map(({ type }) => {
      return {
        name: upperFirst(type.name),
      };
    }),
  };
};

// Get 40 pokemons from pokeAPI
const getApiPokemons = async () => {
  try {
    const { data } = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=40"
    );
    const response = await axios.all(
      data.results.map(async ({ url }) => await axios.get(url))
    );
    const results = response
      .map(({ data }) => data)
      .map((elem) => setPokemon(elem));
    return results;
  } catch (error) {
    console.log(error);
  }
};

// Get all pokemons from DB
const getDbPokemons = async () => {
  try {
    const results = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return results;
  } catch (error) {
    console.log(error);
  }
};

// Concat pokemons from API and DB
const getAllPokemons = async () => {
  try {
    const apiResponse = await getApiPokemons();
    const dbResponse = await getDbPokemons();
    const results = dbResponse.concat(apiResponse).slice(0, 40);
    return results;
  } catch (error) {
    console.log(error);
  }
};

// Get Pokemon from API by name (exact match)
const getApiPokemonByName = async (name) => {
  try {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );
    const result = setPokemon(data);
    return result;
  } catch (error) {
    console.log(error);
  }
};

// Get Pokemon from API by ID
const getApiPokemonById = async (id) => {
  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const result = setPokemon(data);
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getDbPokemons,
  getAllPokemons,
  getApiPokemonByName,
  getApiPokemonById,
};
