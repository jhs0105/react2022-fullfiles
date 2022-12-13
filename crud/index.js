//console.log("hello nod");
//template engine

const express = require("express");
const path = require("path");
const ejs = require("ejs");

const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.set("view engine", "ejs"); //ejs pug
app.set("port", process.env.PORT || 8081);
app.use(express.static(path.join(__dirname, "/public")));
const PORT = app.get("port"); //이렇게 해야 서버에 올렸을때 오류가 나지 않는다!
//console.log(PORT);

const aboutRouter = require("./routes/about");
const majorRouter = require("./routes/major");
const researchRouter = require("./routes/research");
const educationRouter = require("./routes/education");
const communityRouter = require("./routes/community");
const memberRouter = require("./routes/member");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/about", aboutRouter);
app.use("/major", majorRouter);
app.use("/research", researchRouter);
app.use("/education", educationRouter);
app.use("/community", communityRouter);
app.use("/member", memberRouter);

mongoose.connect(process.env.MONGO_URL);

app.get("/", (req, res) => {
  //res.sendFile(path.join(__dirname, "/public/index.html"));
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`${PORT}에서 서버 대기중`);
});
