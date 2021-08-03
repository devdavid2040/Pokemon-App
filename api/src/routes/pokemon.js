const router = require("express").Router();
const postPokemon = require("../controllers/pokemon");

router.post("/", postPokemon);

module.exports = router;
