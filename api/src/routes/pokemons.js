const router = require("express").Router();
const { getPokemons, getPokemonDetail } = require("../controllers/pokemons");

router.get("/", getPokemons);
router.get("/:id", getPokemonDetail);

module.exports = router;
