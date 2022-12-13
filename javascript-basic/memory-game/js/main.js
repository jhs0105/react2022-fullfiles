Array.prototype.shuffle = function () {
  for (let i = 0; i < this.length; i++) {
    let selected = Math.floor(Math.random() * this.length);
    let temp = this[i];
    this[i] = this[selected];
    this[selected] = temp;
  }
  return this;
};

const memorys = [
  { idx: 0, title: "mouse", img: "images/12jisin/mouse.svg" },
  { idx: 1, title: "cow", img: "images/12jisin/cow.svg" },
  { idx: 2, title: "tiger", img: "images/12jisin/tiger.svg" },
  { idx: 3, title: "rabbit", img: "images/12jisin/rabbit.svg" },
  { idx: 4, title: "dragon", img: "images/12jisin/dragon.svg" },
  { idx: 5, title: "snake", img: "images/12jisin/snake.svg" },
  { idx: 6, title: "horse", img: "images/12jisin/horse.svg" },
  { idx: 7, title: "sheep", img: "images/12jisin/sheep.svg" },
  { idx: 8, title: "monkey", img: "images/12jisin/monkey.svg" },
  { idx: 9, title: "chicken", img: "images/12jisin/chicken.svg" },
  { idx: 10, title: "dog", img: "images/12jisin/dog.svg" },
  { idx: 11, title: "pig", img: "images/12jisin/pig.svg" },
];
const main = document.querySelector("#main");

function restart() {
  main.innerHTML = "";
  const doubleMemorys = [...memorys, ...memorys].shuffle(); //랜덤으로 24개가 생긴다
  //배열을 섞어 보세요.

  // for (let i = 0; i < doubleMemorys.length; i++) {
  //   let selected = Math.floor(Math.random() * doubleMemorys.length);
  //   let temp = doubleMemorys[i];
  //   doubleMemorys[i] = doubleMemorys[selected];
  //   doubleMemorys[selected] = temp;
  // }
  console.log(doubleMemorys);

  const ul = document.createElement("ul");

  doubleMemorys.forEach(function (item, idx) {
    //console.log(item);
    const li = document.createElement("li");
    // const div = document.createElement("div");
    // div.classList.add("front");
    // li.appendChild(div);
    // ul.appendChild(li);
    li.innerHTML = `
  <div class="card on" data-idx="${item.idx}">
    <div class="front face">
      <img src="${item.img}" alt="">
      <p>${item.title}</p>
    </div>
    <div class="back face"></div>
  </div>`;
    ul.appendChild(li);
  });
  main.appendChild(ul);
  const items = document.querySelectorAll("#main ul li");
  let score = 0;
  const end = memorys.length;
  let clearIdx01 = null;
  const selectedCards = [];
  let clearIdx02 = null;

  items.forEach(function (item, idx) {
    item.addEventListener("click", function () {
      const card = this.querySelector(".card");
      if (card.classList.contains("on")) {
        //on을 가지고 있으면
        return; //빠져나온다.
      }
      card.classList.add("on");
      selectedCards.push(card);
      console.log(selectedCards);
      // firstCard = card.dataset.idx;
      // console.log(firstCard);
      clearTimeout(clearIdx01);
      if (selectedCards.length >= 2) {
        console.log("두번 누름");
        document.body.classList.add("blocking");
        if (selectedCards[0].dataset.idx === selectedCards[1].dataset.idx) {
          console.log("딩동댕");
          score++;
          //console.log(score, "===", end);
          clearIdx01 = setTimeout(function () {
            selectedCards.splice(0, 2);
            document.body.classList.remove("blocking");
          }, 500);
          if (score >= end) {
            console.log("end");
            cover.classList.add("on");
          }
        } else {
          console.log("땡");
          clearIdx02 = setTimeout(function () {
            selectedCards[0].classList.remove("on");
            selectedCards[1].classList.remove("on");
            document.body.classList.remove("blocking");
            selectedCards.splice(0, 2);
          }, 500);
        }
      }
    });
  });
  setTimeout(function () {
    items.forEach(function (item, idex) {
      const card = item.querySelector(".card");
      card.classList.remove("on");
    });
  }, 3000);
  cover.classList.remove("on");
}

const cover = document.querySelector("#cover");
const btnRestart = cover.querySelector("#btnRestart");

//게임 시작했을 때 외울 수 있게 3초 동안 열어두기
btnRestart.addEventListener("click", function () {
  restart();
});

restart();
//다 맞추면 끝나게끔. console.log("end") 점수 올려서 다 되면 끝나게끔!
