const express = require("express");
const router = express.Router();
const _subtitle = "소식 및 시설";
const _titleNum = "05";
const _gnb = "./gnb05";

router.get("/notice", (req, res) => {
  //res.send(); 일반 html로 내보내기
  //res.json(); json으로 내보내기
  //res.render(); ejs내보내기
  res.render("notice", { titleNum: _titleNum, className: "department", subTitle: _subtitle, contentsTitle: "학사공지", gnb: _gnb });
});

router.get("/result", (req, res) => {
  //res.send("<h1>Hello About</h1>");
  res.render("result", { titleNum: _titleNum, className: "department", subTitle: _subtitle, contentsTitle: "교육 및 연구성과", gnb: _gnb });
});

router.get("/concert", (req, res) => {
  //res.send("<h1>Hello About</h1>");
  res.render("concert", { titleNum: _titleNum, className: "graduate", subTitle: _subtitle, contentsTitle: "과학콘서트 및 대중강연", gnb: _gnb });
});
router.get("/facility", (req, res) => {
  //res.send("<h1>Hello About</h1>");
  res.render("facility", { titleNum: _titleNum, className: "graduate", subTitle: _subtitle, contentsTitle: "주요시설", gnb: _gnb });
});
router.get("/fund", (req, res) => {
  //res.send("<h1>Hello About</h1>");
  res.render("fund", { titleNum: _titleNum, className: "graduate", subTitle: _subtitle, contentsTitle: "이과대학 발전기금", gnb: _gnb });
});

module.exports = router;
