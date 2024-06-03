const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const addLike = (req, res) => {
  const liked_book_id = req.params.bookId;
  const { user_id } = req.body;

  let sql = "INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)";
  const value = [user_id, liked_book_id];
  conn.query(sql, value, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();
    return res.status(StatusCodes.OK).end();
  });
};

const removeLike = (req, res) => {
  const liked_book_id = req.params.bookId;
  const { user_id } = req.body;
  const value = [user_id, liked_book_id];
  let sql = "DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?";

  conn.query(sql, value, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();
    return res.status(StatusCodes.OK).end();
  });
};

module.exports = { addLike, removeLike };
