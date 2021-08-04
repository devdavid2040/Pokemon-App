const axios = require("axios");
const { Pokemon, Type } = require("../db");

const upperFirst = (str) => {
  return str[0].toUpperCase() + str.substr(1).toLowerCase();
};

// Get 40 pokemons from PokeAPI
const getApiPokemons = async () => {
  try {
    const { data } = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=40"
    );
    const response = await axios.all(
      data.results.map(async ({ url }) => await axios.get(url))
    );
    const results = response
      .map((elem) => elem.data)
      .map((elem) => {
        return {
          id: elem.id,
          name: upperFirst(elem.name),
          image: elem.sprites.other.dream_world.front_default,
          type: elem.types.map((elem) => upperFirst(elem.type.name)),
        };
      });
    return results;
  } catch (error) {
    console.log(error);
  }
};

// Get pokemons created in database
const getDbPokemons = async () => {
  try {
    const response = await Pokemon.findAll({
      include: {
        model: Type,
        as: "type",
      },
    });
    const results = await response.map((elem) => {
      return {
        id: elem.id,
        name: elem.name,
        image: elem.image,
        type: elem.type.map((elem) => elem.name),
      };
    });
    return results;
  } catch (error) {
    console.log(error);
  }
};

// Get 40 pokemons for Home page (API and DB)
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

// Route GET_POKEMONS
const getPokemons = async (req, res, next) => {
  const { name } = req.query;
  try {
    // Search by name
    if (name) {
      const dbPokemons = await getDbPokemons();
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      const pokemonFound = {
        id: data.id,
        name: upperFirst(data.name),
        attack: data.stats.find((elem) => elem.stat.name === "attack")
          .base_stat,
        defense: data.stats.find((elem) => elem.stat.name === "defense")
          .base_stat,
        speed: data.stats.find((elem) => elem.stat.name === "speed").base_stat,
        height: data.height,
        weight: data.weight,
        image: data.sprites.other.dream_world.front_default,
        type: data.types.map((elem) => upperFirst(elem.type.name)),
      };
      console.log(pokemonFound);
      const allResults = dbPokemons.concat(pokemonFound);
      const pokemon = allResults.filter((elem) => {
        return elem.name.toLowerCase().includes(name.toLowerCase());
      });
      return pokemon.length
        ? res.status(200).send(pokemon)
        : res.status(400).send("Pokemon not found");
    } else {
      // First 40 pokemons
      const allPokemons = await getAllPokemons();
      return res.status(200).send(allPokemons);
    }
  } catch (error) {
    next(error);
  }
};

const getPokemonDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const allPokemons = await getAllPokemons();
    if (id) {
      const pokemon = await allPokemons.find((elem) => {
        return elem.id === id;
      });
      return pokemon
        ? res.status(200).send(pokemon)
        : res.status(400).send("Pokemon not found");
    } else {
      return res.status(400).send("Insert a valid ID");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPokemons,
  getPokemonDetail,
};
