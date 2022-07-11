/**
 * @author - Francis OLawumi Awe <awefrancolaz@gmail.com>
 * @description - This api handles user payroll, schedule payroll and activate payment process 
 */

const express = require('express'); 
const app = express();
require('dotenv/config');
const PORT = process.env.PORT;
const VerifyToken = require('./api/middlewares/verifyToken');
/** ________________________Database connection_________________________ */
const DBConnection = require('./api/database/connection'); DBConnection();

/** _________________________API ROUTES_______________________________ */
const userLogin = require('./api/routes/user/login');
const createPayroll = require('./api/routes/payroll/create-payroll');
const updatePayroll = require('./api/routes/payroll/update-payroll');
const getPayroll = require('./api/routes/payroll/get-paroll');
const deletePayroll = require('./api/routes/payroll/delete-payroll');
const updatePayee = require('./api/routes/payroll/update-payee');

/**_________________________________ Middleware ________________________________ */

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use('/api/user/login', userLogin );
app.use('/api/user/payroll', VerifyToken, createPayroll);
app.use('/api/user/payroll', VerifyToken, updatePayroll);
app.use('/api/user/payroll', VerifyToken, getPayroll);
app.use('/api/user/payroll', VerifyToken, deletePayroll);
app.use('/api/user/payee/', VerifyToken, updatePayee);
app.use('/api/user/payee/amount/:payeeId', VerifyToken, updatePayee);

app.listen(PORT || 5100, () => {
    console.log('server started on port', PORT);
}); 


// app.get('/api', (req, res) => {
//     console.log('request protocol',req.protocol + ":" + req.get('host') + req.originalUrl );
// });