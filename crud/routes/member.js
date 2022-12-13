//

const express = require("express");
const router = express.Router();
const moment = require("moment");
const mongoose = require("mongoose");
// const dotenv = require("dotenv").config();

const _subtitle = "회원";
const _titleNum = "01";
const _gnb = "./gnb01";

const memberList = [];
let memberNo = 0;

// mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.once("open", () => {
  console.log("db 연결 성공");
});

const members = mongoose.Schema({
  no: "number",
  id: "string",
  password: "string",
  name: "string",
  phone: "string",
  address: "string",
  date: "date",
});

const Members = mongoose.model("schema", members);

router.get("/join", (req, res) => {
  res.render("./member/join", { titleNum: _titleNum, className: "member", subTitle: _subtitle, contentsTitle: "회원가입", gnb: _gnb });
});
router.post("/join", (req, res) => {
  const name = req.body.name;
  const id = req.body.id;
  const password = req.body.password;
  const phone = req.body.phone;
  const address = req.body.address; //키랑 변수명이 같으면 생략할 수 있다.
  res.redirect("/member/list");
  //memberList.push({ no: ++memberNo, name, id, password, phone, address, date: moment().format("YYYY MM DD") });
  const newMembers = new Members({
    no: 1,
    id: id,
    pw: password,
    name: name,
    phone: phone,
    address: address,
    date: new Date(),
  });
  newMembers.save((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("멤버 추가 성공");
    }
  });
});

router.get("/list", (req, res) => {
  //const list = [...memberList];
  Members.find((err, members) => {
    if (err) {
      console.log(err);
    } else {
      console.log(members);
      res.render("./member/list", { titleNum: _titleNum, className: "member", subTitle: _subtitle, contentsTitle: "회원리스트", gnb: _gnb, list: members });
    }
  });
});

//console.log(moment().format("YYYY MM DD - hh : mm :ss"));
module.exports = router; //router를 내보낸다.
