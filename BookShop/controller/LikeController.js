const { StatusCodes } = require('http-status-codes');
const conn = require('../config/connection');
import dotenv from 'dotenv';

dotenv.config();

const addLike = async (req, res) => {
  const bookId = req.params.id;

  try {
    const connection = await conn();
    const result = await connection.query(
      'INSERT INTO likes (user_id, liked_book_id) VALUES(?, ?)',
      [ensureAuthorization(req).id, bookId]
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
  const bookId = req.params.id;

  try {
    const connection = await conn();
    const result = await connection.query(
      'DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?',
      [ensureAuthorization(req).id, bookId]
    );

    if (!result) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    return res.statsu(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

function ensureAuthorization(req) {
  const receivedJwt = req.headers(['authorization']);
  const decodedJwt = jwt.vercify(receivedJwt, process.env.PRIVATE_TOKEN_KEY);
  return decodedJwt;
}

module.exports = {
  addLike,
  removeLike,
};
