const { Pokemon, Type } = require("../db");

const postPokemon = async (req, res, next) => {
  const { name, hp, attack, defense, speed, height, weight, image, type } =
    req.body;
  try {
    const pokemonCreated = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
    });
    const typeDb = await Type.findAll({
      where: { name: type },
    });
    await pokemonCreated.addType(typeDb);
    return res.status(200).send("Pokemon successfully created");
  } catch (error) {
    next(error);
  }
};

module.exports = postPokemon;
