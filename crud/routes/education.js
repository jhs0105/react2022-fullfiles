const express = require("express");
const router = express.Router();
const _subtitle = "교육";
const _titleNum = "04";
const _gnb = "./gnb04";

router.get("/admission", (req, res) => {
  res.render("admission", { titleNum: _titleNum, className: "education", subTitle: _subtitle, contentsTitle: "입학안내", gnb: _gnb });
});

router.get("/schedule", (req, res) => {
  res.render("schedule", { titleNum: _titleNum, className: "education", subTitle: _subtitle, contentsTitle: "학사일정 및 내규", gnb: _gnb });
});

router.get("/scholarship", (req, res) => {
  res.render("scholarship", { titleNum: _titleNum, className: "education", subTitle: _subtitle, contentsTitle: "장학금 정보", gnb: _gnb });
});

router.get("/award", (req, res) => {
  res.render("award", { titleNum: _titleNum, className: "education", subTitle: _subtitle, contentsTitle: "학생수상안내", gnb: _gnb });
});

module.exports = router;
