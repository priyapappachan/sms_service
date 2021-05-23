const Sequelize = require('sequelize');
const config = require("../config/config");
const sequelize = new Sequelize(config.db.dbUrl);
var account = sequelize.define('account', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    auth_id : Sequelize.STRING,
    username : Sequelize.STRING

}, {tableName : 'account'});

module.exports = sequelize.model('account', account);