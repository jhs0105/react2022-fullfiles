//대기열(queue)

setInterval(function () {
  console.log("aaa");
}, 1000);
setTimeout(function () {
  console.log("l");
}, 1000);
console.log(2);
//console먼저 실행되고 대기열을 부른다.
//자바스크립트는 비동기적으로 실행된다. 순차적 진행을 하지 않는다.
//이것을 event loop라고 한다. setTimeout, setInterval 이 대기열...나중에 실행된다.
