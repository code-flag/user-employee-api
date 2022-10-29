
const express = require('express'); 
const app = express();
require('dotenv/config');
const PORT = process.env.PORT;
const VerifyToken = require('./api/middlewares/verifyToken');
/** ________________________Database connection_________________________ */
const DBConnection = require('./api/database/connection'); DBConnection();


/**_________________________User__________________________ */
const userSignup = require('./api/routes/user/signup');
const getUser = require('./api/routes/user/get-user');
const login = require('./api/routes/user/login');

/** __________________________Employee__________________________ */
const addEmployee = require('./api/routes/employee/create-employee');
const deleteEmployee = require('./api/routes/employee/delete-employee');
const updateEmployee = require('./api/routes/employee/update-employee');
const getEmployee = require('./api/routes/employee/get-employee');

/**_________________________________ Middleware ________________________________ */

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


/** _______________________________API ROUTES_________________________________ */ 
app.use('/api/user/signup', userSignup );
app.use('/api/user/login', login);
app.use('/api/user', getUser);


/** ______________________Employee endpoints___________________ */
app.use('/api/emp/employees', VerifyToken,  addEmployee);
app.use('/api/emp/employees', VerifyToken, deleteEmployee);
app.use('/api/emp/employees', VerifyToken, getEmployee);
app.use('/api/emp/employees', VerifyToken, updateEmployee);


app.listen(PORT || 5100, () => {
    console.log('server started on port', PORT);
}); 
