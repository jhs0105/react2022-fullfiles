const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  id: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  name: String,
  phone: String,
  address: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Info", UserSchema);
