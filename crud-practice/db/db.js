const mongoose = require("mongoose");
const db = mongoose
  .connect("mongodb+srv://jj:12345@cluster0.cdrywkg.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedToPology: true,
    dbName: "practice",
  })
  .then(() => {
    console.log("db연결 성공");
  });
