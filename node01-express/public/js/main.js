/*
fetch("https://openapi.naver.com/v1/search/movie.json?query=한산", {
  headers: {
    "X-Naver-Client-Id": "JauRkU1TSKf6gDNDRJ__",
    "X-Naver-Client-Secret": "w5KHjY2dZ8",
  },
}).then((response) => {
  const json = response.json();
  json.then((response) => {
    console.log(response);
  });
});
*/

const search = document.querySelector("#search");
const main = document.querySelector("#main");

search.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    const ul = document.createElement("ul");
    main.innerHTML = "";
    const searchWord = this.value; //function을 =>바꿀씨 this대신에 e.currentTarget.value 를 써야 한다.
    fetch(`movie02/${searchWord}`)
      .then((response) => response.json()) //call back을 화살표 함수로 고치면서 return이 생략된 구조
      .then((response) => {
        console.log(response);
        response.items.forEach(function (item, idx) {
          //console.log(item);
          const li = document.createElement("li");
          li.innerHTML = `<a href="${item.link}" target="_blank">
                          <img src="${item.image}" alt="">
                          <div class="info-box"><h3>${item.title}</h3>
                          <p>${item.actor}</p></div>
                        </a>`;
          ul.appendChild(li);
        });
        main.appendChild(ul);
      });
    search.value = "";
  }
});

//this 는 누가 호출하느냐에 따라 값이 바뀐다.
