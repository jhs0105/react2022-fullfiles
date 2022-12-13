const express = require("express");
const router = express.Router();
const _subtitle = "전공안내";
const _titleNum = "02";
const _gnb = "./gnb02";

router.get("/department", (req, res) => {
  //res.send("<h1>Hello About</h1>");
  res.render("./major/department", { titleNum: _titleNum, className: "department", subTitle: _subtitle, contentsTitle: "학부", gnb: _gnb });
});

router.get("/graduate", (req, res) => {
  //res.send("<h1>Hello About</h1>");
  res.render("./major/graduate", { titleNum: _titleNum, className: "graduate", subTitle: _subtitle, contentsTitle: "대학원", gnb: _gnb });
});
module.exports = router;
