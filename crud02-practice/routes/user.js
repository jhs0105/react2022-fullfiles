const express = require("express");
const router = express.Router();
const UserSchema = require("../models/UserSchema");
router.use(express.urlencoded({ extended: true }));
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

router.use(session({ secret: "비밀코드", resave: true, saveUninitialized: false }));
router.use(passport.initialize());
router.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "id",
      userpasswordField: "password",
      session: true,
      passReqToCallback: false,
    },
    async (id, password, done) => {
      try {
        const userInfo = await UserSchema.findOne({ id: id, password: password }).exec();
        console.log("로그인 성공");
        if (userInfo) {
          return done(null, userInfo);
        } else {
          return done(null, false, { message: "id 또는 pw를 확인하세요" });
        }
      } catch {
        return done(null, false, { message: "id 또는 pw 확인바람" });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  UserSchema.findOne({ id: id }, (err, result) => {
    done(null, result);
  });
});

router.get("/join", (req, res) => {
  if (req.user) {
    res.send(`<script>alert("로그인 되어 있습니다.");location.href="/";</script>`);
  } else {
    res.render("./user/join");
  }
});

router.post("/join", async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const password = req.body.password;
  const address = req.body.address;
  const phone = req.body.phone;
  const info = new UserSchema({
    id: id,
    password: password,
    name: name,
    phone: phone,
    address: address,
  });
  try {
    const result = await info.save();
    console.log(result);
    res.redirect("/");
  } catch {
    res.send(`<script>alert("오류로 인해 회원가입이 되지 않았습니다."); location.href="/user/join";</script>`);
  }
});

router.get("/login", (req, res) => {
  res.render("./user/login");
});

// router.post("/login", async (req, res) => {
//   const id = req.body.id;
//   const password = req.body.password;
//   try {
//     const userInfo = await UserSchema.findOne({ id: id, password: password });
//     res.render("./index", { userInfo: userInfo, id: userInfo.id });
//   } catch {
//     res.send(`<script>alert("알수없는 오류로 로그인이 되지 않았습니다"); location.href="/user/login";</script>`);
//   }
// });
router.post("/login", passport.authenticate("local", { failureRedirect: "/user/login", successRedirect: "/user/info" }), (req, res) => {});

router.get("/info", (req, res) => {
  if (req.user) {
    res.render("./user/info", { userInfo: req.user });
  } else {
    res.send(`<script>alert("로그인 먼저 하세요"); location.href="/user/login";</script>`);
  }
});

router.get("/logout", (req, res) => {
  if (req.user) {
    req.session.destroy();
    res.redirect("/");
  }
});
module.exports = router;
