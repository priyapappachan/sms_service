const asyncRedis = require("async-redis");  
const redisPort = 6379
const client = asyncRedis.createClient(redisPort);

async function addCount(key) {
    return await client.setex(key, 86400, 1);
}

const getCount = async (key) => {
    console.log('key : ' + key);
    const count = await client.get(key);
    console.log('API count : ' + count);
    return parseInt(count);
}

async function updateCount(key, count) {
    return await client.set(key, count + 1);
    
}

async function checkKeyExists(key) {
    return await client.exists(key)
}

async function addNumber(from, to) {
    return await client.setex(from + ':' + to, 14400, 1);
}

// Exported functions
module.exports = {
    addCount : addCount,
    getCount : getCount,
    updateCount : updateCount,
    checkKeyExists : checkKeyExists,
    addNumber : addNumber
};