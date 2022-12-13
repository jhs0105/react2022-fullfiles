const mongoose = require("mongoose");
const PortfolioSchema = mongoose.Schema({
  title: "string",
  category: String,
  summary: String,
  poster: {
    type: String,
    require: true,
    // unique: true,
  },
});

//collection 이름은 "Movies" 복수형으로 만들어 진다.
const Portfolio = mongoose.model("Portfolio", PortfolioSchema);
module.exports = Portfolio;
