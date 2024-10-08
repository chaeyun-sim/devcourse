const express = require('express');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const cartsRouter = require('./routes/carts');
const likesRouter = require('./routes/likes');
const ordersRouter = require('./routes/orders');
const categoryRouter = require('./routes/category');
const dotenv = require('dotenv');
const pool = require('./config/db');

const app = express();

async function testDbConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('Successfully connected to the database.');
    // const rows = await conn.query('SELECT * FROM books');
    // console.log('Query result:', rows);
  } catch (err) {
    console.error('Database connection error:', err);
  } finally {
    if (conn) conn.release();
  }
}

testDbConnection();

dotenv.config();

app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/category', categoryRouter);
app.use('/carts', cartsRouter);
app.use('/likes', likesRouter);
app.use('/orders', ordersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
