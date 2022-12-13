//jquery없이 쓸 수 있는 함수(ajax)
//const result = fetch(`https://jsonplaceholder.typicode.com/posts/10`);
//fetch하면 결과 값이 promise이다.

//console.log(result);
/*
result.then(function (response) {
  const json = response.json(); //json으로 값을 받는...
  console.log(json); //결과 값이 promise니깐 또 .then을 사용
  json.then(function (response) {
    const userId = response.userId;
    const userJson = fetch(`https://jsonplaceholder.typicode.com/userId/${userId}`);
    userJson.then(function (response) {
      const userInfoJson = response.json();
      userInfoJson.then(function (response) {
        console.log(response);
      });
    });
  });
});
*/

//함수 앞에 async를 붙이면 그 안에서 await를 쓸 수 있다. (promise 리턴 .then을 붙여서 사용!)

//비동기의 동기화 (fetch이런건 언제 데이터가 떨어질지 모르니깐 await으로 기다리는!!)
async function findUserName(postId) {
  const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  const post = await postResponse.json();
  console.log("post===", post);
  const userId = post.userId;
  const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  const user = await userResponse.json();
  console.log("user===", user);
  return user.name;
}

findUserName(2).then(function (resolve, reject) {
  console.log(resolve);
});
