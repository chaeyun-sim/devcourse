const { StatusCodes } = require('http-status-codes');
const conn = require('../config/connection');

const allCategory = async (req, res) => {
  try {
    const connection = await conn();
    const result = await connection.query('SELECT * FROM category');

    if (!result) return res.status(StatusCodes.BAD_REQUEST).end();
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    return res.statsu(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

module.exports = {
  allCategory,
};
