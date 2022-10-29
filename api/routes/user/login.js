const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Users } = require("../../database/schemas/schema");
const getMessage = require("../../message/app-messages");
const { verifyLoginPayload } = require("../condtions/req.conditions");
require("dotenv/config");
const key = process.env.API_SECRET_KEY;

let jwtToken;
// create jwt token
const getToken = (username) => {
  const user = {
    username: username,
  };

  jwt.sign({ user }, key, { expiresIn: "120s" }, (err, token) => {
    jwtToken = token;
  });
};

router.post("/", async (req, res) => {
  let check = verifyLoginPayload(req.body);
  if (check.status) {
    getToken(req.body.username);
    Users.find({ email: req.body.username, password: req.body.password })
      .then((resp) => {
        console.log('data', resp, resp[0]?.email);
        if (resp[0]?.email ) {
          res
            .status(200)
            .json(
              getMessage(
                { username: req.body.username, jwt_token: jwtToken },
                "User are successfully login",
                true
              )
            );
        } else {
          res
            .status(400)
            .json(getMessage({}, "Invalid Username and password", false));
        }
      })
      .catch((err) => {
        res
          .status(400)
          .json(getMessage({}, "Invalid Username and password", false));
      });
  } else {
    res
      .status(400)
      .json(getMessage(check, "Invalid Username and password", false));
  }
});

module.exports = router;
