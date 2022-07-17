const express = require("express");
const { UserPayroll } = require("../../database/schemas/payroll-schema");
const getMessage = require("../../message/app-messages");
const router = express.Router();
require('dotenv/config');

router.get("/", async (req, res) => {
  
        UserPayroll.find().then( (payrolls) => {
         
          res.status(200).json(getMessage(payrolls, "Request Successfull", true));
        }).catch ((err) => {
        res.status(200).json(getMessage(err, "Something went wrong", false));
      });
});

router.get("/:userId", async (req, res) => {
   
        console.log(req.params.userId);
         UserPayroll.find({ userId: req.params.userId }).then((result) => {res
            .status(200)
            .json(getMessage(result, "Request Successfull", true));
        }).catch((err) => {
          res.status(200).json(getMessage(err, "Something went wrong", false));
        });
    });



module.exports = router;
