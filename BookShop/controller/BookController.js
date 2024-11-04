const { ensureAuthorization } = require('../auth');
const connection = require('../config/connection');
const { StatusCodes } = require('http-status-codes');

const getBooks = async (req, res) => {
  const allBooksRes = {};

  const { categoryId, new_prods, limit, currentPage } = req.query;
  const offset = limit * (currentPage - 1);

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
    let query =
      'SELECT *, (SELECT count(*) FROM likes WHERE books.id = liked_book_id) AS likes FROM books';

    if (categoryId || new_prods) {
      query += ' WHERE';
      if (categoryId) {
        query += ' category_id = ?';
        params = [Number(categoryId)];
      }
      if (new_prods) {
        if (categoryId) query += ' AND';
        query += ' pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()';
      }
    }

    query += ' LIMIT ? OFFSET ?';
    getRandomValues.push(parseInt(limit), offset);
    conn.query(sql, values, (err, results) => {
      if (err) console.log(err);

      if (results.length) {
        results.map(result => {
          result.pubDate = result.pub_date;
          delete result.pub_date;
        });
        allBooksRes.books = results;
      } else {
        return res.status(StatusCodes.NOT_FOUND).end();
      }
    });

    sql = 'SELECT found_rows()';
    conn.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      let pagination = {};
      pagination.currentPage = parseInt(currentPage);
      pagination.totalCount = results[0].found_rows();

      allBooksRes.pagination = pagination;

      return res.status(StatusCodes.OK).json(allBooksRes);
    });
  }
};

const singleBook = async (req, res) => {
  const bookId = req.params.id;

  const authorization = ensureAuthorization(req);

  if (authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세션이 만료되었습니다. 다시 로그인해주세요.',
    });
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '잘못된 토큰입니다.',
    });
  } else if (authorization instanceof ReferenceError) {
    const connection = await conn();
    const result = await connection.query(
      `SELECT *, (
        SELECT count(*) FROM likes
        WHERE liked_book_id = books.id
      ) AS likes
      FROM books LEFT JOIN category
      ON books.category_id = category.id
      WHERE books.id = ?`,
      [authorization.id, bookId, bookId]
    );
    if (!result.length) return res.status(StatusCodes.NOT_FOUND).end();
    return res.status(StatusCodes.OK).json(result);
  } else {
    const connection = await conn();
    const result = await connection.query(
      `SELECT *, (
        SELECT count(*) FROM likes
        WHERE liked_book_id = books.id
      ) AS likes, (
        SELECT EXISTS (
          SELECT * FROM likes WHERE user_id = ? AND liked_book_id = ?
        )
      ) AS liked
      FROM books LEFT JOIN category
      ON books.category_id = category.id
      WHERE books.id = ?`,
      [authorization.id, bookId, bookId]
    );
    if (!result.length) return res.status(StatusCodes.NOT_FOUND).end();
    return res.status(StatusCodes.OK).json(result);
  }
};

module.exports = {
  getBooks,
  singleBook,
};
