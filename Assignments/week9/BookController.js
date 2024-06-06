const getUserId = require("../auth"); // 인증 모듚
const jwt = require("jsonwebtoken");
const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const allBooks = (req, res) => {
  let allBooksRes = {};
  const { new_category, limit, currPage } = req.query;
  let sql, offSet;
  if (new_category)
    sql =
      "SELECT SQL_CALC_FOUND_ROWS *, (SELECT COUNT(*) FROM likes WHERE likes.liked_book_id=books.id) AS likes FROM books JOIN category ON books.category_id = category.id WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
  else
    sql =
      "SELECT SQL_CALC_FOUND_ROWS *, (SELECT COUNT(*) FROM likes WHERE likes.liked_book_id=books.id) AS likes FROM books";
  if (limit && currPage) {
    offSet = parseInt(limit) * (parseInt(currPage) - 1);
    sql += ` LIMIT ${limit} OFFSET ${offSet}`;
  }
  conn.query(sql, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();
    if (results.length) allBooksRes.books = results;
    else return res.status(StatusCodes.NOT_FOUND).end();
  });

  sql = "SELECT found_rows()";
  conn.query(sql, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();
    console.log(results);
    allBooksRes.pagination = {
      currentPage: parseInt(currPage),
      totalItems: results[0]["found_rows()"],
    };
    console.log(allBooksRes);
    return res.status(StatusCodes.OK).json(allBooksRes);
  });
};
