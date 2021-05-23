const account = require('../models/account');

//check user exists in db
const authenticate = async ({id, authId}) => {

    count = await account.count({ where: { id: id, auth_id: authId } });
    if (count != 0) {
        return true;
    } else {
        return false;
    }
}

// Exported functions
module.exports = {
    authenticate: authenticate,

};