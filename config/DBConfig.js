const mongoose = require("mongoose");
const logger = require("../logger");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        logger.info("Connected to database");
    } catch (error) {
        logger.error(error);
    }
};

module.exports = connectDB;
