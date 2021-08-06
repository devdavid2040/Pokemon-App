const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonsRouter = require("./pokemons");
const pokemonRouter = require("./pokemon");
const typesRouter = require("./types");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemons", pokemonsRouter);
router.use("/pokemon", pokemonRouter);
router.use("/types", typesRouter);

module.exports = router;