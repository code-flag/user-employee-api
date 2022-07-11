const express = require('express');
const jwt = require('jsonwebtoken');
const { UserPayroll } = require('../../database/schemas/payroll-schema');
const getMessage = require('../../message/app-messages');
const router = express.Router();


router.delete('/', async (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err){
            res.sendStatus(403);
        }
        else {
                const userPayroll = UserPayroll.findOneAndRemove({'userId': authData.user.userId}).then((data) => {
                    res.status(200).json(
                        getMessage(data, "Payroll successfully deleted", true)
                      );
                  })
                  .catch((err) => {
                res.status(200).json(getMessage(err, 'Something went wrong', false));
            });
        }
    })
});

module.exports = router;