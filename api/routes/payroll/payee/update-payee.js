const express = require("express");
const jwt = require("jsonwebtoken");
const { UserPayroll } = require("../../../database/schemas/payroll-schema");
const getMessage = require("../../../message/app-messages");
const router = express.Router();
require('dotenv/config');
const key = process.env.API_SECRET_KEY;

router.get("/:payeeId", async (req, res) => {
  jwt.verify(req.token, key, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {

        console.log('param', req.params.payeeId);
        console.log('body', req.body.amount );
      
         UserPayroll.find(
          { $and: [ {"userId": authData.user.ID}, {"payroll.payee_id":{ $eq : req.params.payeeId}}] },
        ).then((data) => {
          res
          .status(200)
          .json(getMessage(data, "Request Successfull", true));
        }). catch ((err) => {
        res.status(200).json(getMessage(err, "Something went wrong", false));
      });
    }
  });
});
router.put("/amount/:payeeId", async (req, res) => {
  jwt.verify(req.token, key, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {

        console.log('param', req.params.payeeId);
        console.log('body', req.body.amount );
      
        UserPayroll.updateOne(
          { $and: [ {"userId": authData.user.ID}, {"payroll": {"payee_id": req.params.payeeId }}] },
          { $set: { "amount": req.body.amount } }
        ).then((data) => {
          res
          .status(200)
          .json(getMessage(data, "Request Successfull", true));
        }). catch ((err) => {
        res.status(200).json(getMessage(err, "Something went wrong", false));
      });
    }
  });
});
router.put("/bank/:payeeId", async (req, res) => {
  jwt.verify(req.token, key, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
     
      UserPayroll.updateOne(
          { $and: [ {"userId": authData.user.ID}, {"payroll": {"payee_id": req.params.payeeId }}] },
          {
            $set: {
              "payroll.bank_detail.bank_name": req.body.bank_name,
              "payroll.bank_detail.account_no": req.body.account_no,
              "payroll.bank_detail.account_type": req.body.account_type,
            }
          }
          ).then((data) => {
            res
            .status(200)
            .json(getMessage(data, "Request Successfull", true));
          }). catch ((err) => {
          res.status(200).json(getMessage(err, "Something went wrong", false));
        });
    }
  });
});
router.put("/info/:payeeId", async (req, res) => {
  jwt.verify(req.token, key, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      
      UserPayroll.updateOne(
          { $and: [ {"userId": authData.user.ID}, {"payroll": {"payee_id": req.params.payeeId }}] },
          {
            $set: {
              "payroll.personal_info.name": req.body.name,
              "payroll.personal_info.email": req.body.email,
              "payroll.personal_info.email": req.body.phone_no,
            },
          }
          ).then((data) => {
            res
            .status(200)
            .json(getMessage(data, "Request Successfull", true));
          }). catch ((err) => {
          res.status(200).json(getMessage(err, "Something went wrong", false));
        });
    }
  });
});

/** _______________________ BAsic Payee control___________________________ */
router.put("/", async (req, res) => {
  jwt.verify(req.token, key, (err, authData) => {
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

router.post("/", async (req, res) => {
  jwt.verify(req.token, key, (err, authData) => {
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

router.get("/", async (req, res) => {
  jwt.verify(req.token, key, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {

        console.log('param', req.params.payeeId);
        console.log('body', req.body.amount );
      try {
        const userPayroll = UserPayroll.find(
          { $and: [ {"userId": authData.user.ID}, {"payroll": "payee_id"}] }
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

router.delete("/:payeeId", async (req, res) => {
  jwt.verify(req.token, key, (err, authData) => {
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

module.exports = router;
