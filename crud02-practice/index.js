const express = require("express");
const app = express();
const db = require("./db/db");
const session = require("express-session");
const passport = require("passport");
app.use(session({ secret: "비밀코드", resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.set("port", process.env.PORT || 8082);
const PORT = app.get("port");
app.set("view engine", "ejs");

const userRouter = require("./routes/user");
app.use("/user", userRouter);

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`${PORT}에서 서버 대기중`);
});

app.get("/", (req, res) => {
  res.render("./index", { userInfo: req.user });
});
