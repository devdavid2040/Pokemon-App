const router = require("express").Router();
const {
  getPokemons,
  getPokemonDetail,
  postPokemon,
} = require("../controllers/pokemons");

router.get("/", getPokemons);
router.get("/:id", getPokemonDetail);
router.post("/", postPokemon);

module.exports = router;
