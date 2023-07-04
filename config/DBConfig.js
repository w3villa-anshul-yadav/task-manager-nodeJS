require("dotenv").config();

module.exports = {
    development: {
        HOST: process.env.MONGODB_LOCAL_HOST,
        PORT: process.env.MONGODB_LOCAL_PORT,
        DB: process.env.MONGODB_LOCAL_DB,
        
    },
    test: {
        HOST: process.env.MONGODB_TEST_HOST,
        PORT: process.env.MONGODB_TEST_PORT,
        DB: process.env.MONGODB_TEST_DB,
    },
};
