const db = require("./db/db");
const movieSchema = require("./models/MovieSchema");
const portfolioSchema = require("./models/PortfolioSchema");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv").config();
const cors = require("cors");

const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

app.set("port", process.env.PORT || 8081);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(cors());

// //upload로 들어오는 파일은 정적파일로 제공하겠다..
// app.use("/upload", express.static("/upload"));

app.set("view engine", "ejs");
const PORT = app.get("port");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//multer 세팅
const diskStorage = multer.diskStorage({
  // destination: (req, file, done) => {
  //   done(null, path.join(__dirname, "/upload"));
  // }, //클라우드에 올릴거면 이제 필요없다.
  filename: (req, file, done) => {
    //done(null, file.originalname + "-" + Date.now());
    done(null, file.originalname.split(".")[0] + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileUpload = multer({ storage: diskStorage });

//routing
app.get("/", (req, res) => {
  res.send("hello express");
});

//ejs파일 보여줄려면 res.render
app.get("/insert", (req, res) => {
  res.render("insert");
});
app.get("/portfolio/insert", (req, res) => {
  res.render("pinterest");
});

app.post("/insert", fileUpload.single("poster"), (req, res) => {
  const title = req.body.title;
  const date = req.body.date;
  //배열을 문자로 바꿔주는 join ["호러","액션"] ==> 호러/액션
  const type = Array.isArray(req.body.type) ? req.body.type.join("/") : req.body.type;
  const summary = req.body.summary;
  const point = Number(req.body.point);
  //const poster = req.body.poster;
  //const poster = req.file.path; //로컬에 있는것

  cloudinary.uploader.upload(req.file.path, (result) => {
    //console.log(result); //poster는 result의 url값이 필요하다
    //db에 넣기
    const insertMovie = new movieSchema({
      title: title,
      date: date,
      type: type,
      summary: summary,
      point: point,
      poster: result.url,
    });
    insertMovie
      .save()
      .then((result) => {
        console.log(result);
        res.send("파일이 잘 저장되었습니다");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

app.get("/list", (req, res) => {
  //db에서 읽어서 뿌리기...
  movieSchema
    .find()
    .then((result) => {
      console.log(result);
      res.render("list", { movieList: result });
      res.json(result); //파일을 json으로 내보낼 수 있다.
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/portfolio/insert", fileUpload.single("poster"), (req, res) => {
  const title = req.body.title;
  const category = Array.isArray(req.body.category) ? req.body.category.join("/") : req.body.category;
  const summary = req.body.summary;

  cloudinary.uploader.upload(req.file.path, (result) => {
    //console.log(result); //poster는 result의 url값이 필요하다
    //db에 넣기
    const insertPortfolio = new portfolioSchema({
      title: title,
      category: category,
      summary: summary,
      poster: result.url,
    });
    insertPortfolio
      .save()
      .then((result) => {
        console.log(result);
        res.send("파일이 잘 저장되었습니다");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

app.get("/portfolio/list", (req, res) => {
  portfolioSchema
    .find()
    .then((result) => {
      console.log(result);
      //res.render("list", { movieList: result });
      res.json(result); //파일을 json으로 내보낼 수 있다.
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(PORT, () => {
  console.log(`${PORT}에서 서버 가동중`);
});
