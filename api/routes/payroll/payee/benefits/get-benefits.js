const express = require("express");
const jwt = require("jsonwebtoken");
const { UserPayroll } = require("../../../../database/schemas/payroll-schema");
const getMessage = require("../../../../message/app-messages");
const router = express.Router();
require('dotenv/config');
const key = process.env.API_SECRET_KEY;

/** _____________________________Update Payee Benefits_____________________________________ 
 * Use this only to update the entire benefits data
*/
router.get("/:payeeId", async (req, res) => {
    jwt.verify(req.token, key, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
            UserPayroll.find(
            { $and: [ {"userId": authData.user.ID}, 
            {"payroll" : {$and: [{$elemMatch: {"payee_id":req.params.payeeId}}, 
            {$eq : "payroll.$.benefits.$[]"}]} }] }
            ).then((data) => {
                res
                .status(200)
                .json(getMessage(data, "request successful", true));
                }). catch ((err) => {
                res.status(200).json(getMessage(err, "Something went wrong", false));
            });
      }
    });
  });
  

  module.exports = router;