const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/", (req, res) => {
  const user = {
    ID: 1,
    username: "taiwo",
    user_email: "dev@dev.com",
    first_name: "",
    last_name: "",
    roles: ["administrator"],
  };

  jwt.sign({ user }, "secretkey", { expiresIn: "60000s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

module.exports = router;
