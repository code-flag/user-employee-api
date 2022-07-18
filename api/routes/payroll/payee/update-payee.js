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
router.put("/amount/:payeeId", async (req, res) => {
  jwt.verify(req.token, key, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {

        UserPayroll.findOneAndUpdate(
          { $and: [ {"userId": authData.user.ID}, {"payroll" : {$elemMatch: {"payee_id":req.params.payeeId}}}] },
          { $set: { "payroll.$.amount": req.body.amount } }, {'new': true}
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

 /** _____________________________Update Payee Tax_____________________________________ */
router.put("/tax/:payeeId", async (req, res) => {
  jwt.verify(req.token, key, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {

        UserPayroll.findOneAndUpdate(
          { $and: [ {"userId": authData.user.ID}, {"payroll" : {$elemMatch: {"payee_id":req.params.payeeId}}}] },
          { $set: { "payroll.$.tax": req.body.tax } }, {'new': true}
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

/** _____________________________Update Payee Bank details_____________________________________ */
router.put("/bank/:payeeId", async (req, res) => {
  jwt.verify(req.token, key, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {     
      UserPayroll.findOneAndUpdate(
        { $and: [ {"userId": authData.user.ID}, {"payroll" : {$elemMatch: {"payee_id":req.params.payeeId}}}] },
          {
            $set: {
              "payroll.$.bank_detail": {
                "bank_name": req.body.bankName,
                "account_no": req.body.accountNo,
                "account_type": req.body.accountType
              }
            }
          },
          {'new': true}
          ).then((data) => {
            res
            .status(200)
            .json(getMessage(data, "Payee bank details successfully updated", true));
          }). catch ((err) => {
          res.status(200).json(getMessage(err, "Something went wrong", false));
        });
    }
  });
});

/** _____________________________Update Payee Personal Info_____________________________________ */
router.put("/info/:payeeId", async (req, res) => {
  jwt.verify(req.token, key, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      UserPayroll.findOneAndUpdate(
        { $and: [ {"userId": authData.user.ID}, {"payroll" : {$elemMatch: {"payee_id":req.params.payeeId}}}] },
          {
            $set: {
              "payroll.$.personal_info":{
                "name": req.body.name,
                "email": req.body.email,
                "phone_no": req.body.phoneNo,
              }
            },
          }
          ).then((data) => {
            res
            .status(200)
            .json(getMessage(data, "Payee personal information Successfully updated", true));
          }). catch ((err) => {
          res.status(200).json(getMessage(err, "Something went wrong", false));
        });
    }
  });
});

// /** _____________________________Update Payee Personal Info_____________________________________ */
// router.put("/info/:payeeId", async (req, res) => {
//   jwt.verify(req.token, key, (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       UserPayroll.findOneAndUpdate(
//         { $and: [ {"userId": authData.user.ID}, {"payroll" : {$elemMatch: {"payee_id":req.params.payeeId}}}] },
//           {
//             $set: {
//               "payroll.$.personal_info":{
//                 "name": req.body.name,
//                 "email": req.body.email,
//                 "phone_no": req.body.phoneNo,
//               }
//             },
//           }
//           ).then((data) => {
//             res
//             .status(200)
//             .json(getMessage(data, "Payee personal information Successfully updated", true));
//           }). catch ((err) => {
//           res.status(200).json(getMessage(err, "Something went wrong", false));
//         });
//     }
//   });
// });


/** _____________________________Update Payee individual bank data_____________________________________ 
 * Use this only to update individual bank data
*/
router.put("/single/bank/:payeeId", async (req, res) => {
  jwt.verify(req.token, key, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {

      console.log('body data', req.body);
      
      let dataKey = Object.keys(req.body)?.[0];
      const val = req.body?.[dataKey];
      dataKey = camelCaseToUnderscore(dataKey);
      const queryKey = `payroll.$.bank_detail.${dataKey}`;

      console.log('rrr', queryKey);
      

      UserPayroll.findOneAndUpdate(
        { $and: [ {"userId": authData.user.ID}, {"payroll" : {$elemMatch: {"payee_id":req.params.payeeId}}}] },
        { $set: {[queryKey] : val}},
        { "new": true}
        
        ).then((data) => {
            res
            .status(200)
            .json(getMessage(data, "Benefits Successfully updated", true));
          }). catch ((err) => {
          res.status(200).json(getMessage(err, "Something went wrong", false));
        });
    }
  });
});

/** _____________________________Update Payee individual bank data_____________________________________ 
 * Use this only to update individual bank data
*/
router.put("/single/info/:payeeId", async (req, res) => {
  jwt.verify(req.token, key, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {

      console.log('body data', req.body);
      
      let dataKey = Object.keys(req.body)?.[0];
      const val = req.body?.[dataKey];
      dataKey = camelCaseToUnderscore(dataKey);
      const queryKey = `payroll.$.personal_info.${dataKey}`;

      console.log('rrr', queryKey);
      

      UserPayroll.findOneAndUpdate(
        { $and: [ {"userId": authData.user.ID}, {"payroll" : {$elemMatch: {"payee_id":req.params.payeeId}}}] },
        { $set: {[queryKey] : val}},
        { "new": true}
        
        ).then((data) => {
            res
            .status(200)
            .json(getMessage(data, "Benefits Successfully updated", true));
          }). catch ((err) => {
          res.status(200).json(getMessage(err, "Something went wrong", false));
        });
    }
  });
});



module.exports = router;
