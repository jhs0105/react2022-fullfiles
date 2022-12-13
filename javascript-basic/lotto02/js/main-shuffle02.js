Math.floor(Math.random() * 45); //0~45

const result = document.querySelector("#result");
const radios = document.querySelectorAll(".radio");
const colors = ["yellow", "blue", "red", "grey", "green"];

//중복제거하는 1번째 방법 (펼쳐놓고 듬성듬성 뽑기)
// const nums = [];
// for (let i = 0; i < 45; i++) {
//   nums.push(i + 1);
// }

//iteration:순환...

const nums = Array(45)
  .fill()
  .map(function (arr, idx) {
    //console.log(idx);
    return idx + 1;
  });

function makeLotto() {
  const ul = document.createElement("ul");
  result.appendChild(ul);

  const copyNums = [...nums];
  copyNums.shuffle();

  // for (let i = 0; i < copyNums.length; i++) {
  //   let selected = Math.floor(Math.random() * copyNums.length);
  //   let temp = copyNums[i];
  //   copyNums[i] = copyNums[selected];
  //   copyNums[selected] = temp;
  // }
  // console.log(copyNums);

  const selectedNums = copyNums.splice(0, 6);
  selectedNums.sort(compare);
  selectedNums.forEach(function (item, idx) {
    const li = document.createElement("li");
    //li.classList.add("yellow");
    li.textContent = item;
    li.classList.add(colors[Math.ceil(item / 10) - 1]);

    /*
  if (item >= 1 && item <= 10) {
    //li.classList.add("yellow");
    li.classList.add(colors[0]);
  } else if (11 <= item && item <= 20) {
    //li.classList.add("blue");
    li.classList.add(colors[1]);
  } else if (21 <= item && item <= 30) {
    //li.classList.add("red");
    li.classList.add(colors[2]);
  } else if (31 <= item && item <= 40) {
    //li.classList.add("grey");
    li.classList.add(colors[3]);
  } else {
    //li.classList.add("green");
    li.classList.add(colors[4]);
  } 
  */

    ul.appendChild(li);
  });
}

radios.forEach(function (item, idx) {
  item.addEventListener("change", function () {
    console.log(idx);
    result.innerHTML = "";
    for (let i = 0; i < idx + 1; i++) {
      makeLotto();
    }
  });
});

function compare(a, b) {
  return a - b;
}

// console.log(nums);
// console.log(selectedNums);
// console.log(selectedNums.sort(compare));

// const animals = ["cat", "puppy", "tiger"];
// console.log(animals.splice(0, 1)[0]); //splice는 도려내는 것이다.
// console.log(animals);

//shuffle이라는 메서드를 만들겠다...라는 의미
Array.prototype.shuffle = function () {
  for (let i = 0; i < this.length; i++) {
    let selected = Math.floor(Math.random() * this.length);
    let temp = this[i];
    this[i] = this[selected];
    this[selected] = temp;
  }
  return this;
};

const arr = ["양효정", "이가영", "박아영", "심지혜", "신태식"];
console.log(arr.shuffle());
