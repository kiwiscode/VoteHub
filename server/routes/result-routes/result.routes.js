const express = require("express");
const router = express();
const User = require("../../models/User.model");
const Project = require("../../models/Project.Model");

router.get("/funniest-person-results", (req, res) => {
  User.find()
    .sort({ theVotesReceivedForTheFunniestPerson: -1 })
    .then((allUsersFromDB) => {
      const sortedUsers = allUsersFromDB.sort(
        (a, b) =>
          b.theVotesReceivedForTheFunniestPerson.length -
          a.theVotesReceivedForTheFunniestPerson.length
      );
      const topThreeUsers = sortedUsers.slice(0, 3);

      res.status(200).json(topThreeUsers[0]);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/helpful-person-results", (req, res) => {
  User.find()
    .sort({ theVotesReceivedForTheHelpfulPerson: -1 })
    .then((allUsersFromDB) => {
      const sortedUsers = allUsersFromDB.sort(
        (a, b) =>
          b.theVotesReceivedForTheHelpfulPerson.length -
          a.theVotesReceivedForTheHelpfulPerson.length
      );
      const topThreeUsers = sortedUsers.slice(0, 3);

      res.status(200).json(topThreeUsers[0]);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/most-beautiful-projects-results", (req, res) => {
  Project.find()
    .populate("owners")
    .sort({ receivedVotes: -1 })
    .then((allProjectsFromDB) => {
      const sortedUsers = allProjectsFromDB.sort(
        (a, b) => b.receivedVotes.length - a.receivedVotes.length
      );
      const topTwoProjects = sortedUsers.slice(0, 2);

      res.status(200).json(topTwoProjects);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
