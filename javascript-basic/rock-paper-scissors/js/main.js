//console.log("hello");
// const people = {
//   name: "kiredfs d",
//   say() {
//     console.log("aa");
//   },
// };
// people.say();

//console.log(document);

//배열은 규칙이 없는 것에 번호 매기기(순서대로 나열하기)
const fruits = ["apple", "banana", "kiwi", "pear"]; //배열

fruits.push("peach"); //push는 뒤로 들어가는 것
fruits.unshift("cherry"); //앞으로 들어가는 것
console.log(fruits);
fruits.shift(); //앞에서 제거
console.log(fruits);
fruits.pop(); //뒤에서 제거 되는 것
console.log(fruits);
//배열에 데이터 넣을때, 뒤에서 넣어주는 것이 좋다. unshift는 잘 안쓴다.
const total = fruits.length; //속성. length는 함수가 아니다.
for (let i = 0; i < total; i++) {
  console.log(fruits[i]);
}
function callBack() {
  console.log("나는 말 그대로 나중에 호출됩니다.");
}
callBack(); //함수 실행
(function callBack() {
  console.log("나는 말 그대로 나중에 호출됩니다.");
})(); //이렇게도 실행할 수 있다. '즉시실행함수' = 'IIFE' 라고 한다. 한번 쓰고 더이상 실행안할때 이렇게 쓰기도 한다.

(function (name) {
  console.log(name + "나는 말 그대로 나중에 호출됩니다.");
})("장성호:"); //이름없는 익명함수! 이며 이렇게 호출할 수 있다

fruits.forEach(callBack); //이렇게 써야 4번 출력이된다.

// fruits.forEach(function () {
//   console.log("나는 누가 호출 해주나...");
// });

fruits.forEach(function (item, idx) {
  console.log(idx, "===", item); //item은 배열의 값. 순서가 필요하면 idx/ forEach를 쓰면 길이를 안찾아도 된다.
});

const comList = document.querySelectorAll("#com ul li");
const playerList = document.querySelectorAll("#player ul li");
const result = document.querySelector("#result ul");
const cover = document.querySelector("#cover");
const resultTxt = cover.querySelector("h1 strong");
const btnRestart = cover.querySelector("#btnRestart");

//resultTxt.textContent="lose";
let random = 0;
let gameCount = 0;
let clearComChoice = 0;
let clearReset = 0;
let winCount = 0;
let drawCound = 0;
let loseCount = 0;
console.log(comList); //유사배열일뿐, 진짜 배열이 아니다. 그래서 push를 못쓴다. pseudo array
//comList.push("aaa");

function playerChoice() {
  playerList.forEach(function (item, idx) {
    item.addEventListener("click", function () {
      gameCount++;

      document.body.classList.add("blocking");
      clearInterval(clearComChoice);
      //console.log(idx);
      //console.log(this.dataset.id);
      //숫자가 같으면 비긴거.
      //이것을때 0===1, 1===2, 2===0
      // == 숫자형태의 문자 "0", "1", "2" 값만 비교해준다. 0 = "0" type casting
      //=== 값과 타입 다 같이 비교한다.
      //const selectedId = Number(this.dataset.id); //이렇게 쓰면 형변환이 된다.
      const selectedId = parseInt(this.dataset.id);
      //console.log(random, "====", selectedId);
      decide(selectedId, random); //리팩토링 <코드 다듬는 과정

      //setTimeout(함수, 시간);
      // clearReset = setTimeout(function () {
      //   console.log("나는 바로 실행되지 않고 1초뒤에 한번만 실행된다");
      //   clearComChoice = setInterval(comChoice, 20);
      //   document.body.classList.remove("blocking");
      // }, 1000);

      restartFunc();
      if (gameCount >= 3) {
        cover.classList.add("on");
        clearInterval(clearComChoice);
        clearTimeout(clearReset);
        //조건달아보기
        if (drawCound >= 3 || (winCount === 1 && loseCount === 1 && drawCound === 1)) {
          resultTxt.textContent = "Draw";
        } else if (winCount >= 2 || (winCount === 1 && drawCound === 2)) {
          resultTxt.textContent = "Win";
        } else {
          resultTxt.textContent = "Lose";
        }
      }
    });
  });
}

function decide(playerNum, comNum) {
  const li = document.createElement("li");

  //매개변수가 생김!
  if (playerNum === comNum) {
    li.textContent = "D";
    li.classList.add("draw");
    drawCound++;
    //console.log("draw");
    //result.innerHTML += `<li class="draw">D</li>`;
    //result.append(`<li class="draw">D</li>`);
  } else if ((comNum === 0 && playerNum === 1) || (comNum === 1 && playerNum === 2) || (comNum === 2 && playerNum === 0)) {
    li.textContent = "W";
    li.classList.add("win");
    winCount++;
    //console.log("win");
    //result.innerHTML += `<li class="win">W</li>`;
    //result.append(`<li class="win">W</li>`);
  } else {
    li.textContent = "L";
    li.classList.add("lose");
    loseCount++;
    //console.log("lose");
    //result.innerHTML += `<li class="lose">L</li>`;
    //result.append(`<li class="lose">L</li>`);
  }
  result.append(li);
}

//console.log(parseInt("12", 8));
//console.log(parseFloat("12.5"));

//console.log(Math.random()); //0~1사이의 실수가 나온다. 소수점 16째자리까지..

function comChoice() {
  random = Math.floor(Math.random() * 3);
  //0<random<1 -> 0 < random*3 < 1*3
  //console.log(random);
  comList.forEach(function (item, idx) {
    if (idx === random) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
    //삼항연산자..
    //idx === random ? (item.style.display = "block") : (item.style.display = "none");
  });
}

//setInterval(cb, timer); setInterval은 나중에 호출된다.
//자바스크립트는 비동기적으로 동작한다. 순서를 타지 않는다.

//setInterval(comChoice, 1000); //1초에 한번 호출해주는 것

//comChoice();

btnRestart.addEventListener("click", restart);

function restart() {
  cover.classList.remove("on");
  gameCount = 0;
  winCount = 0;
  loseCount = 0;
  drawCound = 0;
  result.innerHTML = "";
  restartFunc();
}

function restartFunc() {
  clearReset = setTimeout(function () {
    console.log("나는 바로 실행되지 않고 1초뒤에 한번만 실행된다");
    clearComChoice = setInterval(comChoice, 20);
    document.body.classList.remove("blocking");
  }, 1000);
}

playerChoice();
restart();
//clearComChoice = setInterval(comChoice, 20);
//console.log(clearComChoice);
//clearInterval(clearComChoice); //멈춘다.
