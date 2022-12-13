let num = 10;
let name = "장동건";
let people = {
  name: "장성호",
  age: 20,
  say: function () {
    console.log(this.name + "안녕");
  },
};
console.log(people.say()); //people이라는 객체 안의 함수를 불러옴/ object안의 함수를 매서드라고 한다.
console.log(people.name);

let fox = {
  //객체를 지정하는 것은 여러 값을 한번에 지정할 수 있어서, 영역을 지정해서 묶기에 요긴하다.
  height: 100,
  weight: 20,
};

let calculator = {
  plus(a, b) {
    return a + b + 10;
  },
  minus(a, b) {
    return a - b - 10;
  },
};
//객체안에 메서드는 function을 생략하고 쓰기도 한다.

let calc = {
  plus: function (a, b) {
    return a + b + 100;
  },
};

function plus(a, b) {
  return a + b;
}
function minus(a, b) {
  return a - b;
}

//console.log(console);
console.log(people);

console.log(plus(10, 20));
console.log(calculator.plus(10, 20));

//oop: 객체지향하는 프로그램
