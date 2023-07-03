const Joi = require("joi");

const registerUserValidator = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Please enter name.",
    }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.email": "Please enter a valid email address.",
            "any.required": "Please enter email.",
        }),
    password: Joi.string()
        .min(6)
        .max(12)
        .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
        .required()
        .messages({
            "string.min": "Password must be at least 6 characters long.",
            "string.max": "Password must not exceed 12 characters.",
            "string.pattern.base":
                "Password must contain at least one uppercase letter, one number, and one special character (!@#$%^&*).",
            "any.required": "Password is required.",
        }),
    confirmPassword: Joi.string()
        .min(6)
        .max(12)
        .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
        .required()
        .valid(Joi.ref("password"))
        .messages({
            "any.only": "Confirm password must match the password.",
            "string.min":
                " confirm Password must be at least 6 characters long.",
            "string.max": "confirm Password must not exceed 12 characters.",
            "string.pattern.base":
                "confirm Password must contain at least one uppercase letter, one number, and one special character (!@#$%^&*).",
            "any.required": "confirm Password is required.",
        }),
});

const loginUserValidator = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.email": "Please enter a valid email address.",
            "any.required": "Please enter email.",
        }),
    password: Joi.string()
        .min(6)
        .max(12)
        .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
        .required()
        .messages({
            "string.min": "Password must be at least 6 characters long.",
            "string.max": "Password must not exceed 12 characters.",
            "string.pattern.base":
                "Password must contain at least one uppercase letter, one number, and one special character (!@#$%^&*).",
            "any.required": "Password is required.",
        }),
});

module.exports = { registerUserValidator, loginUserValidator };
