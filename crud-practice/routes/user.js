const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userinfo = mongoose.Schema({
  id: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    requre: true,
  },
  address: String,
  phone: String,
});

const Info = mongoose.model("test01", userinfo);

router.use(session({ secret: "비밀코드jj", resave: true, saveUninitialized: false }));
router.use(passport.initialize());
router.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "password",
      session: true,
      passReqToCallback: false,
    },
    async (id, password, done) => {
      try {
        const userInfo = await Info.findOne({ id: id, password: password }).exec();
        console.log("로그인 성공");
        if (userInfo) {
          return done(null, userInfo);
        } else {
          console.log("로그인 실패");
          return done(null, false, { message: "id 또는 password가 틀렸습니다." });
        }
      } catch {
        return done(null, false, { message: "id 또는 password 확인 바람" });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("여기는 로그인 할때 한번만 거쳐간다.");
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  console.log("여기는 매번 거쳐간다.");
  Info.findOne({ id: id })
    .then((result) => {
      done(null, result);
    })
    .catch((err) => {
      done(err);
    });
});

router.get("/join", (req, res) => {
  if (req.user) {
    res.send(`<script>alert("로그인 되어 있습니다.");location.href="/";</script>`);
  } else {
    res.render("./user/join", { userInfo: req.user });
  }
});
router.post("/join", async (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  const phone = req.body.phone;
  const address = req.body.address;
  const name = req.body.name;
  const info = new Info({
    id: id,
    password: password,
    phone: phone,
    address: address,
    name: name,
  });
  //console.log(info);
  try {
    const result = await info.save();
    res.redirect("/");
  } catch {
    res.send("end");
  }
});
router.get("/login", (req, res) => {
  if (req.user) {
    res.send(`<script>alert("로그인 되어 있습니다.");location.href="/";</script>`);
  } else {
    res.render("./user/login", { userInfo: req.user });
  }
});

// router.post("/login", async (req, res) => {
//   const id = req.body.id;
//   const password = req.body.password;
//   try {
//     const information = await Info.findOne({ id: id, password: password }).exec();
//     res.render("./index", { user: information.name, id: information.id });
//   } catch {
//     res.send(`<script>alert("알수없는 오류로 로그인이 되지 않았습니다"); location.href="/user/login";</script>`);
//   }
// });

router.post("/login", passport.authenticate("local", { failureRedirect: "/user/login", successRedirect: "/user/info" }), (req, res) => {});

router.get("/info", (req, res) => {
  // const id = req.query.id;
  // try {
  //   const information = await Info.findOne({ id: id }).exec();
  //   res.render("./user/info", { userInfo: information });
  // } catch {}
  //console.log(req.user);
  if (req.user) {
    res.render("./user/info", { userInfo: req.user });
  } else {
    res.send(`<script>alert("로그이 먼저 하셔야 합니다"); location.href="/user/login";</script>`);
  }
});

router.get("/logout", (req, res) => {
  if (req.user) {
    req.session.destroy();
    res.redirect("/");
  }
});
module.exports = router;
