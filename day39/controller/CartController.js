const connection = require('../config/connection');
const { StatusCodes } = require('http-status-codes');
import jwt from 'jsonwebtoken';
const ensureAuthorization = require('../auth');

const addToCart = async (req, res) => {
  const { bookId, quantity } = req.body;

  const authorization = ensureAuthorization(req);

  if (authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세션이 만료되었습니다. 다시 로그인해주세요.',
    });
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '잘못된 토큰입니다.',
    });
  } else {
    const conn = await connection();
    const result = await conn.query(
      'INSERT INTO cartItems (book_id, user_id, quantity) VALUES(?, ?, ?)',
      [bookId, authorization.id, quantity]
    );

    if (!result.length) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(result);
  }
};

const getCartItem = async (req, res) => {
  const { selected } = req.body;

  const authorization = ensureAuthorization(req, res);

  if (authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세션이 만료되었습니다. 다시 로그인해주세요.',
    });
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '잘못된 토큰입니다.',
    });
  } else {
    const conn = await connection();
    const result = await conn.query(
      `
				SELECT cartItems.id, book_id, title, summary, quantity, price
				FROM cartItems LEFT JOIN books
				ON cartItems.book_id = books.id
				WHERE user_id = ? AND id IN (?)
			`,
      [authorization.id, ...selected]
    );

    if (!result.length) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(result);
  }
};

const removeCartItem = async (req, res) => {
  const cartItemId = req.params.id;

  const authorization = ensureAuthorization(req);

  if (authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세션이 만료되었습니다. 다시 로그인해주세요.',
    });
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '잘못된 토큰입니다.',
    });
  } else {
    const conn = await connection();
    const result = await conn.query('DELETE from cartItems WHERE id = ?', cartItemId);

    if (!result.length) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(result);
  }
};

module.exports = {
  addToCart,
  getCartItem,
  removeCartItem,
};
