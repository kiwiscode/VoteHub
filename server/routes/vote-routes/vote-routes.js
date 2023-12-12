const express = require("express");
const router = express();
const User = require("../../models/User.model");
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
        .catch((error) => {
          console.error(error);
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
            userPerformingTheAction.isVotedForHelpfulPerson = true;
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
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ errorMessage: "Internal Server Error" });
    });
});
module.exports = router;
