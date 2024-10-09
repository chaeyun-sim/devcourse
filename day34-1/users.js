const express = require('express');
const pool = require('../config/db');

const {
  join,
  login,
  requestPasswordReset,
  passwordReset,
} = require('../controller/UserController');

const router = express.Router();
router.use(express.json());

router.post('/join', join);
router.post('/login', login);
router.post('/reset', requestPasswordReset);
router.put('/reset', passwordReset);

module.exports = router;
