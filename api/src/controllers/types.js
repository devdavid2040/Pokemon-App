const { Type } = require("../db");

const getTypes = async (req, res, next) => {
  try {
    const dbResponse = await Type.findAll();
    return dbResponse.length
      ? res.status(200).send(dbResponse)
      : res.status(400).send("Types not found");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTypes,
};
