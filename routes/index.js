var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/g", function (req, res, next) {
  res.send("golassd");
});

module.exports = router;
