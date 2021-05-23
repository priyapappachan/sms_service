//imports
const userService = require('./userService');

// authentication
const authenticate = async (req, res, next) => {

   // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(403).json({ message: 'account not found' });
    }

    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, authId] = credentials.split(':');
    user = await userService.authenticate({ username, authId });
    if (!user) {
        console.log(user);
        return res.status(403).json({ message: 'account not found' });
    }

    // attach account id to request object
    req.accountId = user.id

    next();

}

// Exported functions
module.exports = {
    authenticate: authenticate
};