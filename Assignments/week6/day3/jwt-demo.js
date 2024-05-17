const jwt = require("jsonwebtoken");

// dotenv 모듈
const dotenv = require("dotenv");
dotenv.config();

// 토큰 발급
const token = jwt.sign(
  {
    name: "minji",
    age: 25,
  },
  process.env.PRIVATE_KEY,
  {
    // 유효기간 설정
    expiresIn: "30m",
    issuer: "minji",
  }
);

// token을 가지고 있는 쿠키를 응답으로 보내는 방법
// API를 호출하지 않기 때문에 res는 할당된 값이 없어 작동하지는 않음
res.cookie("token", token, {
  httpOnly: true,
});
