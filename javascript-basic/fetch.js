/*
fetch("http://dapi.kakao.com/v2/search/image?query=전지현", {
  headers: {
    Authorization: "KakaoAK cc7a9b2c03cb9485f1c322879e061e58",
  },
}).then(function (response) {
  const json = response.json();
  json.then(function (response) {
    console.log(response);
  });
});
*/

/*
fetch("http://dapi.kakao.com/v2/search/image?query=전지현", {
  headers: {
    Authorization: "KakaoAK cc7a9b2c03cb9485f1c322879e061e58",
  },
})
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
  });
*/

//await를 씀으로 fetch의 데이터, 결과를 기다려 준다.
async function kakaoImageSeach(query) {
  const response = await fetch(`http://dapi.kakao.com/v2/search/image?query=${query}`, {
    headers: {
      Authorization: "KakaoAK cc7a9b2c03cb9485f1c322879e061e58",
    },
  });
  const json = await response.json();
  return json;
}

kakaoImageSeach("전지현").then(function (response) {
  console.log(response);
});
