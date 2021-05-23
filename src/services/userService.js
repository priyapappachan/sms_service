const account = require('../models/account');

//check user exists in db
const authenticate = async ({username, authId}) => {

    user = await account.findOne({ where: { username: username, auth_id: authId }, attributes: ['id'] });
    if (user) {
        return user;
    } else {
        return null;
    }
}

// Exported functions
module.exports = {
    authenticate: authenticate,

};