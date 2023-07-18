const redisClient = require('../config/redisClient');
const constants = require('../constants');

//utility functions

const checkTaskAvilability = (task, response) => {
    if (!task) {
        response.status(404).json({ status: false, message: 'Task not found' });
        return false;
    }
    return true;
};

const checkUserAuthorization = (task, request, response) => {
    if (task.user_id.toString() !== request.user.id) {
        response.status(403).json({
            status: false,
            message: 'Unauthorized Access to Task',
        });
        return false;
    }
    return true;
};

const setCacheOnCreateTask = async (req, task) => {
    await redisClient.set(
        `task_${req.user.id}:${task._id}`,
        JSON.stringify(task),
        { EX: constants.cahceExpireTime }
    );

    const cacheedTask = JSON.parse(
        await redisClient.get(`task_${req.user.id}`)
    );

    if (cacheedTask) {
        cacheedTask.push(task);

        await redisClient.set(
            `task_${req.user.id}`,
            JSON.stringify(cacheedTask),
            {
                EX: constants.cahceExpireTime,
            }
        );
    }
};

const setCacheOnUpdateTask = async (req, updatedTask) => {
    await redisClient.set(
        `task_${req.user.id}:${updatedTask._id}`,
        JSON.stringify(updatedTask),
        { EX: constants.cahceExpireTime }
    );

    const cacheedTask = JSON.parse(
        await redisClient.get(`task_${req.user.id}`)
    );

    if (cacheedTask) {
        const updated = cacheedTask.find(
            (t) => t._id.toString() === updatedTask._id.toString()
        );
        cacheedTask.splice(cacheedTask.indexOf(updated), 1);

        cacheedTask.push(updatedTask);

        await redisClient.set(
            `task_${req.user.id}`,
            JSON.stringify(cacheedTask),
            {
                EX: constants.cahceExpireTime,
            }
        );
    }
};
const setCacheOnDeleteTask = async (req, deletedTask) => {
    await redisClient.del(`task_${req.user.id}:${deletedTask._id}`);

    const cacheedTask = JSON.parse(
        await redisClient.get(`task_${req.user.id}`)
    );

    if (cacheedTask) {
        const deleted = cacheedTask.find(
            (t) => t._id.toString() === deletedTask._id.toString()
        );
        
        cacheedTask.splice(cacheedTask.indexOf(deleted), 1);
        await redisClient.set(
            `task_${req.user.id}`,
            JSON.stringify(cacheedTask),
            {
                EX: constants.cahceExpireTime,
            }
        );
    }
};

module.exports = {
    setCacheOnCreateTask,
    setCacheOnDeleteTask,
    setCacheOnUpdateTask,
    checkTaskAvilability,
    checkUserAuthorization,
};
