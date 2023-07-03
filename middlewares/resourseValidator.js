const resourseValidator = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(
            { ...req.body },
            { abortEarly: false }
        );

        if (error) {
            const message = error.details.map((err) => err.message).join(",");
            res.status(400);
            throw new Error(message);
        } else {
            next();
        }
    };
};

module.exports = resourseValidator;
