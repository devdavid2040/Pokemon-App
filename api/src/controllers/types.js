const { Type } = require("../db");
const { upperFirst } = require("../utils/index");
const axios = require("axios");

const getTypes = async (req, res, next) => {
  try {
    const dbResponse = await Type.findAll();
    if (dbResponse.length) {
      return res.status(200).send(dbResponse);
    } else {
      try {
        const { data } = await axios.get("https://pokeapi.co/api/v2/type");
        const arrTypes = data.results
          .map(({ name }) => {
            return { name: upperFirst(name) };
          })
          .sort((a, b) => {
            if (a.name < b.name) return -1;
            if (b.name < a.name) return 1;
            return 0;
          });
        await Type.bulkCreate(arrTypes);
      } catch (error) {
        console.log(error);
      }
      const types = await Type.findAll();
      return types.length
        ? res.status(200).send(types)
        : res.status(400).send("Types not found");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTypes,
};
