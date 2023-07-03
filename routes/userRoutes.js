const express = require("express");
const route = express.Router();

const {
    registerUser,
    loginUser,
    forgetPassword,
    resetPassword,
} = require("../controllers/v1/userController");

const validateToken = require("../middlewares/validateTokenMiddleware");

//validation
const {
    registerUserValidator,
    loginUserValidator,
    forgetPasswordValidator,
    resetPasswordValidator,
} = require("../validations/userValidations");

//resourse Validator
const resourseValidator = require("../middlewares/resourseValidator");

route.post("/register", resourseValidator(registerUserValidator), registerUser);

route.post("/login", resourseValidator(loginUserValidator), loginUser);

route.post(
    "/forget-password",
    validateToken,
    resourseValidator(forgetPasswordValidator),
    forgetPassword
);

route.post(
    "/reset-password",
    resourseValidator(resetPasswordValidator),
    resetPassword
);

module.exports = route;
