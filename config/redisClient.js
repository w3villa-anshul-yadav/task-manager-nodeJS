const redis = require('redis');
const logger = require('../logger');

let redisClient;
try {
    if (process.env.NODE_ENV === 'production') {
        redisClient = redis.createClient({
            socket: {
                host: process.env.REDIS_HOST_PRODUCTION,
                port: process.env.REDIS_PORT_PRODUCTION,
            },
            username: process.env.REDIS_USERNAME_PRODUCTION,
            password: process.env.REDIS_PASSWORD_PRODUCTION,
        });
    } else {
        redisClient = redis.createClient();
        redisClient
            .connect()
            .then(() => {
                logger.info('connected to redis server', { at: new Error() });
            })
            .catch((error) => {
                throw new Error(error);
            });
    }
} catch (error) {
    logger.error('Error in connecting to REDIS server', { at: error });
    throw new Error('Error in connecting to REDIS server');
}

module.exports = redisClient;
