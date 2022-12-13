const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 8081);
app.use(express.static(path.join(__dirname, "/public")));

const PORT = app.get("port");
console.log(PORT);

const aboutRouter = require("./routes/about");
const programRouter = require("./routes/program");

app.use("/about", aboutRouter);
app.use("/program", programRouter);

app.get("/", (req, res) => {
  //res.sendFile(path.join(__dirname, "/public/index.html"));
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`${PORT}에서 서버 대기중`);
});
