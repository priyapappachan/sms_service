const Sequelize = require('sequelize');
const config = require("../config/config");
const sequelize = new Sequelize(config.db.dbUrl);
var phoneNumber = sequelize.define('phone_number', {

    id:  {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    number : Sequelize.STRING,
    account_id: {
        type: Sequelize.INTEGER,
        references: 'account', 
        referencesKey: 'id'
  }

}, {tableName : 'phone_number'});

module.exports = sequelize.model('phone_number', phoneNumber);