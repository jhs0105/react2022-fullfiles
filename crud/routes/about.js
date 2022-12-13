const express = require("express");
const router = express.Router();
const moment = require("moment");
const mongoose = require("mongoose");

//const app = express();
const _subtitle = "대학소개";
const _titleNum = "01";
const _gnb = "./gnb01";

let boardList = [];
let boardNo = 0;
//db(데이터베이스)

const db = mongoose.connection;
db.once("open", () => {
  console.log("about db 연결성공");
});

const notice = mongoose.Schema({
  no: "number",
  subject: "string",
  writer: "string",
  contents: "string",
  date: "date",
});

const Notice = mongoose.model("schema01", notice);

router.get("/greeting", (req, res) => {
  //res.send("<h1>Hello About</h1>");
  res.render("./about/greeting", { titleNum: _titleNum, className: "greeting", subTitle: _subtitle, contentsTitle: "학장인사말", gnb: _gnb });
});
router.get("/history", (req, res) => {
  //res.send("<h1>Hello About</h1>");
  res.render("./about/history", { titleNum: _titleNum, className: "history", subTitle: _subtitle, contentsTitle: "연혁 및 역대학장", gnb: _gnb });
});
router.get("/organization", (req, res) => {
  //res.send("<h1>Hello About</h1>");
  res.render("./about/organization", { titleNum: _titleNum, className: "organization", subTitle: _subtitle, contentsTitle: "조직 및 행정안내", gnb: _gnb });
});
router.get("/students", (req, res) => {
  //res.send("<h1>Hello About</h1>");
  res.render("./about/students", { titleNum: _titleNum, className: "students", subTitle: _subtitle, contentsTitle: "학생회 및 동아리", gnb: _gnb });
});
router.get("/location", (req, res) => {
  //res.send("<h1>Hello About</h1>");
  res.render("./about/location", { titleNum: _titleNum, className: "location", subTitle: _subtitle, contentsTitle: "오시는 길", gnb: _gnb });
});
router.get("/list", (req, res) => {
  //res.send("<h1>Hello About</h1>");
  //const list = [...boardList]; //배열 복사해서 사용
  Notice.find((err, note) => {
    if (err) {
      console.log(err);
    } else {
      res.render("./about/list", { titleNum: _titleNum, className: "notice", subTitle: _subtitle, contentsTitle: "공지사항", gnb: _gnb, list: note });
    }
  });
});
router.get("/write", (req, res) => {
  res.render("./about/write", { titleNum: _titleNum, className: "notice", subTitle: _subtitle, contentsTitle: "공지사항02", gnb: _gnb });
});
router.post("/write", (req, res) => {
  //post로 값이 들어오면...
  //1. 넘어온 값을 받아야 한다.
  //2. 결과처리
  // console.log(req.body.writer); //name받는 거다
  // console.log(req.body.subject); //form으로 들어온 모든 데이터는 body로 넘어온다
  // console.log(req.body.contents);
  //console.log(req.body);
  //req.params (주소/장성호)
  //req.query (주소?write=장성호)

  //boardList.push({ no: ++boardNo, writer: req.body.writer, subject: req.body.subject, date: moment().format("YYYY MM DD") });
  res.redirect("/about/list");
  const newNotice = new Notice({
    no: 2,
    subject: req.body.subject,
    writer: req.body.writer,
    contents: req.body.contents,
    date: new Date(),
  });
  newNotice.save((err, date) => {
    if (err) {
      console.log(err);
    } else {
      console.log("멤버추가 성공");
    }
  });
});
//console.log(moment().format("YYYY MM DD - hh : mm :ss"));
module.exports = router; //router를 내보낸다.
