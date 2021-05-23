//imports
const smsService = require('../services/smsService');

//test to check if all params are present
describe('check if all params are present', () => {
    it('Parameters check', () => {
        sms = {
            "from": "1234567",
            "to": "441235330078",
            "text": "hello"
        }
        expect(smsService.missingParams(sms)).toEqual({ "missing": false });
    });
});

//test to check if all params are valid
describe('check if all params are valid', () => {
    it('Validation check', () => {
        sms = {
            "from": "1234567",
            "to": "441235330078",
            "text": "hello"
        }
        expect(smsService.validateParams(sms)).toEqual({ "valid": true });
    });
});

//test to check if number is present in db
describe('check if number is present in db', () => {
    it('Phone number check in db', () => {
        accountId = 3;
        to = "441235330078";
        return smsService.checkNumber(accountId, to).then(data => {
            expect(data).toBe(true);
          });
    });
});

