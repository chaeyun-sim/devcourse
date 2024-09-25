const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const { validate } = require('../utils/validate');
const { NotFound } = require('../utils/notFound');

router.use(express.json());

const notFound = new NotFound('채널 정보를 찾을 수 없습니다.');

const channelRoute = router.route('/');

channelRoute
  .get([body('userId').notEmpty().isInt().withMessage('숫자 입력 필요'), validate], (req, res) => {
    const { userId } = req.body;

    query({
      sql: 'SELECT * FROM channels WHERE user_id = ?',
      values: userId,
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
  })
  .post(
    [
      body('userId').notEmpty().isInt().withMessage('숫자 입력 필요'),
      body('channelTitle').notEmpty().isString().withMessage('문자 입력 필요'),
      validate,
    ],
    (req, res) => {
      const err = validationResult(req);

      if (!err.isEmpty()) {
        return res.status(400).json(err.array());
      }

      const { channelTitle, userId } = req.body;

      query({
        sql: 'INSERT INTO channels (channelTitle, user_id) VALUES(? , ?)',
        values: [channelTitle, userId],
        callBack: (err, results) => {
          if (results.length) {
            res.status(201).json(results);
          } else {
            notFound.send(res);
          }
        },
      });
    }
  );

const singleRoute = router.route('/:id');

// 개별 수정
singleRoute
  .get([param('id').notEmpty().withMessage('채널 아이디 필요'), validate], (req, res) => {
    const err = validationResult(req);

    if (!err.isEmpty()) {
      return res.status(400).json(err.array());
    }

    let { id } = req.params;

    query({
      sql: 'SELECT * FROM channels WHERE id = ?',
      values: id,
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
  })
  .put(
    [
      param('id').notEmpty().withMessage('채널 아이디 필요'),
      body('name').notEmpty().isString().withMessage('채널명 필요'),
      validate,
    ],
    (req, res) => {
      const err = validationResult(req);

      if (!err.isEmpty()) {
        return res.status(400).json(err.array());
      }

      const { channelTitle } = req.body;
      let { id } = req.params;

      query({
        sql: 'UPDATE channels SET channelTitle = ? WHERE id = ?',
        values: [channelTitle, id],
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
  .delete([param('id').notEmpty().withMessage('채널 아이디 필요'), validate], (req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    query({
      sql: 'DELETE FROM channels WHERE id = ?',
      values: [id],
      callBack: (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Database error', error: err });
        }
        if (results.affectedRows) {
          res.status(200).json(results);
        } else {
          notFound.send(res);
        }
      },
    });
  });

module.exports = router;
