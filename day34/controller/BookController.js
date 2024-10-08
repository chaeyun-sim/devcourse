const conn = require('../config/connection');
const { StatusCodes } = require('http-status-codes');

const getBooks = async (req, res) => {
  const { categoryId, new_prods, limit, currentPage } = req.query;
  const offset = limit * (currentPage - 1);

  try {
    const connection = await conn();
    let query = 'SELECT * FROM books';
    let params = [];

    if (categoryId || new_prods) {
      query += ' WHERE';
      if (categoryId) {
        query += ' category_id = ?';
        params.push(Number(categoryId));
      }
      if (new_prods) {
        if (categoryId) query += ' AND';
        query += ' pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()';
      }
    }

    query += ' LIMIT ? OFFSET ?';
    params.push(Number(limit), offset);

    const result = await connection.query(query, params);

    if (!result.length) return res.status(StatusCodes.NOT_FOUND).end();
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const singleBook = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await conn();
    const result = await connection.query('SELECT * FROM books WHERE id = ?', id);
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

module.exports = {
  getBooks,
  singleBook,
};
