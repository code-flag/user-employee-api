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
// 057702532a98ff3c4270325c05224327
router.put('/', async (req, res) => {
    jwt.verify(req.token, key, (err, authData) => {
        userId = '62cc1e206e53c99c9267b9ec';
        if(err){
            res.sendStatus(403);
        }
        else {
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
                              phone_no: element.phone_no,
                            },
                            bank_detail: {
                              bank_name: element.bank_name,
                              account_no: element.account_no,
                              account_type: element.account_type,
                            },
                            amount: element.amount,
                            tax: element?.tax,
                          });
                        });
                        // insert to database
                         UserPayroll.findOneAndReplace({'userId' : authData.user.ID}, {'userId': authData.user.ID,'payroll': payee} , {'returnNewDocument': true})
                          .then((data) => {
                            res.status(200).json(
                                getMessage(data, "Payroll successfully updated", true)
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