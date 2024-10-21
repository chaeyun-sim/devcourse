/*
1. 자바스크립트 함수는 함수의 실제 매개변수가 될 수 있다.
2. 자바스크립트 함수는 함수의 반환 값이 될 수 있다.
3. 자바스크립트 함수는 할당 명령문의 대상이 될 수 있다.
4. 자바스크립트 함수는 동일비교의 대상이 될 수 있다.
*/

// 1.
function foo(arg) {
  arg();
}

function bar() {
  console.log('bar');
}

foo(bar);

// 2.
function foo1(arg) {
  return arg;
}

function bar1() {
  console.log('bar');
}

foo1(bar1)();

// 3.
const foo2 = function (arg) {
  return arg;
};

console.log(foo2(1));

/*
1. 기본값 매개변수 default function parameter
2. 나머지 매개변수 Rest parameter
3. arguments 객체
*/

// 1.
function foo3(arg = 'foo3') {
  console.log(arg);
}

foo3();

// 2.
function foo4(arg, ...rest) {
  console.log(rest);
}

foo4(1, 2, 3, 4, 5);

// 3.
function foo5(arg) {
  console.log(arguments);
}

foo5(1, 2, 3, 4);

/*
1. 함수 선언문
2. 함수 표현식
3. Function 생성자 함수
4. 화살표 함수 표현식
*/

// 1.
function foo6() {
  console.log('foo6');
}

// 2.
const foo7 = function () {
  console.log('foo7');
};

// 3.
const foo8 = new Function('x', 'y', 'return x + y');

// 4.
const foo9 = () => console.log('foo9');

/*
1. IIFE (즉시 실행 함수)
2. 재귀함수
3. 중첩함수
4. 콜백함수
*/

// 1.
(function foo10() {
  console.log('foo10');
})();

// 2.
function foo11(arg) {
  if (arg === 5) return;
  console.log(arg);
  foo11(arg + 1);
}

foo11(0);

// 3.
function foo12(arg) {
  function bar2() {
    console.log(arg);
  }
  bar2();
}

foo12('foo12');

// 4.
