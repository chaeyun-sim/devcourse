const { StatusCodes } = require('http-status-codes');
const conn = require('../config/connection');

const addLike = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const connection = await conn();
    const result = await connection.query(
      'INSERT INTO likes (user_id, liked_book_id) VALUES(?, ?)',
      [userId, id]
    );

    if (!result) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    return res.statsu(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const removeLike = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await conn();
    const result = await connection.query(
      'DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?',
      [userId, id]
    );

    if (!result) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    return res.statsu(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

module.exports = {
  addLike,
  removeLike,
};
