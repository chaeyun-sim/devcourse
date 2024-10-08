const express = require('express');
const router = express.Router();

router.use(express.json());

router.post('/:id', (req, res) => {
  const { id } = req.params;
  res.json('좋아요 추가');
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json('좋아요 삭제');
});

module.exports = router;
