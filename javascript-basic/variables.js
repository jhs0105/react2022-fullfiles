// console.log(puppy);
//var변수는 포이스팅이 된다. 그래서 var변수는 잘 안쓴다. let이나 const를 쓴다.
// var puppy = "cute";
// console.log(puppy);

// const puppy = "cute"; //let과 다르게 const는 선언과 동시에 값을 할당해야 한다. 또한 const는 상수이기에 값을 바꿀 수가 없다.
// puppy = "pretty";
// puppy = 10;
// console.log(puppy);

let puppy = "active";
{
  let puppy = "cute";
  //puppy = "pretty";
} //assignment 할당한다.
console.log(puppy);
//변수는 영역을 가진다.
//let, const는 block scope를 가지고 있다. 대부분 block scope다.

var cat = "앙칼지다";
{
  var cat = "미쳐 날뛴다.";
}
console.log(cat);
//var는 블럭을 무시한다. 그래서 미쳐 날뛴다가 나온다...
//var는 function scope다.

function makeCat() {
  var fcat = "나는 function 고양이";
}
//console.log(fcat);

//함수 선언문 fuction declation
function plus() {
  console.log("나는 죽어서 10을 남길거다");
  return 10;
  console.log("return 밑에 있어서 출력되지 않습니다");
}
console.log(plus()); //함수 호출을 해야 실행된다.

//함수가 실행되고 나서 값을 남길때는 return을 쓰면 된다.
function parent() {
  console.log("안녕 애들아..");
  return 1000000000;
}

//클로져 -프론트엔드 면접질문으로 많이 나온댜!
//변수의 은닉성 때문에 만들어 쓴다.
function outer() {
  var a = "A";
  var b = "B";
  function inner() {
    var a = "AA";
    console.log(b);
  }
  //inner();
  //console.log(a);
  return inner;
}
var outerFunc = outer();
outerFunc();

function outer02(name = "unname") {
  //name:매개변수라고 한다.
  let say = name + "안녕";
  return function () {
    //익명함수(이름이 없는 함수)
    return say;
  };
  //console.log(say);
}
say01 = outer02("장성호");
console.log(say01());
