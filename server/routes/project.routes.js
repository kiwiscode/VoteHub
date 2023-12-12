const express = require("express");
const router = express();
const Project = require("../models/Project.Model");
const User = require("../models/User.model");

const cloudinary = require("../utils/cloudinary");
let firstImageUrl;
let secondImageUrl;
router.post("/create", (req, res) => {
  const { title, description, owners, firstImage, secondImage } = req.body;
  console.log(
    title,
    description,
    owners,
    firstImage.slice(0, 21),
    secondImage.slice(0, 21)
  );
  // İlk resmi yükleme
  cloudinary.uploader
    .upload(firstImage, {
      folder: "VoteHub",
      allowed_formats: ["mp4", "ogv", "jpg", "png", "pdf", "webm", "webp"],
      height: 500,
      crop: "limit",
    })
    .then((result1) => {
      console.log("THIS LINE IS WORKING 1 ");
      firstImageUrl = result1.url;
      // İkinci resmi yükleme
      return cloudinary.uploader.upload(secondImage, {
        folder: "VoteHub",
        allowed_formats: ["mp4", "ogv", "jpg", "png", "pdf", "webm", "webp"],
        height: 500,
        crop: "limit",
      });
    })
    .then((result2) => {
      console.log("THIS LINE IS WORKING 2 ");

      secondImageUrl = result2.url;
      return Project.create({
        title,
        description,
        projectImages: [firstImageUrl, secondImageUrl],
        owners: owners.map((user) => user._id),
      })
        .then((createdProject) => {
          console.log("THIS LINE IS WORKING 3 ");

          owners.forEach((user) => {
            User.findByIdAndUpdate(
              user._id,
              { $push: { project: createdProject._id } },
              { new: true }
            )
              .then((newUser) => {
                console.log("USER CHANGED =>", newUser);
                console.log("THIS LINE IS WORKING 4 ");
                res.status(200).json({
                  message: "The project has been successfully created.",
                });
              })
              .catch((error) => {
                console.error(error);
              });
          });
        })
        .catch(() => {
          console.error(
            "ERROR OCCURED WHILE TRYING TO GET NEW CREATED PROJECT =>",
            error
          );
        });
    })
    .catch((error) => {
      console.error(
        "ERROR OCCURED WHILE TRYING TO UPLOAD IMAGES TO CLOUDINARY =>",
        error
      );
    });
});

module.exports = router;
