const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
require('dotenv/config');
const secretKey = process.env.API_SECRET_KEY;
router.get("/", (req, res) => {
  const user = {
    ID: 4,
    username: "taiwo",
    user_email: "dev@dev.com",
    first_name: "",
    last_name: "",
    roles: ["administrator"],
  };

  jwt.sign({ user }, secretKey, { expiresIn: "60000s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

module.exports = router;
