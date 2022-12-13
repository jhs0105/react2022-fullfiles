const mongoose = require("mongoose");
const db = mongoose
  .connect("mongodb+srv://jj:12345@cluster0.ic8xpds.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "crud02-practice",
  })
  .then(() => {
    console.log("db연결 성공");
  })
  .catch(() => {
    console.log(err);
  });

module.exports = db;
