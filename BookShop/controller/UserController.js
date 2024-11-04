const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-code');
const crypto = require('crypto');

const join = async (req, res) => {
  const { name, email, password } = req.body;

  const salt = crypto.randomBytes(64).toString('base64');
  const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');

  const conn = await pool.getConnection();
  await conn.query(
    'INSERT INTO users (name, email, password, salt) VALUES(?, ?, ?)',
    [name, email, hashPassword, salt],
    (err, results) => {
      if (err) return res.status(StatusCodes.BAD_REQUEST).json({ message: '회원가입 실패' });
      return res.status(StatusCodes.CREATED).json(results);
    }
  );
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const conn = await pool.getConnection();
  await conn.query('SELECT * FROM users WHERE email = ?', email, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).json({ message: '로그인 실패' });

    const loginUser = results[0];
    const hashPassword = crypto
      .pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512')
      .toString('base64');

    if (loginUser && loginUser.password === hashPassword) {
      const token = jwt.sign(
        {
          id: loginUser.id,
          email: loginUser.email,
          name: loginUser.name,
        },
        process.env.PRIVATE_TOKEN_KEY,
        {
          expiresIn: '5m',
          issuer: 'songa',
        }
      );

      res.cookie('token', token, {
        httpOnly: true,
      });

      return res.status(StatusCodes.OK).json(token);
    }
    return res.status(StatusCodes.UNAUTHORIZED).json(token);
  });
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  const conn = await pool.getConnection();
  await conn.query('SELECT * FROM users WHERE email = ?', email, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();

    const user = results[0];
    if (user) {
      return res.status(StatusCodes.OK).end();
    }
    return res.status(StatusCodes.UNAUTHORIZED).end();
  });
};

const passwordReset = async (req, res) => {
  const { email, password } = req.body;

  const salt = crypto.randomBytes(64).toString('base64');
  const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

  const conn = await pool.getConnection();
  await conn.query(
    'UPDATE users SET password = ? WHERE email = ?',
    [hashPassword, email, salt],
    (err, results) => {
      if (err) return res.status(StatusCodes.BAD_REQUEST).end();

      if (!results.affectedRows) {
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      return res.status(StatusCodes.OK).json(results);
    }
  );
};

module.exports = {
  join,
  login,
  requestPasswordReset,
  passwordReset,
};
