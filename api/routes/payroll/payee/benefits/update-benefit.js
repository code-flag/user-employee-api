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
router.put("/add/benefit/:payeeId", async (req, res) => {
    jwt.verify(req.token, key, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
  
        console.log('body data', req.body.benefits);
        const benefits = req.body;
        UserPayroll.findOneAndUpdate(
          { $and: [ {"userId": authData.user.ID}, {"payroll" : {$elemMatch: {"payee_id":req.params.payeeId}}}] },
          { $addToSet: {"payroll": {"benefits": req.body} }},
          { "new": true}
          
          ).then((data) => {
              res
              .status(200)
              .json(getMessage(data, "Benefits Successfully updated", true));
            }). catch ((err) => {
            res.status(200).json(getMessage(err, "Something went wrong", false));
          });
      }
    });
  });
  