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
  if (Object.keys(data).includes('payees')) {
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
          const payee = [];
          req.body.payees.forEach((element) => {
            payee.push({
              payee_id: UUID(),
              personal_info: {
                name: element.name,
                email: element.email,
                phone_no: element.phoneNo,
              },
              bank_detail: {
                bank_name: element.bankName,
                account_no: element.accountNo,
                account_type: element.accountType,
              },
              amount: element.amount,
            });
          });
          // insert to database
          const userPayroll = new UserPayroll({
            userId: authData.user.ID,
            payroll: payee,
          });

          userPayroll
            .save()
            .then((data) => {
              res.status(200).json(
                  getMessage(data, "Payroll successfully Created", true)
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


router.post("/payee", (req, res) => {
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

          userPayroll.updateOne(
              {"userId": authData.user.ID},
              { $addToSet: { payroll: payee } }
            )
            .then((data) => {
              res.status(200).json(
                  getMessage(data, "Payroll successfully Created", true)
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
