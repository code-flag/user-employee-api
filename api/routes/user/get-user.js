const express = require("express");
const { Users } = require("../../database/schemas/schema");
const getMessage = require("../../message/app-messages");
const router = express.Router();
require('dotenv/config');

router.get("/", async (req, res) => {
  
        Users.find().then( (users) => {
         
          res.status(200).json(getMessage(users, "Users successfully retrieved", true));
        }).catch ((err) => {
        res.status(200).json(getMessage(err, "Something went wrong. Could not fetch all user", false));
      });
});

router.get("/:userId", async (req, res) => {
         Users.find({ _id: req.params.userId }).then((result) => {res
            .status(200)
            .json(getMessage(result, "User successfully retrieved", true));
        }).catch((err) => {
          res.status(200).json(getMessage(err, "Something went wrong. Could not fetch all user", false));
        });
    });



module.exports = router;
