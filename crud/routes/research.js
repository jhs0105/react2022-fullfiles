const express = require("express");
const router = express.Router();
const _subtitle = "연구";
const _titleNum = "03";
const _gnb = "./gnb03";

router.get("/institute", (req, res) => {
  //res.send(); 일반 html로 내보내기
  //res.json(); json으로 내보내기
  //res.render(); ejs내보내기
  res.render("./research/institute", { titleNum: _titleNum, className: "department", subTitle: _subtitle, contentsTitle: "대학부설연구소", gnb: _gnb });
});

router.get("/bk21", (req, res) => {
  //res.send("<h1>Hello About</h1>");
  res.render("./research/bk21", { titleNum: _titleNum, className: "department", subTitle: _subtitle, contentsTitle: "BK21+교육연구단", gnb: _gnb });
});

router.get("/business", (req, res) => {
  //res.send("<h1>Hello About</h1>");
  res.render("./research/business", { titleNum: _titleNum, className: "graduate", subTitle: _subtitle, contentsTitle: "주요연구사업단", gnb: _gnb });
});
module.exports = router;
