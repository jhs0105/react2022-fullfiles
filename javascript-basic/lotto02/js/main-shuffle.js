//배열의 복제

let a = 10;
let b = a;
b = 20;
console.log(a, "===", b);

//기본형, 원시(primitive type)과 자료형, 참조형(reference type)
//기본형: 숫자, 문자, boolean(true, false), null, undefined
//기본형은 값을 할당받는다.

//참조형 데이터는 array, object

//배열은 참조를 한다. 메모리 주소를 할당. 안의 내용은 모른다.(참조형)
//tempB에 tempA의 주소를 할당받았기에 B의 데이터가 바뀌면 A도 바뀐다.
//즉, A와 B의 주소가 같다.
let tempA = [1, 2, 3];
let tempB = tempA;
tempB.push(4);
tempA.push(5);
console.log(tempB);
console.log(tempA); //A도 바뀌게 된다...
console.log(tempA === tempB);

let jjang = { name: "장성호", age: 20 };
let sungho = jjang;
jjang.name = "장동건";
console.log(sungho.name);

let fruit = ["apple", "kiwi", "banana"];
let myFruit = [...fruit];
//spread연산자: 앞에 dot을 찍어주면 흩뿌려준다. 이렇게 되면 참조가 아닌 복제가 되는 것이다. shallow copy: 얕게 복사해주는 것.
myFruit.push("grape");
console.log(fruit);
//myFruit에는 grape가 없다. 같은 주소를 할당하는게 아님.

let jjang02 = { name: "장성호02", age: 30 };
let sungho02 = { ...jjang02 };
console.log(jjang02 === sungho02); //내용은 달라도 주소가 다르다. 그래서 false가 뜬다.
jjang02.name = "장동건";
console.log(sungho02.name);
console.log(jjang02.name);

//예전엔 spread연산자 대신 slice 혹은 concat을 썼음
let arr01 = [1, 2, 3];
let copyArr01 = arr01.slice(); //arr01.concat()
//혹은 필요한 부분 카피할려면: slice(0,1)
copyArr01.push(100);
console.log(arr01, "!==", copyArr01);

//map을 사용한 또 다른 방법
let animals = ["lion", "tiger", "cat"];
let copyAnimals = animals.map(function (item, idx) {
  return "robot-" + item;
}); //map은 따로 반복안해도 된다. //map은 단순 복제보다 새로운걸 wrapping할때 사용한다.
let copyArr02 = arr01.map(function (item) {
  return item * 2;
});
let copyArr03 = arr01.map((item, idx) => item * 2); //한줄일때 이렇게 변경 가능.

console.log(copyAnimals);
console.log(copyArr02);

//filter
let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let oddNums = nums.filter(function (item, idx) {
  return item % 2 === 1; //2로 나누었을때 나머지가 1인 홀수가 return된다.
});
let evenNums = nums.filter(function (item, idx) {
  return item % 2 === 0;
});
console.log(oddNums);
console.log(evenNums);

//ecma2015 es6
//ecma2016 es7 //프로그램언어가 계속 추가되며 발전

//배열섞기
let num01 = 10;
let num02 = 20;
let temp = num01;
num01 = num02;
num02 = temp;
console.log(num01, num02);

//temp라는 임시 변수가 필요하다.

let arr04 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (let i = 0; i < 10; i++) {
  let selected = Math.floor(Math.random() * arr04.length);
  temp = arr04[i];
  arr04[i] = arr04[selected];
  arr04[selected] = temp;
}
console.log(arr04);

let nums02 = Array(45)
  .fill()
  .map(function (item, idx) {
    return idx + 1;
  });

console.log(nums02);
