const connection = require('../config/connection');
const { StatusCodes } = require('http-status-codes');

const addToCart = async (req, res) => {
  const { bookId, quantity, userId } = req.body;

  try {
    const conn = await connection();
    const result = await conn.query(
      'INSERT INTO cartItems (book_id, user_id, quantity) VALUES(?, ?, ?)',
      [bookId, userId, quantity]
    );

    if (!result.length) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

const getCartItem = async (req, res) => {
  const { userId, selected } = req.body;

  try {
    const conn = await connection();
    const result = await conn.query(
      `
				SELECT cartItems.id, book_id, title, summary, quantity, price
				FROM cartItems LEFT JOIN books
				ON cartItems.book_id = books.id
				WHERE user_id = ? AND id IN (?)
			`,
      [userId, ...selected]
    );

    if (!result.length) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

const removeCartItem = async (req, res) => {
  const { id } = req.params;

  try {
    const conn = await connection();
    const result = await conn.query('DELETE from cartItems WHERE id = ?', id);

    if (!result.length) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

module.exports = {
  addToCart,
  getCartItem,
  removeCartItem,
};
