const search = document.querySelector("#search");
const transBox = document.querySelector("#trans-box");
search.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    const searchWord = this.value; //function을 =>바꿀씨 this대신에 e.currentTarget.value 를 써야 한다.
    fetch(`papago/${searchWord}`)
      .then((response) => response.json()) //call back을 화살표 함수로 고치면서 return이 생략된 구조
      .then((response) => {
        //console.log(response);
        console.log(response.message.result.translatedText);
        transBox.textContent = response.message.result.translatedText;
      });
  }
});
