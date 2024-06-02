const express = require("express");
const {
  addToCart,
  getCartItems,
  removeCartItems,
  buyItems,
} = require("../controller/CartController");
const router = express.Router();

router.use(express.json());

// 장바구니 담기
router.post("/", addToCart);

// 장바구니 조회 / 선택된 장바구니 아이템 목록 조회
router.get("/", getCartItems);

// 장바구니 도서 제거
router.delete("/:id", removeCartItems);

module.exports = router;
