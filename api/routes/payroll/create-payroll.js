const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const UUID = require("../../database/config/unique-id");
const { UserPayroll } = require("../../database/schemas/payroll-schema");
const getMessage = require("../../message/app-messages");

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
  jwt.verify(req.token, "secretkey", (err, authData) => {
    jwtEmbeddedData = authData;

    if (err) {
      res.sendStatus(403);
    } else {
      const isEmpty = Object.keys(req.body).length;
      console.log("body", isEmpty, authData.user.userId);
      if (isEmpty !== 0) {
        if (validateData(req.body)) {
          const payee = [];
          req.body.payees.forEach((element) => {
            payee.push({
              payee_id: UUID(),
              personal_info: {
                name: element.name,
                email: element.email,
                phone_no: element.phone_no,
              },
              bank_detail: {
                account_no: element.account_no,
                account_type: element.account_type,
              },
              amount: element.amount,
            });
          });
          // insert to database
          const userPayroll = new UserPayroll({
            userId: authData.user.userId,
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


module.exports = router;
