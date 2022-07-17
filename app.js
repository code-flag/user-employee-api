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

/** ________________________SWAGGER DOCUMENTATION LIB___________________________ */
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

/** _________________________API ROUTES___________________________________________ */
/**_________________________Payroll__________________________ */
const userLogin = require('./api/routes/user/login');
const createPayroll = require('./api/routes/payroll/create-payroll');
const addPayeeToPayroll = require('./api/routes/payroll/add-payee-to-payroll');
const updatePayroll = require('./api/routes/payroll/update-payroll');
const getPayroll = require('./api/routes/payroll/get-paroll');
const getAllPayroll = require('./api/routes/payroll/get-all');
const deletePayroll = require('./api/routes/payroll/delete-payroll');
/** __________________________Payee__________________________ */
const addPayee = require('./api/routes/payroll/payee/add-payee');
const deletePayee = require('./api/routes/payroll/payee/delete-payee');
const getPayee = require('./api/routes/payroll/payee/get-payee');
const updatePayeeData = require('./api/routes/payroll/payee/update-payee');

/**_________________________________ Middleware ________________________________ */

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


/** __________________________Swagger definition________________________________ */
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Nellalink Payroll Api",
            version: "1.0.0",
            description: "Api for handling user/company payroll",
            contact: {
                name: "Francis Olawumi Awe",
                url: "www.rinple-net.com",
                email: "awefrancolaz@gmail.com"
            },
            servers: [
                 { 
                    url: "http://nellalink-payroll.herokuapp.com/",
                    description: "production server"
                },
                { 
                    url: "http://localhost:5100",
                    description: "local server"
                }
            ],
            
            
        },
        components: {
            securitySchemes: {
                jwt: {
                    type: "http",
                    scheme: "bearer",
                    in: "header",
                    bearerFormat: "JWT"
                },
            }
        },
    
        security: [{
            jwt: []
        }],
    },

    apis: ['app.js']
}

/** instatiate swagger constructor */
const swaggerDocs = swaggerJSDoc(swaggerOptions);

/** use swagger as middleware to route
 * nella-swag - is used as the base url for swagger api docs
 */

app.use('/nella-swag', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/** _______________________________API ROUTES_________________________________ */ 
app.use('/api/user/login', userLogin );
app.post('/poost', (req, res) => {});
app.use('/api/user/payroll', VerifyToken, createPayroll);
app.use('/api/user/payroll/payee', VerifyToken, addPayeeToPayroll);
app.use('/api/user/payroll', VerifyToken, updatePayroll);
app.use('/api/user/payroll', VerifyToken, getPayroll);
app.use('/api/payrolls', getAllPayroll);
app.use('/api/user/payroll', VerifyToken, deletePayroll);
/** ______________________Updating single payee data___________________ */
app.use('/api/user/payee', VerifyToken, addPayee);
app.use('/api/user/payee', VerifyToken, deletePayee);
app.use('/api/user/payee', VerifyToken, getPayee);
app.use('/api/user/payee', VerifyToken, updatePayeeData);


app.listen(PORT || 5100, () => {
    console.log('server started on port', PORT);
}); 


/** __________________________API DOCUMENTATION WITH SWAGGER____________________________ */

/**
 * @swagger
 * tags:
 *   - name: User 
 *     description: API to manage payroll for any user - User JWT authorization is required for all the APIs
 *   - name: Payee 
 *     description: API to manage individual payee records in payroll - User JWT authorization is required for all the APIs
 *   - name: Schedule 
 *     description: API to manage payroll for any user - User JWT authorization is required for all the APIs
 *   - name: History 
 *     description: API to manage payroll for any user - User JWT authorization is required for all the APIs
 * */

/**
 * @swagger
 * components:
 *   schemas: 
 *     Payees: 
 *       type: object
 *       description: This consist the array of all the payee data
 *       properties:
 *         name:
 *           type: string
 *           description: payee full name
 *           example: 'James Bond'
 *         email:
 *           type: string
 *           description: payee full name
 *           example: 'James Bond'
 *         phoneNo:
 *           type: string
 *           description: payee phone number
 *           example: '07012546109'
 *         bankName:
 *           type: string
 *           description: payee bank name
 *           example: 'UBA'
 *         accountNo:
 *           type: string
 *           description: payee account number
 *           example: '00125461818'
 *         accountType:
 *           type: string
 *           description: payee account type
 *           example: 'savings'
 *         amount:
 *           type: integer
 *           description: payee salary
 *           example: '5000'
 *         tax:
 *           type: integer
 *           description: payee tax percentage
 *           example: '0.2'
 *        
 *     Payees-response: 
 *       type: object
 *       description: This consist the array of all the payee data
 *       properties:
 *         personal_info:
 *           name:
 *             type: string
 *             description: payee full name
 *             example: 'James Bond'
 *           email:
 *             type: string
 *             description: payee full name
 *             example: 'James Bond'
 *           phone_no:
 *             type: string
 *             description: payee phone number
 *             example: '07012546109'
 *         bank_detail:
 *           bank_name:
 *             type: string
 *             description: payee bank name
 *             example: 'UBA'
 *           account_no:
 *             type: string
 *             description: payee account number
 *             example: '00125461818'
 *           account_type:
 *             type: string
 *             description: payee account type
 *             example: 'savings'
 *         amount:
 *           type: integer
 *           description: payee salary
 *           example: '5000'
 *         tax:
 *           type: number
 *           description: payee tax percentage
 *           example: 0.05
 *         benifit_status:
 *           type: boolean
 *           description: benifit status
 *           example: 'false'
 *         benefits:
 *           bonus:
 *             type: integer
 *             description: bonus for payee
 *             example: '0'
 *           wardrope:
 *             type: integer
 *             description: wardrope allowance
 *             example: '0'
 *           incentive:
 *             type: integer
 *             description: incentive for payee
 *             example: '0'
 *           transport:
 *             type: integer
 *             description: transport allowance
 *             example: 'savings'
 * 
 * */


/**
 * @swagger
 * components:
 *   schemas: 
 *     Payee-bank-details:
 *       type: object
 *       description: Use this to update payee bank details
 *       properties:
 *         bankName:
 *           type: string
 *           description: payee bank name
 *           example: 'UBA'
 *         accountNo:
 *           type: string
 *           description: payee account number
 *           example: '00125461818'
 *         accountType:
 *           type: string
 *           description: payee account type
 *           example: 'savings'
 * 
 *     Payee-personal-info:
 *       type: object
 *       description: data after updating the payee personal-information
 *       properties:
 *         name:
 *           type: string
 *           description: payee name
 *           example: 'James clerk'
 *         email:
 *           type: string
 *           description: payee email
 *           example: 'example@gmial.com'
 *         phoneNo:
 *           type: string
 *           description: payee mobile number
 *           example: '08012548267'
 * 
 *     Payee-benefits:
 *       type: object
 *       description: data after updating the payee personal-information
 *       properties:
 *         bonus:
 *           type: integer
 *           description: payee bonus
 *           example: '0'
 *         transport:
 *           type: integer
 *           description: payee transport allowance
 *           example: '0'
 *         wardrope:
 *           type: integer
 *           description: payee wardrope allowance
 *           example: '0'
 *         incentive:
 *           type: integer
 *           description: payee incentives
 *           example: '0'
 *     Payee-amount:
 *       type: object
 *       description: Use this to update payee bank details
 *       properties:
 *         amount:
 *           type: integer
 *           description: payee salary / amount
 *           example: '52000'
 *     Payee-tax:
 *       type: object
 *       description: Use this to update payee bank details
 *       properties:
 *         amount:
 *           type: integer
 *           description: payee salary / amount
 *           example: '52000'
 * 
 */

/**
 * @swagger
 * components: 
 *   schemas:
 *     Schedule_status:
 *       type: boolean
 *       description: Schedule status to toggle payroll activeness
 *       properties:
 *         scheduleStatus: 
 *           type: boolean
 *           description: toggle payroll schedule activeness
 *           example: false
 */

/**
 * @swagger
 * components:
 *   schemas: 
 *     Schedule:
 *       type: object
 *       description: Use this to update schedule for a particular payroll
 *       properties:
 *         userId:
 *           type: string
 *           required: true
 *           example: 'ek37hdiuh@%ju85jun$*snk54s4df'
 *         actionTime:
 *           type: string
 *           required: true
 *           example: '4:00pm Wed, 27 August 2022'
 *         timeCreated:
 *           type: string
 *           description: when schedule set to activeness - not required
 *           required: false
 *           example: '4:00pm Wed, 27 August 2022'
 * 
 *     
 */

/**
 * @swagger
 * paths:
 *  /api/payrolls:
 *  
 *    get:
 *      summary: Get all the list of payroll - authentication not required
 *      tags:
 *        - User
 *      description: Get all the list of payroll - authentication not required
 *      name: Payroll
 *      responses:
 *        200:
 *          description: request successfully
 *          content: 
 *          text/json:
 *        500:
 *          description: internal error
 * 
 *  /api/payrolls/{userId}:
 *    get:
 *      summary: Get all the list of payroll - authentication not required
 *      tags:
 *        - User
 *      description: Get all the list of payroll - authentication not required
 *      name: Payroll
 *      parameters: 
 *        - in: path
 *          required: true
 *          name: userId
 *          example: '1 or jneskyu738yh5b73wa$^#%skjvhb'
 *          schema:
 *            type: string
 *      security:
 *        - jwt: []
 *      responses:
 *        200:
 *          description: request successfully
 *          content: 
 *          text/json:
 *        500:
 *          description: internal error
 * 
 * 
 *  /api/user/payroll:
 *    post:
 *      summary: Create payroll
 *      tags:
 *        - User
 *      description: Create user payroll 
 *      name: payees
 *      requestBody: 
 *        required: true
 *        content: 
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Payees'
 *              example: { payees: [
 *                          {
 *                               "name": "James Bond",
 *                               "email": "useremail@gmail.com",
 *                               "phoneNo": "07012546109",
 *                               "bankName": "UBA",
 *                               "accountNo": "00125461818",
 *                               "accountType": "savings",
 *                               "amount": 5000,
 *                               "tax": 0.2
 *                           },
 *                           {
 *                               "name": "James Bond",
 *                               "email": "useremail@gmail.com",
 *                               "phoneNo": "07012546109",
 *                               "bankName": "UBA",
 *                               "accountNo": "00125461818",
 *                               "accountType": "savings",
 *                               "amount": 5000,
 *                               "tax": 0.2
 *                           }
 *                       ] }
 *               
 *      security:
 *        - jwt: []
 *      responses:
 *        200:
 *          description: payroll created successfully
 *          content: 
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/Payees-response'
 *        403:
 *          description: Forbidden
 *    get:
 *      summary: Get a single user payroll - authentication required
 *      tags:
 *        - User
 *      description: Get a single user payroll - authentication required
 *      name: Payroll
 *      security:
 *        - jwt: []
 *      responses:
 *        200:
 *          description: request successfully
 *          content: 
 *          text/json:
 *        500:
 *          description: internal error
 * 
 * 
 *    put:
 *      summary: Update payroll
 *      tags:
 *        - User
 *      description: Used to update user payroll 
 *      name: Payees
 *      requestBody: 
 *        required: true
 *        content: 
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Payees'
 *              example: { payees: [
 *                          {
 *                               "name": "James Bond",
 *                               "email": "useremail@gmail.com",
 *                               "phoneNo": "07012546109",
 *                               "bankName": "UBA",
 *                               "accountNo": "00125461818",
 *                               "accountType": "savings",
 *                               "amount": 5000,
 *                               "tax": 0.2
 *                           },
 *                           {
 *                               "name": "James Bond",
 *                               "email": "useremail@gmail.com",
 *                               "phoneNo": "07012546109",
 *                               "bankName": "UBA",
 *                               "accountNo": "00125461818",
 *                               "accountType": "savings",
 *                               "amount": 5000,
 *                               "tax": 0.2
 *                           }
 *                       ] }
 *               
 *      security:
 *        - jwt: []
 *      responses:
 *        200:
 *          description: payroll created successfully
 *          content: 
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/Payees-response'
 *        403:
 *          description: Forbidden
 * 
 *    delete:
 *      summary: Delete user payroll - This used the current user auth data
 *      tags:
 *        - User
 *      name: Delete-Payee
 *      security:
 *        - jwt: []
 *      responses:
 *        200:
 *          description: payroll deleted successfully
 *          content: 
 *          text/json:
 *        500:
 *          description: internal error
 * 
 *  
 *  /api/user/payroll/{userId}:
 *    delete:
 *      summary: Delete user payroll by id
 *      tags:
 *        - User
 *      name: Delete-Payee
 *      parameters: 
 *        - in: path
 *          required: true
 *          name: userId
 *          example: '1 or jneskyu738yh5b73wa$^#%skjvhb'
 *          schema:
 *            type: string
 *      security:
 *        - jwt: []
 *      responses:
 *        200:
 *          description: payroll deleted successfully
 *          content: 
 *          text/json:
 *        500:
 *          description: internal error
 * 
 *  
 *  /api/user/payroll/payee:
 *    post:
 *      summary: Add a single payee to payroll
 *      tags:
 *        - User
 *      description: Add a single payee to payroll 
 *      name: Payee
 *      requestBody: 
 *        required: true
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#components/schemas/Payees'
 *              example: { payee: 
 *                          {
 *                               "name": "James Bond",
 *                               "email": "useremail@gmail.com",
 *                               "phoneNo": "07012546109",
 *                               "bankName": "UBA",
 *                               "accountNo": "00125461818",
 *                               "accountType": "savings",
 *                               "amount": 5000,
 *                               "tax": 0.2
 *                           }
 *                       }
 *      security:
 *        - jwt: []
 *      responses:
 *        200:
 *          description: payee added successfully
 *          content: 
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/Payees-response'
 *        403:
 *          description: Forbidden
 * 
 *  /api/user/payroll/schedule-settings:
 *    put:
 *      summary: Update payroll schedule setting
 *      tags:
 *        - User
 *      description: Used to update user payroll 
 *      name: Payees
 *      requestBody: 
 *        required: true
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/Schedule-settings'
 *      security:
 *        - jwt: []
 *      responses:
 *        200:
 *          description: payroll created successfully
 *          content: 
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/Payees-response'
 *        403:
 *          description: Forbidden
 *  /api/user/login:
 *    get:
 *      summary: Login to get authentication for testing only
 *      tags:
 *        - User
 *      name: Payees-login
 *      responses:
 *        200:
 *          description: login successfully
 *          content: 
 *          text/json:
 *        500:
 *          description: internal error
 * */

/**
 * @swagger
 * paths:
 *  /api/user/payee:
 *    post:
 *      summary: Add new payee
 *      tags:
 *        - Payee
 *      description: Add new payee 
 *      name: payee
 *      requestBody: 
 *        required: true
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#components/schemas/Payees'
 *              example: { payee: 
 *                          {
 *                               "name": "James Bond",
 *                               "email": "useremail@gmail.com",
 *                               "phoneNo": "07012546109",
 *                               "bankName": "UBA",
 *                               "accountNo": "00125461818",
 *                               "accountType": "savings",
 *                               "amount": 5000,
 *                               "tax": 0.2
 *                           }
 *                       }
 
 *      security:
 *        - jwt: []
 *      responses:
 *        200:
 *          description: payee salary successfully updated
 *        403:
 *          description: Forbidden
 *    get:
 *      summary: Get list of all payee
 *      tags:
 *        - Payee
 *      description: Get list of all payee 
 *      security:
 *        - jwt: []
 *      responses:
 *        200:
 *          description: payee salary successfully updated
 *        403:
 *          description: Forbidden
 * 
 *  /api/user/payee/{payeeId}:
 * 
 *    get:
 *      summary: Get payee by id
 *      tags:
 *        - Payee
 *      description: Get payee by id 
 *      parameters: 
 *        - in: path
 *          required: true
 *          name: payeeId
 *          example: 'jneskyu738yh5b73wa$^#%skjvhb'
 *          schema:
 *            type: string
 *      security:
 *        - jwt: []
 *      responses:
 *        200:
 *          description: payee salary successfully updated
 *        403:
 *          description: Forbidden
 *    put:
 *      summary: Update the payee datas by id
 *      tags:
 *        - Payee
 *      description: Update the whole payee payee data
 *      parameters: 
 *        - in: path
 *          required: true
 *          name: payeeId
 *          example: 'jneskyu738yh5b73wa$^#%skjvhb'
 *          schema:
 *            type: string
 *        - in: body
 *          required: true
 *          name: payee
 *          schema:
 *            type: object
 *            $ref: '#components/schemas/Payee-personal-info'
 *      security:
 *        - jwt: []
 *      responses:
 *        200:
 *          description: payee salary successfully updated
 *        403:
 *          description: Forbidden
 * 
 *    delete:
 *      summary: Get payee by id
 *      tags:
 *        - Payee
 *      description: Get payee by id 
 *      parameters: 
 *        - in: path
 *          required: true
 *          name: payeeId
 *          example: 'jneskyu738yh5b73wa$^#%skjvhb'
 *          schema:
 *            type: string
 *      security:
 *        - jwt: []
 *      responses:
 *        200:
 *          description: payee salary successfully updated
 *        403:
 *          description: Forbidden
 * 
 * 
 *  /api/user/payee/amount/{payeeId}:
 *    put:
 *      summary: update payee salary or amount
 *      tags:
 *        - Payee
 *      description: Update payee salary or amount 
 *      parameters: 
 *        - in: path
 *          required: true
 *          name: payeeId
 *          example: 'jneskyu738yh5b73wa$^#%skjvhb'
 *          schema:
 *            type: string
 *      requestBody: 
 *        required: true
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/Payee-amount'
 *            example: {
 *                    amount : 52000
 *                 }
 *      security:
 *        - jwt: []
 *      responses:
 *        200:
 *          description: payee salary successfully updated
 *        403:
 *          description: Forbidden
 * 
 *  /api/user/payee/tax/{payeeId}:
 *    put:
 *      summary: update payee tax
 *      tags:
 *        - Payee
 *      description: Update tax
 *      parameters: 
 *        - in: path
 *          required: true
 *          name: payeeId
 *          example: 'jneskyu738yh5b73wa$^#%skjvhb'
 *          schema:
 *            type: string
 *        - in: body
 *          required: true
 *          name: payeeTax
 *          schema:
 *            type: integer
 *      security:
 *        - jwt: []
 *      responses:
 *        200:
 *          description: payee tax successfully updated
 *        403:
 *          description: Forbidden
 * 
 * 
 *  /api/user/payee/bank/{payeeId}:
 *    put:
 *      summary: update payee bank details
 *      tags:
 *        - Payee
 *      description: Update payee bank details 
 *      parameters: 
 *        - in: path
 *          required: true
 *          name: payeeId
 *          example: 'jneskyu738yh5b73wa$^#%skjvhb'
 *          schema:
 *            type: string
 *        - in: body
 *          required: true
 *          name: bankDetails
 *          schema:
 *            type: object
 *            $ref: '#components/schemas/Payee-personal-info'
 *      security:
 *        - jwt: []
 *      responses:
 *        200:
 *          description: payee salary successfully updated
 *        403:
 *          description: Forbidden
 * 
 *  /api/user/payee/info/{payeeId}:
 *    put:
 *      summary: update payee personal information
 *      tags:
 *        - Payee
 *      description: update payee personal information
 *      consumes: 
 *       - application/json
 *      produces:
 *       - application/json
 *      parameters: 
 *        - in: path
 *          required: true
 *          name: payeeId
 *          example: 'jneskyu738yh5b73wa$^#%skjvhb'
 *          schema:
 *            type: string
 *        - in: body
 *          required: true
 *          name: payeeInfo
 *          schema:
 *            type: object
 *            $ref: '#components/schemas/Payee-personal-info'
 *      security:
 *        - jwt: []
 *      responses:
 *        200:
 *          description: payee salary successfully updated
 *        403:
 *          description: Forbidden
 * 
 * 
 *  /api/user/payee/benefits/{payeeId}:
 *    put:
 *      summary: update payee bank details
 *      tags:
 *        - Payee
 *      description: Update payee bank details 
 *      parameters: 
 *        - in: path
 *          required: true
 *          name: payeeId
 *          example: 'jneskyu738yh5b73wa$^#%skjvhb'
 *          schema:
 *            type: string
 *        - in: body
 *          required: true
 *          name: bankDetails
 *          schema:
 *            type: object
 *            $ref: '#components/schemas/Payee-benefits'
 *      security:
 *        - jwt: []
 *      responses:
 *        200:
 *          description: payee salary successfully updated
 *        403:
 *          description: Forbidden
 * 
 */

/**
 * @swagger
 * paths:
 *  /api/schedules:
 *    get:
 *      summary: Get Schedule list
 *      tags:
 *        - Schedule
 *      description: Get Schedule list 
 *      security:
 *        - jwt: []
 *      responses:
 *        200:
 *          description: payee salary successfully updated
 *        403:
 *          description: Forbidden
 */

/**
 * @swagger
 * paths:
 *  /api/History:
 *    get:
 *      summary: Get user history - this also require user JWT authorization
 *      tags:
 *        - History
 *      description: Get user history - this also require user JWT authorization 
 *      security:
 *        - jwt: []
 *      responses:
 *        200:
 *          description: payee salary successfully updated
 *        403:
 *          description: Forbidden
 */