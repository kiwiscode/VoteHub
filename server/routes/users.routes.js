const express = require("express");
const router = express();
const User = require("../models/User.model");

router.get("/", (req, res) => {
  User.find()
    .populate("project")
    .then((allUsersFromDB) => {
      console.log(allUsersFromDB);
      res.json(allUsersFromDB);
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
