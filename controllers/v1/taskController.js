const Task = require("../../models/Task");
const logger = require("../../logger");

//utility functions

const checkTaskAvilability = (task, response) => {
    if (!task) {
        response.status(404).json({ status: false, message: "Task not found" });
        return false;
    }
    return true;
};

const checkUserAuthorization = (task, request, response) => {
    if (task.user_id.toString() !== request.user.id) {
        response.status(403).json({
            status: false,
            message: "Unauthorized Access to Task",
        });
        return false;
    }
    return true;
};

// controller functions
const createTask = async (req, res) => {
    /**
        #swagger.summary = "Create Task"
        #swagger.tags = ['Task']
        #swagger.description="Endpoint to Create new Task"
     */
    const { title, description } = req.body;

    try {
        const task = await Task.create({
            title,
            description,
            user_id: req.user.id,
        });

        if (task) {
            return res
                .status(201)
                .json({ status: true, message: "Task Created", task });
        } else {
            return res
                .status(400)
                .json({ status: false, message: "No Task Created" });
        }
    } catch (error) {
        logger.error(error.toString());
        return res
            .status(500)
            .json({ status: false, message: error.toString() });
    }
};

const getAllTasks = async (req, res) => {
    /**
        #swagger.summary = "Get All Task"
        #swagger.tags = ['Task']
        #swagger.description="Endpoint to get all Task"
     */
    try {
        const tasks = await Task.find({ user_id: req.user.id });
        if (tasks.length === 0) {
            return res
                .status(400)
                .json({ status: false, message: "No Task Found" });
        } else {
            return res
                .status(200)
                .json({ status: true, message: `All Tasks`, tasks });
        }
    } catch (error) {
        logger.error(error.toString());
        return res
            .status(500)
            .json({ status: false, message: error.toString() });
    }
};

const getTask = async (req, res) => {
    /**
        #swagger.summary = "get  Task by id"
        #swagger.tags = ['Task']
        #swagger.description="Endpoint to get Task by id"
     */
    try {
        const task = await Task.findOne({
            _id: req.params.id,
        });

        if (
            checkTaskAvilability(task, res) &&
            checkUserAuthorization(task, req, res)
        ) {
            if (task) {
                return res
                    .status(200)
                    .json({ status: true, message: `Task fetched`, task });
            } else {
                return res
                    .status(400)
                    .json({ status: false, message: "No Task Found" });
            }
        }
    } catch (error) {
        logger.error(error.toString());
        return res
            .status(500)
            .json({ status: false, message: error.toString() });
    }
};

const updateTask = async (req, res) => {
    /**
        #swagger.summary = "Update  Task by id"
        #swagger.tags = ['Task']
        #swagger.description="Endpoint to Update Task by id"
     */
    const { title, description } = req.body;
    try {
        const task = await Task.findOne({
            _id: req.params.id,
        });

        if (
            checkTaskAvilability(task, res) &&
            checkUserAuthorization(task, req, res)
        ) {
            if (task) {
                const updatedTask = await Task.findByIdAndUpdate(
                    { _id: req.params.id },
                    { title, description },
                    { new: true }
                );
                if (updatedTask) {
                    return res.status(200).json({
                        status: true,
                        message: `Task Updated`,
                        updatedTask,
                    });
                }
            }
        }
    } catch (error) {
        logger.error(error.toString());
        return res
            .status(500)
            .json({ status: false, message: error.toString() });
    }
};
const deleteTask = async (req, res) => {
    /**
        #swagger.summary = "delete  Task by id"
        #swagger.tags = ['Task']
        #swagger.description="Endpoint to delete Task by id"
     */
    try {
        const task = await Task.findOne({
            _id: req.params.id,
        });

        if (
            checkTaskAvilability(task, res) &&
            checkUserAuthorization(task, req, res)
        ) {
            await Task.deleteOne({ _id: req.params.id });

            return res.status(200).json({
                status: true,
                message: `Task Deleted with id ${req.params.id}`,
            });
        }
    } catch (error) {
        logger.error(error.toString());
        return res
            .status(500)
            .json({ status: false, message: error.toString() });
    }
};

module.exports = { createTask, updateTask, getAllTasks, getTask, deleteTask };
