const Joi = require("joi");

const createTaskValidation = Joi.object({
    title: Joi.string().min(3).max(30).required().messages({
        "any.required": "Title is required",
        "string.min": "Title must be at least 3 characters long.",
        "string.max": "Title must not exceed 30 characters.",
    }),
    description: Joi.string().min(5).max(100).required().messages({
        "any.required": "description is required",
        "string.min": "description must be at least 5 characters long.",
        "string.max": "description must not exceed 100 characters.",
    }),
});

const updateTaskValidation = Joi.object({
    title: Joi.string().min(3).max(30).optional().messages({
        "string.min": "Title must be at least 3 characters long.",
        "string.max": "Title must not exceed 30 characters.",
    }),
    description: Joi.string().min(5).max(100).optional().messages({
        "string.min": "Description must be at least 5 characters long.",
        "string.max": "Description must not exceed 100 characters.",
    }),
});

 
module.exports = {
    createTaskValidation,
    updateTaskValidation,
 
};
