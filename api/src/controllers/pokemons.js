const axios = require("axios");
const { Pokemon, Type } = require("../db");
const { setPokemon, getDbPokemons, getAllPokemons } = require("../utils/index");

// GET /pokemons & GET /pokemons?name={name}
const getPokemons = async (req, res, next) => {
  const { name } = req.query;
  try {
    if (name) {
      const dbPokemons = await getDbPokemons().catch((error) => {
        console.log(error);
      });
      const apiPokemon = await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
        .then((response) => setPokemon(response.data))
        .catch((error) => console.log(error));
      const allPokemons = apiPokemon
        ? dbPokemons.concat(apiPokemon)
        : dbPokemons;
      const results = allPokemons.filter((elem) => {
        return elem.name.toLowerCase().includes(name.toLowerCase());
      });
      return results.length
        ? res.status(200).send(results)
        : res.status(400).send("Pokemon not found");
    } else {
      const allPokemons = await getAllPokemons().catch((error) => {
        console.log(error);
      });
      return allPokemons
        ? res.status(200).send(allPokemons)
        : res.status(400).send("Error. Please, refresh the page");
    }
  } catch (error) {
    next(error);
  }
};

const getPokemonDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (id) {
      if (/^([0-9])*$/.test(id)) {
        const apiPokemon = await axios
          .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
          .then((response) => setPokemon(response.data))
          .catch((error) => console.log(error));
        return apiPokemon
          ? res.status(200).send(apiPokemon)
          : res.status(400).send("Insert a valid ID");
      } else {
        const dbPokemon = await Pokemon.findByPk(id, {
          include: {
            model: Type,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        });
        return dbPokemon
          ? res.status(200).send(dbPokemon)
          : res.status(400).send("Insert a valid ID");
      }
    }
  } catch (error) {
    next(error);
  }
};

// POST /pokemons

const postPokemon = async (req, res, next) => {
  const { name, hp, attack, defense, speed, height, weight, image, types } =
    req.body;
  console.log(req.body);
  try {
    const pokemonCreated = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image: image !== "" ? image : undefined,
    });
    const typeDb = await Type.findAll({
      where: { name: types },
    });
    await pokemonCreated.addType(typeDb);
    return res.status(200).send("Pokemon successfully created");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPokemons,
  getPokemonDetail,
  postPokemon,
};
