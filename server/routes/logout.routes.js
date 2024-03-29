const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express();
router.post("/", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decoded._id;
    User.findByIdAndUpdate(userId, { active: false })
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.status(500).json({ message: "Error updating user" });
      });
  });
});

module.exports = router;
