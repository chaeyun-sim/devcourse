const express = require('express');
const { getBooks, singleBook } = require('../controller/BookController');
const router = express.Router();

router.use(express.json());

router.get('/', getBooks);
router.get('/:id', singleBook);

module.exports = router;
