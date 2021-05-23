const express = require('express');
const smsController = require('../controllers/smsController');
const authService = require('../services/authService');
const router = express.Router();

router.post('/inbound/sms/', authService.authenticate, smsController.smsInbound);

router.post('/outbound/sms/', authService.authenticate, smsController.smsOutbound);

router.use('*', smsController.noAPI);

module.exports = router;