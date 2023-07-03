const express = require("express");
const route = express.Router();

const {
    createTaskValidation,
    updateTaskValidation,
    taskIdValidation,
} = require("../validations/taskValidations");

const validateTokenMiddleware = require("../middlewares/validateTokenMiddleware");

//controller functions
const {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask,
} = require("../controllers/v1/taskController");
const resourseValidator = require("../middlewares/resourseValidator");

route.use(validateTokenMiddleware);

route.get("/", getAllTasks);

route.get("/:id", getTask);

route.post("/", resourseValidator(createTaskValidation), createTask);

route.patch(
    "/:id",

    resourseValidator(updateTaskValidation),
    updateTask
);

route.delete("/:id", deleteTask);

module.exports = route;
