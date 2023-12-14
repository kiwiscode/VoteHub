const express = require("express");
const router = express();
const User = require("../../models/User.model");
const Project = require("../../models/Project.Model");
const { default: mongoose } = require("mongoose");
router.post("/vote-for-funniest-person", (req, res) => {
  const { selectedUserId, userId } = req.body;
  User.findById(selectedUserId)
    .then((selectedUser) => {
      User.findById(userId)
        .then((userPerformingTheAction) => {
          if (
            userPerformingTheAction.votedForFunniestPerson.length === 0 &&
            !userPerformingTheAction.isVotedForFunniestPerson
          ) {
            userPerformingTheAction.isVotedForFunniestPerson = true;
            userPerformingTheAction.votedForFunniestPerson.push(selectedUserId);
            // kilit nokta start to check

            const selectedUserVotesIds =
              selectedUser.theVotesReceivedForTheFunniestPerson.map((user) => {
                return user._id.toString();
              });
            if (!selectedUserVotesIds.includes(userId)) {
              selectedUser.theVotesReceivedForTheFunniestPerson.push(userId);
              return selectedUser
                .save()
                .then(() => {
                  return userPerformingTheAction
                    .save()
                    .then(() => {
                      res.status(200).json({
                        message: "The voting has been successfully completed!",
                      });
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                })
                .catch((error) => {
                  console.error(error);
                });
            } else {
              res.status(501).json({
                errorMessage: "You already voted for funniest person!",
              });
            }
            // kilit nokta finish to check
          } else {
            res.status(501).json({
              errorMessage: "You already voted for funniest person!",
            });
          }
        })
        .catch(() => {
          res.status(501).json({
            errorMessage:
              "To submit, you need to choose a friend as the most helpful person.",
          });
        });
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ errorMessage: "Internal Server Error" });
    });
});

router.post("/vote-for-helpful-person", (req, res) => {
  const { selectedUserId, userId } = req.body;
  User.findById(selectedUserId)
    .then((selectedUser) => {
      User.findById(userId)
        .then((userPerformingTheAction) => {
          if (
            userPerformingTheAction.votedForHelpfulPerson.length === 0 &&
            !userPerformingTheAction.isVotedForHelpFulPerson
          ) {
            userPerformingTheAction.isVotedForHelpFulPerson = true;
            userPerformingTheAction.votedForHelpfulPerson.push(selectedUserId);
            // kilit nokta start to check
            const selectedUserVotesIds =
              selectedUser.theVotesReceivedForTheHelpfulPerson.map((user) => {
                return user._id.toString();
              });
            if (!selectedUserVotesIds.includes(userId)) {
              selectedUser.theVotesReceivedForTheHelpfulPerson.push(userId);
              return selectedUser
                .save()
                .then(() => {
                  return userPerformingTheAction
                    .save()
                    .then(() => {
                      res.status(200).json({
                        message: "The voting has been successfully completed!",
                      });
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                })
                .catch((error) => {
                  console.error(error);
                });
            } else {
              res.status(501).json({
                errorMessage: "You already voted for helpful person!",
              });
            }
            // kilit nokta finish to check
          } else {
            res.status(501).json({
              errorMessage: "You already voted for helpful person!",
            });
          }
        })
        .catch(() => {
          res.status(501).json({
            errorMessage:
              "To submit, you need to choose a friend as the most helpful person.",
          });
        });
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ errorMessage: "Internal Server Error" });
    });
});

router.post("/vote-for-best-project", (req, res) => {
  const { selectedProjects } = req.body;
  const { userId } = req.body;

  console.log("SELECTED PROJECTS =>", selectedProjects);
  console.log("ACTIVE USER WHO IS PICKING THE BEST PROJECTS =>", userId);
  if (
    selectedProjects.length === 2 &&
    selectedProjects[0].owners.length !== 0 &&
    selectedProjects[1].owners.length !== 0
  ) {
    User.findById(userId)
      .then((user) => {
        // console.log(user);
        if (
          !user.isVotedForBestProject &&
          user.voteCountForBestProject !== 2 &&
          user.votedForBestProjects.length !== 2
        ) {
          user.isVotedForBestProject = true;
          user.voteCountForBestProject = selectedProjects.length;
          user.votedForBestProjects.push(
            selectedProjects[0]._id,
            selectedProjects[1]._id
          );
          user.save();
          Project.find({
            _id: {
              $in: [
                new mongoose.Types.ObjectId(selectedProjects[0]._id),
                new mongoose.Types.ObjectId(selectedProjects[1]._id),
              ],
            },
          })
            .then((projects) => {
              console.log("PROJECT 1 =>", projects[0]);
              console.log("PROJECT 2 =>", projects[1]);

              projects[0].receivedVotes.push(userId);
              projects[1].receivedVotes.push(userId);
              projects[0].save();
              projects[1].save();

              // res.status(200).json({
              //   message:
              //     "PROJECT 1 AND PROJECT 2 VOTED FROM A USERID AND ACTIVE USER isVotedForBestProject=true , voteCountForBestProject = 2(selectedProjects.length) , votedForBestProjects.push(project1ID,project2ID), then 2 projects finded by using Project.find and multiple project finded first project it means PROJECT 1 receivedVotes.push(userId), PROJECT 2 receivedVotes.push(userId) and then project 1 and project 2 saved to the database. ",
              // });

              res.status(200).json({
                message: "The voting has been successfully completed!",
              });
            })
            .catch(() => {
              res.status(404).json({
                errorMessage: "Error occured while fetching the projects",
              });
            });
        }
      })
      .catch(() => {
        res.status(501).json({
          errorMessage: "You already voted for best project!",
        });
      });
  } else {
    res.status(501).json({
      errorMessage: "To submit, you should choose a minimum of 2 projects.",
    });
  }
});

module.exports = router;
