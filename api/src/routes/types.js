const router = require("express").Router();
const getTypes = require("../controllers/types");

router.get("/", getTypes);

module.exports = router;
