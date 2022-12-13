const comList = document.querySelectorAll("#com ul li");
const playerList = document.querySelectorAll("#player ul li");

function image() {
  const num = Math.floor(Math.random() * 3);
  comList.forEach(function (item, idx) {
    if (idx === num) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

playerList.forEach(function (item, idx) {
  item.addEventListener("click", function () {
    clearInterval(clearImage);
  });
});

//setInterval(image, 100);
const clearImage = setInterval(image, 100);
