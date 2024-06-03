const express = require("express");
const { addLike, removeLike } = require("../controller/likeController");
const router = express.Router();

router.use(express.json());

router.post("/:bookId", addLike); // 좋아요 추가
router.delete("/:bookId", removeLike); // 좋아요 취소

module.exports = router;
