const axios = require("axios");
const { Pokemon, Type } = require("../db");

const upperFirst = (str) => {
  return str[0].toUpperCase() + str.substr(1).toLowerCase();
};

// Get 40 pokemons from PokeAPI
const getApiPokemons = async () => {
  try {
    const arrRequests = [];
    const arrResults = [];
    for (let i = 1; i < 41; i++) {
      arrRequests.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
    }
    await axios.all(arrRequests).then(
      axios.spread((...responses) => {
        for (let response of responses) {
          arrResults.push(response.data);
        }
      })
    );
    const results = arrResults.map((elem) => {
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
    // First 40 pokemons
    const allPokemons = await getAllPokemons();
    
    // Search by name
    if (name) {
      const dbPokemons = await getDbPokemons();
      const apiResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      const results = dbPokemons.concat(apiResponse)
      results.filter((elem) => {
        return elem.name.toLowerCase().includes(name.toLowerCase());
      })
      const pokemonName = await allPokemons.filter((elem) => {
        return elem.name.toLowerCase().includes(name.toLowerCase());
      });
      return pokemonName.length
        ? res.status(200).send(pokemonName)
        : res.status(400).send("Pokemon not found");
    } else {
      return res.status(200).send(allPokemons);
    }
  } catch (error) {
    next(error);
  }
};

// return {
//   id: elem.id,
//   name: upperFirst(elem.name),
//   attack: elem.stats.find((elem) => elem.stat.name === "attack").base_stat,
//   defense: elem.stats.find((elem) => elem.stat.name === "defense").base_stat,
//   speed: elem.stats.find((elem) => elem.stat.name === "speed").base_stat,
//   height: elem.height,
//   weight: elem.weight,
//   image: elem.sprites.other.dream_world.front_default,
//   type: elem.types.map((elem) => upperFirst(elem.type.name)),
// };

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
