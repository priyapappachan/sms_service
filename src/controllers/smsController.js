//imports
const smsService = require('../services/smsService');
const cacheService = require('../services/cacheService');

exports.smsInbound = async (req, res, next) => {

    try {
        sms = req.body;
        console.log('from : ' + sms.from + 'to : ' + sms.to + 'text : ' + sms.text);

        //check missing params
        result = smsService.missingParams(sms);
        console.log(result);
        if (result.missing) {
            res.json(
                {
                    'message': '',
                    'error': result.error
                }
            );
        }

        //validate params
        result = smsService.validateParams(sms);
        if (!result.valid) {
            res.json(
                {
                    'message': '',
                    'error': result.error
                }
            );
        }

        //check if 'to' in the phone_number table for this account
        result = await smsService.checkNumber(req.accountId, sms.to);
        if (!result) {
            res.json(
                {
                    'message': '',
                    'error': 'to parameter not found'
                }
            );
        }

        //add from, to pair to cache
        text = sms.text.replace(/(\r\n|\n|\r)/gm, "");
        if (text.trim() === 'STOP') {
            cacheService.addNumber(sms.from, sms.to);
        }

        //return success result
        res.json(
            {
                'message': 'inbound sms ok',
                'error': ''
            }
        );
    } catch (err) {
        //error
        console.log(err);
        res.json(
            {
                'message': '',
                'error': 'unknown failure'
            }
        );
    };

}

exports.smsOutbound = async (req, res, next) => {

    try {
        sms = req.body;
        console.log('from : ' + sms.from + 'to : ' + sms.to + 'text : ' + sms.text);

        //check missing params
        result = smsService.missingParams(sms);
        console.log(result);
        if (result.missing) {
            res.json(
                {
                    'message': '',
                    'error': result.error
                }
            );
        }

        //validate params
        result = smsService.validateParams(sms);
        if (!result.valid) {
            res.json(
                {
                    'message': '',
                    'error': result.error
                }
            );
        
        }
    
        //check if 'to' in the phone_number table for this account
        result = await smsService.checkNumber(req.accountId, sms.from);
        if (!result) {
            res.json(
                {
                    'message': '',
                    'error': 'from parameter not found'
                }
            );
        }

        //check blocked by STOP request
        key = sms.to + ':' + sms.from;
        var reply = await cacheService.checkKeyExists(key);            
            if (reply === 1) {
                console.log('key exists in cache');
                res.json(
                    {
                        'message': 'sms from ' + sms.from + ' to ' + sms.to + ' blocked by STOP request',
                        'error': ''
                    }
                );
        
        }

        //check API limit 
        var count = await cacheService.getCount(sms.from);
        if (count) {
            console.log('count : ' + count);
            if (count > 50) {
                res.json(
                    {
                        'message': '',
                        'error': 'limit reached for from ' + sms.from
                    }
                );
            }
            console.log('cache exists')
            await cacheService.updateCount(sms.from, count);
        } else {
            console.log('cache does not exist')
            await cacheService.addCount(sms.from);
        }

        //return success result
        res.json(
            {
                'message': 'outbound sms ok',
                'error': ''
            }
        );
        
    } catch (err) {
        //error
        console.log(err);
        res.json(
            {
                'message': '',
                'error': 'unknown failure'
            }
        );
    };

}

exports.noAPI = async (req, res, next) => {

    return res.status(405).json({ error: 'API doesnot exist' });

}
