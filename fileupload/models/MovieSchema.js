const mongoose = require("mongoose");
const MovieSchema = mongoose.Schema({
  title: "string",
  date: String,
  type: String,
  summary: String,
  point: Number,
  poster: {
    type: String,
    // require: true,
    // unique: true,
  },
});

//collection 이름은 "Movies" 복수형으로 만들어 진다.
const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;
