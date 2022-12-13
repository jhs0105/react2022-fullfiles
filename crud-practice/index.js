const express = require("express");
const app = express();
const db = require("./db/db");

const session = require("express-session");
const passport = require("passport");
app.use(session({ secret: "비밀코드jj", resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 8080);
const PORT = app.get("port");
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./routes/user");
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`${PORT}에서 서버 대기`);
});

app.get("/", (req, res) => {
  console.log(req.user);
  res.render("./index", { userInfo: req.user });
});
