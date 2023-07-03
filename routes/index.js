const express = require("express");
const router = express.Router();

//middlewares

const errorHandlerMiddleware = require("../middlewares/errorHandlerMiddleware");

//routes
const userRoutes = require("./userRoutes");
const taskRoutes = require("./taskRoutes");

router.use("/user", userRoutes);
router.use("/task", taskRoutes);

router.use(errorHandlerMiddleware);

module.exports = router;
