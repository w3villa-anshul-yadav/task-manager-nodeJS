const swaggerAutogen = require("swagger-autogen")();
const outputFile = "./swagger/swagger.json";
const endpointsFiles = ["../app.js", "../controllers/v1/**/*.js"];
const doc = {
    info: {
        version: "1.0.0",
        title: "Task API Documentation",
        description: "Task API Documentation",
    },
    host: "localhost:5000",
    basePath: "/",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
        {
            name: "User",
            description:
                "Endpoints to register, login, forget password and reset password",
        },
        {
            name: "Task",
            description: "Endpoints to get, create, update and delete a task",
        },
    ],
    definitions: {
        User: {
            name: "exampleUser",
            email: "example@gmail.com",
            password: "Password@123",
            phoneNumber: "Password@123",
        },
        Task: {
            title: "Task title",
            description: "Task description",
        },
        TasksResponse: {
            success: true,
            msg: "response message",
            tasks: [],
        },
        UpdateTask: {
            title: "Task title",
            description: "Task description",
            completed: true,
        },
        Login: {
            email: "example@gmail.com",
            password: "Password@123",
        },
        ForgetPassword: {
            email: "example@gmail.com",
        },
        ForgetPasswordResponse: {
            success: true,
            token: "",
            msg: "response message",
        },
        ResetPassword: {
            password: "Password@123",
            confirmPassword: "Password@123",
            token: "",
        },
        ResetPasswordResponse: {
            success: true,
            msg: "response message",
        },
        AuthResponse: {
            token: "",
            success: true,
            msg: "response message",
        },
        TaskResponse: {
            success: true,
            msg: "response message",
            task: {},
        },
        SuccessResponse: {
            success: true,
            msg: "response message",
        },
        BadRequest: {
            success: false,
            msg: "response message",
        },
        NotFound: {
            success: false,
            msg: "response message",
        },
        Unauthenticated: {
            success: false,
            msg: "response message",
        },
        InternalServerError: {
            success: false,
            msg: "response message",
        },
    },
};
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require("../app.js");
});
