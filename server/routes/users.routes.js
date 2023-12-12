const express = require("express");
const router = express();
const User = require("../models/User.model");

router.get("/", (req, res) => {
  User.find()
    .then((allUsersFromDB) => {
      res.json(allUsersFromDB);
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
