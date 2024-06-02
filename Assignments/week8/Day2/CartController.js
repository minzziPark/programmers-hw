const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const addToCart = (req, res) => {
  const { book_id, quantity, user_id } = req.body;
  let sql =
    "INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?)";
  const value = [book_id, quantity, user_id];

  conn.query(sql, value, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();
    return res.status(StatusCodes.OK).end();
  });
};

const getCartItems = (req, res) => {
  const { user_id, selected } = req.body;
  let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price 
							FROM cartItems 
							JOIN books ON cartItems.book_id = books.id
							WHERE user_id = ? AND cartItems.id IN (?)`;
  console.log(sql);
  const value = [user_id, selected];
  conn.query(sql, value, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();
    return res.status(StatusCodes.OK).json(results);
  });
};

const removeCartItems = (req, res) => {
  const { id } = req.params;
  let sql = "DELETE FROM cartItems WHERE id = ?";
  conn.query(sql, id, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();
    return res.status(StatusCodes.OK).end();
  });
};

module.exports = { addToCart, getCartItems, removeCartItems };
