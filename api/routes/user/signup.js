const express = require("express");
const router = express.Router();
const UUID = require("../../database/config/unique-id");
const { Users } = require("../../database/schemas/schema");
const getMessage = require("../../message/app-messages");
const { verifyUserRegPayload } = require("../condtions/req.conditions");
require('dotenv/config');


const validateData = (data) => {
  let validated = 0;
  // Object.keys(data)

  // check for payee key
  data.forEach((element) => {
    if (includes('payees')) {
      return true;
    }
    else {
      return false;
    }
  })
  
}

router.post("/", (req, res) => {
  //get the jwt token to extract user data and used to validate the post
 
      let check = verifyUserRegPayload(req.body);
      if (check.status) {
      const isEmpty = Object.keys(req.body).length;
      // console.log("body", isEmpty, authData.user.ID);
      if (isEmpty !== 0) {
          let data = {
              name: req.body.name,
              email: req.body.email,
              password: req.body.password,
          }
          // insert to database
         let m = new Users(data).save().then((data) => {
              res.status(200).json(
                  getMessage(data, "User account created successfully", true)
                );
            })
            .catch(err => {
              res.status(401).json(
                  getMessage(
                    err,
                    "Something went wrong. Could not create user account",
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
    }
    else{
      res.status(400).json(getMessage(check, "Invalid Username and password", false));
    }
});


module.exports = router;
