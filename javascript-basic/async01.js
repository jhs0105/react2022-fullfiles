async function myAsync() {
  //console.log("나는 함수안에서 실행되는 코드 입니다. 나는 죽으면서 async");
  return "async";
}
async function myAsync02() {
  return Promise.resolve("async");
}

//async안에는 await를 쓸 수 있다. async안에서만이다!
async function myAsync03() {
  const myPromise = new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("끝났다.");
    }, 1000);
  });
  const result = await myPromise;
  //async 다음에 await를 쓰면 대기 하는것.
  //(promise가 해결될때까지 기다렸다가 그 다음 코드 실행)
  console.log(result);
}
//에러 핸들링이 안됨...

//const msg = myAsync();
//console.log(msg);
//console.log(myAsync());

//console.log(myAsync());

//함수앞에 async를 붙이면 promise로 반응한다.
// myAsync02().then(function (result) {
//   console.log(result);
// });

myAsync03();
