const express = require("express");
const jwt = require("jsonwebtoken");
const { UserPayroll } = require("../../../../database/schemas/payroll-schema");
const { camelCaseToUnderscore } = require("../../../../library/formatter");
const getMessage = require("../../../../message/app-messages");
const router = express.Router();
require('dotenv/config');
const key = process.env.API_SECRET_KEY;

/** _____________________________Update Payee Benefits_____________________________________ 
 * Use this only to update the entire benefits data
*/
router.put("/:payeeId", async (req, res) => {
    jwt.verify(req.token, key, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
  
        
        const benefits = req.body;
        let dataKey = Object.keys(req.body)?.[0];
      const val = req.body?.[dataKey];
      dataKey = camelCaseToUnderscore(dataKey);
      console.log('body data', req.body, dataKey);
      const queryKey = `payroll.$.benefits.${dataKey}`;

        UserPayroll.findOneAndUpdate(
          { $and: [ {"userId": authData.user.ID}, {"payroll" : {$elemMatch: {"payee_id":req.params.payeeId}}}] },
          { $set: { [queryKey]: val}}, { "new": true}
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
  

  module.exports = router;