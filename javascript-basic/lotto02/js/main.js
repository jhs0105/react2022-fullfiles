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

function makeLotto() {
  const ul = document.createElement("ul");
  result.appendChild(ul);
  const nums = Array(45)
    .fill()
    .map(function (arr, idx) {
      //console.log(idx);
      return idx + 1;
    });

  //console.log(nums);
  const selectedNums = [];
  for (let i = 0; i < 6; i++) {
    const selected = Math.floor(Math.random() * nums.length);
    selectedNums.push(nums.splice(selected, 1).pop());
  }
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

console.log(nums);
console.log(selectedNums);
console.log(selectedNums.sort(compare));

// const animals = ["cat", "puppy", "tiger"];
// console.log(animals.splice(0, 1)[0]); //splice는 도려내는 것이다.
// console.log(animals);
