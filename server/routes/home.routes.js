const express = require("express");
const router = express();

router.get("/", (req, res) => {
  res.send("ROUTE IS WORKING");
});

module.exports = router;
