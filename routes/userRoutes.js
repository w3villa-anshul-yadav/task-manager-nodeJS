const express = require("express");
const route = express.Router();

const { registerUser, loginUser } = require("../controllers/v1/userController");

//validation
const {
    registerUserValidator,
    loginUserValidator,
} = require("../validations/userValidations");

//resourse Validator
const resourseValidator = require("../middlewares/resourseValidator");

route.post("/register", resourseValidator(registerUserValidator), registerUser);

route.post("/login", resourseValidator(loginUserValidator), loginUser);

module.exports = route;
