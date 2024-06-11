// 함수 선언문
function foo1() {
  console.log("foo");
}

// 함수 표현식
const foo2 = function () {
  console.log("foo");
};

// Function 생성자 함수
const foo3 = new Function("console.log('foo')");

// 화살표 함수
const foo4 = () => {
  console.log("foo");
};
