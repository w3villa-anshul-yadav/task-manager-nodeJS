const express = require("express");
const router = express.Router();

//middlewares

const errorHandlerMiddleware = require("../middlewares/errorHandlerMiddleware");

//routes
const userRoutes = require("./userRoutes");

router.use("/user", userRoutes);

router.use(errorHandlerMiddleware);

module.exports = router;
