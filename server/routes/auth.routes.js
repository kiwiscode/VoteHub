const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const cloudinary = require("../utils/cloudinary");

const saltRounds = 10;

router.post("/signup", (req, res, next) => {
  const {
    email,
    password,
    name,
    profileImage,
    isSoleDeveloperActive,
    isTeamDeveloperActive,
  } = req.body;

  // Check if email or password or name are provided as empty strings
  if (email === "" || password === "" || name === "") {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }
    })
    .then(() => {
      if (profileImage) {
        cloudinary.uploader
          .upload(profileImage, {
            folder: "VoteHub",
            allowed_formats: [
              "mp4",
              "ogv",
              "jpg",
              "png",
              "pdf",
              "webm",
              "webp",
              "jpeg",
            ],
            height: 500,
            crop: "limit",
            radius: "max",
          })
          .then((imageInfo) => {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(password, salt);

            return User.create({
              email,
              password: hashedPassword,
              name,
              profileImage: imageInfo.url,
              isSoleDeveloper: isSoleDeveloperActive,
              isTeamDeveloper: isTeamDeveloperActive,
            });
          })
          .then((createdUser) => {
            const { email, name, _id, profileImage } = createdUser;

            const user = { email, name, _id, profileImage };

            res.status(201).json({ user: user });
          })
          .catch((error) => {
            console.error(error);
            res
              .status(500)
              .json({ errorMessage: "Error occured while creating user" });
          });
      }
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  User.findOne({ email })
    .populate("project")
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).json({ message: "User not found." });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        const {
          _id,
          email,
          name,
          profileImage,
          isSoleDeveloper,
          isTeamDeveloper,
          project,
          isVotedForHelpFulPerson,
          isVotedForBestProject,
          theVotesReceivedForTheFunniestPerson,
          votedForFunniestPerson,
          isVotedForFunniestPerson,
        } = foundUser;

        const payload = {
          _id,
          email,
          name,
          profileImage,
          isSoleDeveloper,
          isTeamDeveloper,
          project,
          isVotedForHelpFulPerson,
          isVotedForBestProject,
          theVotesReceivedForTheFunniestPerson,
          votedForFunniestPerson,
          isVotedForFunniestPerson,
        };

        const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        console.log("THIS IS THE FOUNDUSER =>", { foundUser });
        foundUser.active = true;
        foundUser.save();

        res.status(200).json({ authToken: authToken, user: foundUser });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
