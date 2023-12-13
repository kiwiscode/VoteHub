const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    profileImage: {
      type: String, // URL of the profile image
    },
    project: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    isSoleDeveloper: {
      type: Boolean,
      default: false,
    },
    isTeamDeveloper: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    // start to check for funniest person  votes

    theVotesReceivedForTheFunniestPerson: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    votedForFunniestPerson: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isVotedForFunniestPerson: {
      type: Boolean,
      default: false,
    },
    // finish to check for funniest person  votes

    // start to check for most helpful person  votes

    theVotesReceivedForTheHelpfulPerson: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    votedForHelpfulPerson: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isVotedForHelpFulPerson: {
      type: Boolean,
      default: false,
    },
    // finish to check for most helpful person  votes

    // start to check for best project votes
    voteCountForBestProject: {
      type: Number,
      default: 0,
    },
    isVotedForBestProject: {
      type: Boolean,
      default: false,
    },
    votedForBestProjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    // burası biraz beklesin NOTE
    // theVotesReceivedForTheBestProject: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
    // finish to check for best project votes
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
