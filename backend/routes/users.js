const express = require("express");
const router = express.Router();

/* Get users listing. */
router.get("/authentication", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
