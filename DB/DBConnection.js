const mongoose = require('mongoose');
const logger = require('../logger');
const DBConfig = require('../config/DBConfig');

const connectDB = async () => {
    // Test Environment
    if (process.env.NODE_ENV === 'test') {
        const host = DBConfig.test.HOST;
        const port = DBConfig.test.PORT;
        const db = DBConfig.test.DB;
        try {
            await mongoose.connect(host + ':' + port + '/' + db);
            logger.info('Connected to database');
        } catch (error) {
            logger.error(error);
        }
    }
    // Test Environment
    if (process.env.NODE_ENV === 'development') {
        const host = DBConfig.development.HOST;
        const port = DBConfig.development.PORT;
        const db = DBConfig.development.DB;
        try {
            await mongoose.connect(host + ':' + port + '/' + db);
            logger.info('Connected to database');
        } catch (error) {
            logger.error(error);
        }
    }
};

module.exports = connectDB;
