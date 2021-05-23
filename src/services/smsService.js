const phoneNumber = require("../models/phoneNumber");

//check if any params are missing
const missingParams = (sms) => {

    if (!sms.from) {
        result = {
            'missing': true,
            'error': 'from is missing'
        }
        return result;
    } 
    if (!sms.to) {
        result = {
            'missing': true,
            error: 'to is missing'
        }
        return result;
    } 
    if (!sms.text) {
        result = {
            'missing': true,
            error: 'text is missing'
        }
        return result;
    } 
    result = {
        'missing': false
    }
    return result;
}

//validate params - check min and max length
const validateParams = (sms) => {

    if (!sms.from.match(/^.{6,16}$/)) {
        result = {
            'valid': false,
            'error': 'from is invalid'
        }
        return result;
    } 
    if (!sms.to.match(/^.{6,16}$/)) {
        result = {
            valid: false,
            error: 'to is invalid'
        }
        return result;
    } 
    if (!sms.text.match(/^.{1,20}$/)) {
        result = {
            valid: false,
            error: 'text is invalid'
        }
        return result;
    } 
    result = {
        valid: true
    }
    return result;
}

//check number exists in db for logged in account id
const checkNumber = async (accountId, number) => {

    console.log(accountId);
    console.log('accound : id - ' + accountId + ', number - ' + number);
    count = await phoneNumber.count({ where: { account_id: accountId, number: number } });
    if (count != 0) {
        return true;
    } else {
        return false;
    }
}

// Exported functions
module.exports = {
    missingParams: missingParams,
    validateParams : validateParams,
    checkNumber : checkNumber
};