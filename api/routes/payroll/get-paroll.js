const express = require("express");
const jwt = require("jsonwebtoken");
const { UserPayroll } = require("../../database/schemas/payroll-schema");
const getMessage = require("../../message/app-messages");
const router = express.Router();
require('dotenv/config');
const key = process.env.API_SECRET_KEY;

router.get("/", async (req, res) => {
  jwt.verify(req.token, key, (err, authData) => {
    console.log('token log', authData);
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        UserPayroll.find({}, (err, payrolls) => {
          var userPayroll = {};

          payrolls.forEach(function (payroll) {
            userPayroll[payroll._id] = payroll;
          });

          res
            .status(200)
            .json(getMessage(userPayroll, "Request Successfull", true));
        });
      } catch (err) {
        res.status(200).json(getMessage(err, "Something went wrong", false));
      }
    }
  });
});

router.get("/:userId", async (req, res) => {
  jwt.verify(req.token, key, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const userPayroll = new UserPayroll.find({ userId: req.params.userId });

        res
          .status(200)
          .json(getMessage(userPayroll, "Request Successfull", true));
      } catch (err) {
        res.status(200).json(getMessage(err, "Something went wrong", false));
      }
    }
  });
});



module.exports = router;
