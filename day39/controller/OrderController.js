const { StatusCodes } = require('http-status-codes');
const connection = require('../config/connection');

const order = async (req, res) => {
  const conn = await connection();
  const {
    delivery: { address, receiver, contact },
    firstBookTitle,
    totalQuantity,
    totalPrice,
    userId,
    items,
  } = req.body;

  const deliveryResult = await conn.query(
    'INSERT INTO delivery (address, receiver, contact) VALUES(?, ?, ?)',
    [address, receiver, contact]
  );

  const orderResult = await conn.query(
    'INSERTT INTO orders (book_title, total_quantity, total_price, userId, delivery_id) VALUES (?, ?, ?, ?, ?)',
    [firstBookTitle, totalQuantity, totalPrice, userId, deliveryResult.insertId]
  );

  let orderedItems = await conn.query('SELECT book_id, quantity FROM cartItmes WHERE IN (?)', [
    items,
  ]);

  const values = [];
  orderedItems.forEach(item => values.push([orderResult.insertId, item.book_id, item.quantity]));

  await conn.query('INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?', [values]);

  const results = await deleteCartItems();

  return res.status(StatusCodes.OK).json(results);
};

const deleteCartItems = async conn => {
  const result = await conn.query('DELETE from cartItems WHERE id = ?', id);
  return result;
};

const getOrders = async (req, res) => {
  const conn = await connection();

  let result = await conn.query(
    'SELECT orders.id, created_at, address, book_title, total_quantity, total_price FROM orders LEFT JOIN delivery ON orders.delivery_id = delivery.id'
  );
  return res.status(StatusCodes.OK).json(result);
};

const getOrderDetail = async (req, res) => {
  const conn = await connection();
  const { id } = req.params;

  const result = await conn.query(
    'SELECT book_id, book_title, author, price, quantity FROM orderedBook LEFT JOIN books ON orderedBook.book_id = books.id WHERE order_id = ?',
    id
  );

  return res.status(StatusCodes.OK).json(result);
};

module.exports = {
  order,
  getOrders,
  getOrderDetail,
};
