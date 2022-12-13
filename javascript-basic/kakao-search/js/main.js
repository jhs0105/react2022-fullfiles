async function kakaoSeach(query, category) {
  try {
    const response = await fetch(`http://dapi.kakao.com/v2/search/${category}?query=${query}`, {
      headers: {
        Authorization: "KakaoAK cc7a9b2c03cb9485f1c322879e061e58",
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}

const searchWord = document.querySelector("#search-word");
searchWord.addEventListener("keyup", function (e) {
  console.log(searchWord.value);
  //console.log(e); e.keyCode => 엔터친거
  if (e.keyCode === 13) {
    info("image");
  }
});

function info(type) {
  kakaoSeach(searchWord.value, type).then(function (response) {
    //console.log(response);
    const main = document.querySelector("#main");
    main.innerHTML = "";
    const ul = document.createElement("ul");
    main.appendChild(ul);
    const documents = response.documents;
    documents.forEach(function (item, idx) {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${item.image_url}" data-fancybox="gallery"><img src=${item.thumbnail_url}></a>`;
      ul.appendChild(li);
    });
    gsap.from("#main ul li", { scale: 0, stagger: { each: 0.01 } });
  });
}

// kakaoImageSeach("전지현").then(function (response) {
//   //console.log(response);
//   const main = document.querySelector("#main");
//   main.innerHTML = "";
//   const ul = document.createElement("ul");
//   main.appendChild(ul);
//   const documents = response.documents;
//   documents.forEach(function (item, idx) {
//     const li = document.createElement("li");
//     li.innerHTML = `<img src=${item.thumbnail_url}>`;
//     ul.appendChild(li);
//   });
// });

const radios = document.querySelectorAll("#radio-box input");
radios.forEach(function (item, idx) {
  item.addEventListener("change", function () {
    const category = this.getAttribute("id");
    if (category === "image") {
      kakaoSeach(searchWord.value, "image").then(function (response) {
        //console.log(response);
        const main = document.querySelector("#main");
        main.innerHTML = "";
        const ul = document.createElement("ul");
        main.appendChild(ul);
        const documents = response.documents;
        documents.forEach(function (item, idx) {
          const li = document.createElement("li");
          li.innerHTML = `<a href="${item.image_url}" data-fancybox="gallery"><img src=${item.thumbnail_url}></a>`;
          ul.appendChild(li);
        });
        gsap.from("#main ul li", { scale: 0, stagger: { each: 0.01 } });
      });
    } else if (category === "vclip") {
      kakaoSeach(searchWord.value, "vclip").then(function (response) {
        //console.log(response);
        const main = document.querySelector("#main");
        main.innerHTML = "";
        const ul = document.createElement("ul");
        main.appendChild(ul);
        const documents = response.documents;
        documents.forEach(function (item, idx) {
          const li = document.createElement("li");
          li.innerHTML = `<a href="${item.url}" data-fancybox="gallery"><img src=${item.thumbnail}></a>`;
          ul.appendChild(li);
        });
        gsap.from("#main ul li", { scale: 0, stagger: { each: 0.01 } });
      });
    }
  });
});
