const { SUCCESS, ERROR} = require("../config")

/**
 * This method is use to format and structure response data
 * @param {Object} data - data to return back to the consumer if any
 * @param {string} message - descriptive message for the consumer
 * @param {boolean} mtype -message type <true or false> - true for success and false for error or failure
 * @returns Object
 */
const getMessage = (retData, message, mtype) => {
    let msg;
    if (mtype === SUCCESS) {
         msg = {
            status: true,
            data: retData ,
            message: message
        }

        return msg;
    }
    else if(mtype === ERROR) {
        msg = {
            status: false,
            message: message,
            error: retData
        }

        return msg;
    }
}

module.exports = getMessage;