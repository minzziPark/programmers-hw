const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const allBooks = (req, res) => {
  const { new_category, limit, currPage } = req.query;
  let sql, offSet;
  if (new_category)
    sql =
      "SELECT * FROM books JOIN category ON books.category_id = category.id WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
  else sql = "SELECT * FROM books";
  if (limit && currPage) {
    offSet = parseInt(limit) * (parseInt(currPage) - 1);
    sql += ` LIMIT ${limit} OFFSET ${offSet}`;
  }
  conn.query(sql, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();
    return res.status(StatusCodes.OK).json(results);
  });
};

const bookDetail = (req, res) => {
  let id = req.params.bookId;
  id = parseInt(id);
  let sql =
    "SELECT * FROM books LEFT JOIN category ON books.category_id = category.id WHERE books.id=?";
  conn.query(sql, id, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();
    if (results[0]) return res.status(StatusCodes.OK).json(results[0]);
    else return res.status(StatusCodes.NOT_FOUND).end();
  });
};

const booksByCategory = (req, res, next) => {
  const { category_id, news, limit, currPage } = req.query;
  let sql;
  if (!category_id) return next();
  if (news) {
    sql =
      "SELECT * FROM books JOIN category ON books.category_id = category.id WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
  } else {
    sql = "SELECT * FROM books WHERE category_id = ?";
  }
  if (limit && currPage) {
    offSet = parseInt(limit) * (parseInt(currPage) - 1);
    sql += ` LIMIT ${limit} OFFSET ${offSet}`;
  }
  conn.query(sql, category_id, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();
    if (results.length) return res.status(StatusCodes.OK).json(results);
    else return res.status(StatusCodes.NOT_FOUND).end();
  });
};

module.exports = { allBooks, bookDetail, booksByCategory };
