const express = require("express");
const jwt = require("jsonwebtoken");
const { UserPayroll } = require("../../../../database/schemas/payroll-schema");
const getMessage = require("../../../../message/app-messages");
const router = express.Router();
require('dotenv/config');
const key = process.env.API_SECRET_KEY;

router.delete("/:payeeId", async (req, res) => {
  jwt.verify(req.token, key, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
        const query = req.body.benefit;
        const queryKey = `payroll.$.benefits.${query}`;
        // const queryKey = `benefits.$.${query}`;
        console.log(queryKey);
        console.log('body data', req.body.benefit);
      
      UserPayroll.findOneAndUpdate( 
        { $and: [ {"userId": authData.user.ID}, {"payroll" : {$elemMatch: {"payee_id":req.params.payeeId}}}] },
      {
        $unset: {
            [queryKey] : 1
         } 
      }, {safe:true, multi: false}
      ).then((data) => {
        res.status(200).json(
            getMessage(data, "Benefit successfully deleted", true)
          );
      })
      .catch((err) => {
         res.status(200).json(getMessage(err, 'Something went wrong. Could not delete benefit', false));
      });
    }
  });
});

module.exports = router;
