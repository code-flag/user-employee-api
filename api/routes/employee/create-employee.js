const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const UUID = require("../../database/config/unique-id");
const { Employee } = require("../../database/schemas/schema");
const getMessage = require("../../message/app-messages");
const { verifyEmployeePayload } = require("../condtions/req.conditions");
require("dotenv/config");
const key = process.env.API_SECRET_KEY;

const validateData = (data) => {
  let validated = 0;
  // Object.keys(data)

  // check for payee key
  data.forEach((element) => {
    if (includes("payees")) {
      return true;
    } else {
      return false;
    }
  });
};

router.post("/", (req, res) => {
  //get the jwt token to extract user data and used to validate the post
  jwt.verify(req.token, key, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      let check = verifyEmployeePayload(req.body);
      if (check.status) {
        const isEmpty = Object.keys(req.body).length;
        // console.log("body", isEmpty, authData.user.ID);
        if (isEmpty !== 0) {
          let data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            gender: req.body.gender,
            salary: req.body.salary,
          };
          // insert to database
          let emp = new Employee(data)
            .save()
            .then((data) => {
              res
                .status(200)
                .json(
                  getMessage(
                    data,
                    "Employee account created successfully",
                    true
                  )
                );
            })
            .catch((err) => {
              res
                .status(401)
                .json(
                  getMessage(
                    err,
                    "Something went wrong. Could not create employee account",
                    false
                  )
                );
            });
        } else {
          res
            .status(200)
            .json(
              getMessage(
                [],
                "No data pass. Ensure you pass params correctly",
                false
              )
            );
        }
      } else {
        res
          .status(400)
          .json(getMessage(check, "Invalid Username and password", false));
      }
    }
  });
});

module.exports = router;
