const { ensureAuthorization } = require('../auth');
const { StatusCodes } = require('http-status-codes');
const conn = require('../config/connection');

const allCategory = async (req, res) => {
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
    const connection = await conn();
    const result = await connection.query('SELECT * FROM category');

    if (!result) return res.status(StatusCodes.BAD_REQUEST).end();
    return res.status(StatusCodes.OK).json(result);
  }
};

module.exports = {
  allCategory,
};
