//promise

/*
const myPromise = new Promise(function (resolve, reject) {
  //resolve("약속 지켰다.");
  setTimeout(function () {
    reject("오늘 기분이 별로야 다음에 만나");
  }, 3000);
});

myPromise
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    //로딩바
    console.log("약속을 지키든 안지키든 연락이라도 해줘...");
  });
*/

//promise는 서버 통신 할때 많이 쓴다.
//client === json
//오류 방지하기 위해 하는 것이다.

//순차적 작업할때도 많이 쓴다. 회원 1.회원인증, 2.글 보여주기...

function work(sec, callback) {
  setTimeout(function () {
    callback(new Date().toISOString()); //ISOString이 시간을 국제 시간으로 찍어주는 것
  }, sec);
}

//비동기를 동기적으로 실행할 때 ...callback hell 이라고 함.(가독성이 떨어짐)
/*
work(1000, function (result) {
  console.log("첫번째 작업", result);
  work(1000, function (result) {
    console.log("두번째 작업", result);
    work(1000, function (result) {
      console.log("세번째 작업", result);
    });
  });
});
*/

//ajax 할때 promise로 많이 해결. 혹은 async, await 를 사용.

function workPromise(sec) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(new Date().toISOString());
    }, sec);
  });
}
workPromise(1000)
  .then(function (result) {
    console.log("첫번째 작업", result);
    return workPromise(1000);
  })
  .then(function (result) {
    console.log("두번째", result);
    return workPromise(3000);
  })
  .then(function (result) {
    console.log("세번째", result);
    //return workPromise(1000);
  });
