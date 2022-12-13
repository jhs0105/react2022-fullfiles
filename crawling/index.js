const express = require("express");
const app = express();
const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const cors = require("cors");

app.use(cors());

app.set("port", process.env.PORT || 8081);
const PORT = app.get("port");

app.get("/", (req, res) => {
  res.send("Hello Express");
  //res.render(); html파일 보낼때
  //res.json(); json파일 보낼때
});

//크롤링
app.get("/daum/news", (req, res) => {
  //여기서 다음 뉴스에 가서 내용을 긁어오기
  //json으로 가공해서 내려보내주기
  //axios는 ajax를 쉽게 해주는 tool / fetch  -> promise기반
  axios.get("https://news.daum.net/").then(function (result) {
    //console.log(result.data);
    const returnList = [];
    const $ = cheerio.load(result.data); //긁어온 html에서 제이쿼리처럼 dom을 select할수 있다.
    const list = $(".list_newsissue").children("li");
    list.each((idx, item) => {
      returnList.push({
        title: $(item).find("a").text().replaceAll("\n", "").trim(),
        img: $(item).find("a img").attr("src"),
        link: $(item).find("a").attr("href"),
      });
    });
    res.json(returnList); //json으로 가공한것!
    console.log(returnList);
  });
});

//비동기로 내려오는 것은 cheerio로 안된다.
//나중에 데이터가 내려오는 것은 크롤링이 안된다. 그래서 puppeteer를 설치해야 한다.

//puppeteer는 크로미니움(크롬의 개발 버전)
app.get("/daum/movie", async (req, res) => {
  const browser = await puppeteer.launch({
    //headless: false, //false 하면 파란색 크롬이 뜬다
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1000,
    height: 800,
  });
  await page.goto("https://movie.daum.net/main");
  await page.waitForSelector(".list_reserveranking");

  const content = await page.content("https://movie.daum.net/main");
  //console.log(content);
  const $ = cheerio.load(content);
  const list_reserveranking = $(".topmovie-slide .list_reserveranking").children("li");
  const list = [];
  list_reserveranking.each((idx, item) => {
    //jquery each: idx가 먼저 옴
    list.push({
      img: $(item).find(".poster_movie img").attr("src"),
      title: $(item).find(".thumb_cont a").text(),
      link: $(item).find(".poster_info a").attr("href"),
      info: {
        openDate: $(item).find(".poster_info a .list_info:nth-child(1) dd").text(),
        type: $(item)
          .find(".poster_info a .list_info:nth-child(2) dd")
          .text()
          .replace(/[\n\s]/g, ""),
        grade: $(item)
          .find(".poster_info a .list_info:nth-child(3) dd")
          .text()
          .replace(/[\n\s]/g, ""),
        director: $(item)
          .find(".poster_info a .list_info:nth-child(4) dd")
          .text()
          .replace(/[\n\s]/g, ""),
        actor: $(item)
          .find(".poster_info a .list_info:nth-child(5) dd")
          .text()
          .replace(/[\n\s]/g, ""),
      },
    });
  });
  res.json(list);
});

app.get("/naver/webtoon", async (req, res) => {
  const browser = await puppeteer.launch({
    //headless: false,
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1000,
    height: 800,
  });
  await page.goto("https://comic.naver.com/webtoon/weekdayList?week=wed");
  await page.waitForSelector(".list_area");

  const content = await page.content("https://comic.naver.com/webtoon/weekdayList?week=wed");
  const $ = cheerio.load(content);
  const webToonList = $(".list_area .img_list").children("li");
  const list = [];
  //console.log(webToonList);
  webToonList.each((idx, item) => {
    list.push({
      img: $(item).find(".thumb a img").attr("src"),
      title: $(item).find(".thumb a img").attr("title"),
      artist: $(item)
        .find("dl .desc")
        .text()
        .replace(/[\n\s]/g, ""),
      score: $(item)
        .find("dl .rating_type strong")
        .text()
        .replace(/[\n\s]/g, ""),
      img: $(item).find(".thumb a img").attr("src"),
      link: $(item).find(".thumb a").attr("href"),
    });
  });
  res.json(list);
});

app.get("/naver/expert", async (req, res) => {
  const browser = await puppeteer.launch({
    //headless: false,
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1200,
    height: 8700,
  });
  await page.goto("https://m.expert.naver.com/");
  await page.waitForSelector(".container--1ZuYG");
  const content = await page.content("https://m.expert.naver.com/");
  const $ = cheerio.load(content);
  const classList = $(".container--1ZuYG div:nth-child(5) .carouselArea--2dIwk .swiper-container .swiper-wrapper").children("div");
  const list = [];
  classList.each((idx, item) => {
    list.push({
      title: $(item).find(".itemInfo--1i1wz p").text(),
      link: $(item).find(".item--214qE a").attr("href"),
      image: $(item).find(".itemImage--38l1S").attr("style").split('"')[1],
    });
  });
  res.json(list);
});

//정규표현식 regular expression (글자에서 맞는 패턴 찾기)
// const txt = "    장     성   호   ";
// console.log(txt.replace(/\s/g, ""));

const txt = 'background-image: url("https://kin-phinf.pstatic.net/20221013_55/1665648473024620V2_JPEG/productCover1665648473014.jpg?type=w480")';
console.log(txt.split('"')[1]);
//' ' 안의 "을 기준으로 배열을 만듬

app.listen(PORT, () => {
  console.log(`${PORT}에서 서버 대기`);
});
