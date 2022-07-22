const express = require("express");
const jwt = require("jsonwebtoken");
const { UserPayroll } = require("../../../database/schemas/payroll-schema");
const getMessage = require("../../../message/app-messages");
const router = express.Router();
require('dotenv/config');
const key = process.env.API_SECRET_KEY;

const camelCaseToUnderscore = str => {
  return str.split('').map((letter, idx) => {
    return letter.toUpperCase() === letter
     ? `${idx !== 0 ? '_' : ''}${letter.toLowerCase()}`
     : letter;
  }).join('');
}

/** _____________________________Update Payroll schedule settings_____________________________________ */
router.post("/", async (req, res) => {
  jwt.verify(req.token, key, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {     
      UserPayroll.findOneAndUpdate(
        { "userId": authData.user.ID },
          {
            $set: {
              "schedule_setting": {
                "period": req.body.period,
                "last_action_time": req.body.lastActionTime,
                "next_action_time": req.body.nextActionTime
              }
            }
          },
          {'new': true}
          ).then((data) => {
            res
            .status(200)
            .json(getMessage(data, "Schedule setting Successfully updated", true));
          }). catch ((err) => {
          res.status(200).json(getMessage(err, "Something went wrong", false));
        });
    }
  });
});


/** _____________________________Update Paroll individual schedule settings_____________________________________ 
 * Use this only to update individual schedule settings
*/
router.put("/", async (req, res) => {
  jwt.verify(req.token, key, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      
      let dataKey = Object.keys(req.body)?.[0];
      const val = req.body?.[dataKey];
      dataKey = camelCaseToUnderscore(dataKey);
      const queryKey = `schedule_setting.${dataKey}`;

      UserPayroll.findOneAndUpdate(
        { "userId": authData.user.ID },
        { $set: {[queryKey] : val}},
        { "new": true}
        
        ).then((data) => {
            res
            .status(200)
            .json(getMessage(data, "Schedule setting Successfully updated", true));
          }). catch ((err) => {
          res.status(200).json(getMessage(err, "Something went wrong", false));
        });
    }
  });
});

module.exports = router;
