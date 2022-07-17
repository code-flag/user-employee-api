const express = require("express");
const jwt = require("jsonwebtoken");
const { UserPayroll } = require("../../../database/schemas/payroll-schema");
const getMessage = require("../../../message/app-messages");
const router = express.Router();
require('dotenv/config');
const key = process.env.API_SECRET_KEY;

router.delete("/:payeeId", async (req, res) => {
  jwt.verify(req.token, key, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      UserPayroll.update( {"userId": authData.user.ID},
      {
        $pull: {
            "payroll":{ "payee_id": req.params.payeeId}
         } 
      }, {safe:true}
      ).then((data) => {
        res.status(200).json(
            getMessage(data, "Payee successfully deleted", true)
          );
      })
      .catch((err) => {
         res.status(200).json(getMessage(err, 'Something went wrong. Could not delete payee', false));
      });
    }
  });
});

module.exports = router;
