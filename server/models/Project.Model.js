// models/Project.js

const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  projectImages: [
    {
      type: String, // URL of project images (3 images)
    },
  ],
  projectVideo: {
    type: String, // URL of the project video
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
