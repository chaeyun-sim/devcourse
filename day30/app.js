const express = require('express');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const cartsRouter = require('./routes/carts');
const likesRouter = require('./routes/likes');
const ordersRouter = require('./routes/orders');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/carts', cartsRouter);
app.use('/likes', likesRouter);
app.use('/orders', ordersRouter);

app.listen(process.env.PORT);
