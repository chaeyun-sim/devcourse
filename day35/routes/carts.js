const express = require('express');
const { addToCart, removeCartItem, getCartItem } = require('../controller/CartController');
const router = express.Router();

router.use(express.json());

router.post('/', addToCart);
router.get('/', getCartItem);
router.delete('/:id', removeCartItem);

// router.get('/', (req, res) => {
//   res.json('장바구니의 주문 예상 상품 목록 조회');
// });

module.exports = router;
