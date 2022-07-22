const express = require("express");
const jwt = require("jsonwebtoken");
const { UserPayroll } = require("../../../database/schemas/payroll-schema");
const getMessage = require("../../../message/app-messages");
const router = express.Router();
require('dotenv/config');
const key = process.env.API_SECRET_KEY;

const camelCaseTokebabCase = str => {
  return str.split('').map((letter, idx) => {
    return letter.toUpperCase() === letter
     ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
     : letter;
  }).join('');
}

const camelCaseToUnderscore = str => {
  return str.split('').map((letter, idx) => {
    return letter.toUpperCase() === letter
     ? `${idx !== 0 ? '_' : ''}${letter.toLowerCase()}`
     : letter;
  }).join('');
}

/** _____________________________Update Payee Salary_____________________________________ */
router.post("/", async (req, res) => {
  jwt.verify(req.token, key, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {

        if (typeof req.body.scheduleStatus === 'boolean') {
            UserPayroll.findOneAndUpdate(
                {"userId": authData.user.ID },
                { $set: { "schedule_status": req.body.scheduleStatus } }, {'new': true}
              ).then((data) => {
                res
                .status(200)
                .json(getMessage(data, "Schedule status successfully updated", true));
              }). catch ((err) => {
              res.status(200).json(getMessage(err, "Something went wrong", false));
            });
        }else {
            // console.log('correct data', typeof req.body.scheduleStatus);
            res
          .status(200)
          .json(getMessage([], "Schedule status must be boolean type", true));
        }
        
    }
  });
});


module.exports = router;