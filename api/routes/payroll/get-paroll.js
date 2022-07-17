const express = require("express");
const jwt = require("jsonwebtoken");
const { UserPayroll } = require("../../database/schemas/payroll-schema");
const getMessage = require("../../message/app-messages");
const router = express.Router();
require('dotenv/config');
const key = process.env.API_SECRET_KEY;

router.get("/", async (req, res) => {
  jwt.verify(req.token, key, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
        UserPayroll.find({ userId: authData.user.ID }).then((result) => {res
          .status(200)
          .json(getMessage(result, "Request Successfull", true));
      }).catch((err) => {
        res.status(200).json(getMessage(err, "Something went wrong", false));
      });
    }
  });
});



module.exports = router;
