const express = require("express");
const path = require("path");
//node의 기본모듈중에 path가 있다. 그에 따로 설치 안해도 된다.
const app = express();
//middle ware
app.use(express.static(path.join(__dirname, "/public"))); //정적파일들(css, image 등등)
//console.log(__dirname); //현재 폴더 잡아주는게 dirname이다.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/about", (req, res) => {
  //res.send("<h1>hello about</h1>");
  res.sendFile(path.join(__dirname, "/public/about.html"));
});
app.get("/portfolio", (req, res) => {
  //res.send("<h1>hello portfolio</h1>");
  res.sendFile(path.join(__dirname, "/public/portfolio.html"));
});
app.get("/api", (req, res) => {
  res.json({
    members: [
      { name: "장성호", grade: 10, address: "경기도 파주시" },
      { name: "양효정", grade: 1, address: "서울 영등포구" },
      { name: "이가영", grade: 1, address: "서울 종로구" },
      { name: "박아영", grade: 1, address: "서울 은평구" },
      { name: "심지혜", grade: 1, address: "경기도 고양시" },
      { name: "신태식", grade: 1, address: "경기도 수원시" },
    ],
  });
});
app.get("/board", (req, res) => {
  res.json({
    board: [
      { name: "장성호", grade: 10, address: "경기도 파주시", subject: "컴퓨터" },
      { name: "양효정", grade: 1, address: "서울 영등포구", subject: "컴퓨터" },
      { name: "이가영", grade: 1, address: "서울 종로구", subject: "컴퓨터" },
      { name: "박아영", grade: 1, address: "서울 은평구", subject: "컴퓨터" },
      { name: "심지혜", grade: 1, address: "경기도 고양시", subject: "컴퓨터" },
      { name: "신태식", grade: 1, address: "경기도 수원시", subject: "컴퓨터" },
    ],
  });
});
app.get("/movie02", (req, res) => {
  console.log(req.query.title);
  fetch(`https://openapi.naver.com/v1/search/movie.json?query=${req.query.title}`, {
    headers: {
      "X-Naver-Client-Id": "JauRkU1TSKf6gDNDRJ__",
      "X-Naver-Client-Secret": "w5KHjY2dZ8",
    },
  })
    .then((response) => response.json()) //call back을 화살표 함수로 고치면서 return이 생략된 구조
    .then((response) => {
      //console.log(response);
      res.json(response);
    });
});
app.get("/movie02/:title", (req, res) => {
  console.log(req.params.title);
  fetch(`https://openapi.naver.com/v1/search/movie.json?query=${req.params.title}`, {
    headers: {
      "X-Naver-Client-Id": "JauRkU1TSKf6gDNDRJ__",
      "X-Naver-Client-Secret": "w5KHjY2dZ8",
    },
  })
    .then((response) => response.json()) //call back을 화살표 함수로 고치면서 return이 생략된 구조
    .then((response) => {
      //console.log(response);
      res.json(response);
    });
});
app.get("/papago/:words", (req, res) => {
  fetch(`https://openapi.naver.com/v1/papago/n2mt`, {
    method: "POST",
    headers: {
      "X-Naver-Client-Id": "JauRkU1TSKf6gDNDRJ__",
      "X-Naver-Client-Secret": "w5KHjY2dZ8",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      source: "ko",
      target: "en",
      text: req.params.words,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      res.json(response);
    });
});

app.get("/trans", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/trans.html"));
});

app.get("/contact", (req, res) => {
  //res.send("<h1>hello contact</h1>");
  res.sendFile(path.join(__dirname, "/public/contact.html"));
});
app.get("/search", (req, res) => {
  //res.send("<h1>hello contact</h1>");
  res.sendFile(path.join(__dirname, "/public/search.html"));
});

app.listen(8080, () => {
  console.log("8080 포트에서 대기중");
});
