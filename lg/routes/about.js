const express = require("express");
const router = express.Router();

router.get("/introduce", (req, res) => {
  res.render("introduce");
});
router.get("/foundation", (req, res) => {
  res.render("foundation");
});
router.get("/history", (req, res) => {
  res.render("history");
});
router.get("/location", (req, res) => {
  res.render("location");
});

module.exports = router;
