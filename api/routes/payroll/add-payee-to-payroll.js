const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const UUID = require("../../database/config/unique-id");
const { UserPayroll } = require("../../database/schemas/payroll-schema");
const getMessage = require("../../message/app-messages");
require('dotenv/config');
const key = process.env.API_SECRET_KEY;


const validateData = (data) => {
  // check for payee key
  console.log('this is payee', data);
  if (Object.keys(data).includes('payee')) {
    return true;
  }
  else {
    return false;
  }
}

router.post("/", (req, res) => {
  //get the jwt token to extract user data and used to validate the post
  jwt.verify(req.token, key, (err, authData) => {

    if (err) {
      res.sendStatus(403);
    } else {
      const isEmpty = Object.keys(req.body).length;
      console.log("body", isEmpty, authData.user.ID);
      if (isEmpty !== 0) {
        if (validateData(req.body)) {
          const payee = {
              payee_id: UUID(),
              personal_info: {
                name: req.body.payee.name,
                email: req.body.payee.email,
                phone_no: req.body.payee.phoneNo,
              },
              bank_detail: {
                bank_name: req.body.payee.bankName,
                account_no: req.body.payee.accountNo,
                account_type: req.body.payee.accountType,
              },
              amount: req.body.payee.amount,
            };

          UserPayroll.updateOne(
              {"userId": authData.user.ID},
              { $addToSet: { payroll: payee } }
            )
            .then((data) => {
              res.status(200).json(
                  getMessage(data, "Payee added successfully", true)
                );
            })
            .catch(err => {
              res
                .status(500)
                .json(
                  getMessage(
                    err,
                    "Something went wrong. Could not save data",
                    false
                  )
                );
            });
        } else {
          res
          .status(200)
          .json(getMessage({ payees: null }, "Payee must be included", false));
        }
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
  });
});


module.exports = router;
