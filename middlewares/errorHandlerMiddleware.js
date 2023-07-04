const statusCode = require("../constants");

const errorHandler = (error, request, response, next) => {
    const receivedStatusCode = response.statusCode || 500;

    switch (receivedStatusCode) {
        case statusCode.NOT_FOUND:
          return  response.json({
                type: "NOT FOUND",
                message: error.message,
                stackTrace: error.stack,
            });
            break;

        case statusCode.FORBIDDEN:
           return response.json({
                type: "Forbidden",
                message: error.message,
                stackTrace: error.stack,
            });
            break;

        case statusCode.UNAUTHORIZED:
            response.json({
                type: "NOT FOUND",
                message: error.message,
                stackTrace: error.stack,
            });
            break;

        case statusCode.VALIDATION_ERROR:
          return  response.json({
                type: "VALIDATION ERROR",
                message: error.message,
                stackTrace: error.stack,
            });
            break;

        case statusCode.SERVER_ERROR:
           return response.json({
                type: "SERVER ERROR",
                message: error.message,
                stackTrace: error.stack,
            });
            break;

        default:
            console.log("NO Error , All Good");
            break;
    }
    next();
};
module.exports = errorHandler;
