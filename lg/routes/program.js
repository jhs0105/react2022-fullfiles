const express = require("express");
const router = express.Router();

router.get("/seoul", (req, res) => {
  res.render("seoul");
});

module.exports = router;
