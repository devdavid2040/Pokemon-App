const { Type } = require("../db");

const getTypes = async (req, res, next) => {
  try {
    const dbResponse = await Type.findAll();
    return res.status(200).send(dbResponse);
  } catch (error) {
    next(error);
  }
};

module.exports = getTypes;
