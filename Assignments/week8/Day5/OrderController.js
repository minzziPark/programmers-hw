// const conn = require("../mariadb");
const mariadb = require("mysql2/promise");
const { StatusCodes } = require("http-status-codes");

const order = async (req, res) => {
  const conn = await mariadb.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "Bookshop",
    dataStrings: true,
  });

  const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } =
    req.body;

  // delivery 데이터 추가
  let sql =
    "INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)";
  let value = [delivery.address, delivery.receiver, delivery.contact];
  let [results] = await conn.execute(sql, value);
  let delivery_id = results.insertId;

  // orders 데이터 추가
  sql =
    "INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)";
  value = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
  [results] = await conn.execute(sql, value);
  let order_id = results.insertId;

  // items을 가지고 장바구니에서 book_id, quantity 조회
  sql = "SELECT book_id, quantity FROM cartItems WHERE id IN (?)";
  let [orderItems, fields] = await conn.query(sql, [items]);
  console.log(orderItems);
  // orderedBook 데이터 추가
  value = [];
  orderItems.forEach((item) => {
    value.push([order_id, item.book_id, item.quantity]);
  });
  console.log(value);
  sql = "INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?";
  [results] = await conn.query(sql, [value]);
  deleteCartItems(conn, items);
  return res.status(StatusCodes.OK).json(results);
};

const deleteCartItems = async (conn, items) => {
  let sql = `DELETE FROM cartItems WHERE id IN (?)`;
  let result = await conn.query(sql, [items]);
  return result;
};

const getOrders = async (req, res) => {
  const { user_id } = req.body;
  const conn = await mariadb.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "Bookshop",
    dataStrings: true,
  });

  let sql = `SELECT orders.id, created_at, delivery.address, delivery.receiver, 
							delivery.contact , book_title, total_quantity, total_price
							FROM orders
							JOIN delivery ON orders.delivery_id = delivery.id
							WHERE user_id = ?`;
  let [rows, fields] = await conn.query(sql, user_id);
  return res.status(StatusCodes.OK).json(rows);
};

const getOrderDetail = async (req, res) => {
  const conn = await mariadb.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "Bookshop",
    dataStrings: true,
  });

  let { orderId } = req.params;
  let sql = `SELECT book_id, title, author, price, quantity FROM orderedBook JOIN books ON books.id = orderedBook.book_id WHERE orderedBook.order_id = ?`;

  let [rows, fields] = await conn.query(sql, orderId);
  return res.status(StatusCodes.OK).json(rows);
};

module.exports = {
  order,
  getOrders,
  getOrderDetail,
};
