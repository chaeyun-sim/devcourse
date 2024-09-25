const express = require('express');
const router = express.Router();
import { NotFound } from '../utils/notFound';
import { query } from '../utils/query';
const { body, validationResult, param } = require('express-validator');
const { validate } = require('../utils/validate');

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.use(express.json());

const notFound = new NotFound('사용자 정보를 찾을 수 없습니다.');

// 로그인
router.post(
  '/login',
  [
    body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
    body('pw').notEmpty().isString().withMessage('비밀번호 확인 필요'),
    validate,
  ],
  function (req, res) {
    const { email, pw } = req.body;

    query({
      sql: `SELECT * FROM users WHERE email = ?`,
      values: email,
      callBack: (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Database error', error: err });
        }
        let loginUser = results[0];
        if (loginUser) {
          if (loginUser.password === pw) {
            const token = jwt.sign(
              {
                email: loginUser.email,
                name: loginUser.name,
              },
              process.env.PRIVATE_KEY,
              {
                expiresIn: '1h',
                issuer: 'chaeyun',
              }
            );

            res.cookie('token', token, {
              httpOnly: true,
            });

            res.status(200).json({
              message: `${loginUser.name}님, 로그인 되었습니다.`,
            });
          } else {
            res.status(401).json({
              message: '아이디 또는 비밀번호가 일치하지 않습니다.',
            });
          }
        } else {
          notFound.send(res);
        }
      },
    });
  }
);

// 회원 가입
router.post(
  '/join',
  [
    body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
    body('name').notEmpty().isString().withMessage('이름 확인 필요'),
    body('pwd').notEmpty().isString().withMessage('비밀번호 확인 필요'),
    body('contact').notEmpty().isString().withMessage('연락처 확인 필요'),
    validate,
  ],
  function (req, res) {
    if (req.body == {}) {
      res.status(400).json({
        message: '입력 값을 다시 확인해주세요.',
      });
    } else {
      const { email, name, pwd, contact } = req.body;

      query({
        sql: `INSERT INTO users (email, name, password, contact) VALUES(?, ?, ?, ?)`,
        values: [email, name, pwd, contact],
        callBack: (err, results) => {
          if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
          }
          if (results) {
            res.status(201).json(results);
          } else {
            res.status(409).json({
              message: '이미 존재하는 아이디입니다.',
            });
          }
        },
      });
    }
  }
);

const singleRoute = router.route('/users');

singleRoute
  .get(
    [body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'), validate],
    function (req, res) {
      const { email } = req.body;

      query({
        sql: 'SELECT * FROM `users` WHERE email = ?',
        values: email,
        callBack: (err, results) => {
          if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
          }
          if (results.length) {
            res.status(200).json(results);
          } else {
            notFound.send(res);
          }
        },
      });
    }
  )
  .delete(
    [body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'), validate],
    function (req, res) {
      let { email } = req.body;

      query({
        sql: `DELETE FROM users WHERE email = ?`,
        values: email,
        callBack: (err, results) => {
          if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
          }
          if (results) {
            res.json({ message: `${results.name}님, 탈퇴되었습니다.` });
          } else {
            notFound.send(res);
          }
        },
      });
    }
  );

module.exports = router;
