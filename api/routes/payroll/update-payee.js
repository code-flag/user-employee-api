const express = require("express");
const jwt = require("jsonwebtoken");
const { UserPayroll } = require("../../database/schemas/payroll-schema");
const getMessage = require("../../message/app-messages");
const router = express.Router();

router.put("/", async (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {

        console.log('param', req.params.payeeId);
        console.log('body', req.body.amount );
      try {
        const userPayroll = UserPayroll.updateOne(
          { "payee_id": req.params.payeeId },
          { $set: { "amount": req.body.amount } }
        );

        res
          .status(200)
          .json(getMessage(userPayroll, "Request Successfull", true));
      } catch (err) {
        res.status(200).json(getMessage(err, "Something went wrong", false));
      }
    }
  });
});
router.put("/bank/:payeeId", async (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const userPayroll = UserPayroll.updateMany(
          { "payroll.payee_id": req.params.payeeId },
          {
            $set: {
              "payroll.bank_detail.bank_name": req.body.bank_name,
              "payroll.bank_detail.account_no": req.body.account_no,
              "payroll.bank_detail.account_type": req.body.account_type,
            },
          }
        );

        res
          .status(200)
          .json(getMessage(userPayroll, "Request Successfull", true));
      } catch (err) {
        res.status(200).json(getMessage(err, "Something went wrong", false));
      }
    }
  });
});
router.put("/info/:payeeId", async (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const userPayroll = UserPayroll.updateMany(
          { "payroll.payee_id": req.params.payeeId },
          {
            $set: {
              "payroll.personal_info.name": req.body.name,
              "payroll.personal_info.email": req.body.email,
              "payroll.personal_info.email": req.body.phone_no,
            },
          }
        );

        res
          .status(200)
          .json(getMessage(userPayroll, "Request Successfull", true));
      } catch (err) {
        res.status(200).json(getMessage(err, "Something went wrong", false));
      }
    }
  });
});

module.exports = router;
