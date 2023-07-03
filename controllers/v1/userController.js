const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const logger = require("../../logger");

//utility function
const generateToken = (user) => {
    try {
        const token = jwt.sign(
            {
                user: {
                    email: user.email,
                    name: user.name,
                    id: user.id,
                },
            },
            process.env.SECTRET_ACCESS_KEY,
            { expiresIn: "10m" }
        );
        return token;
    } catch (error) {
        throw new Error(error);
    }
};

const registerUser = asyncHandler(async (req, res) => {
    /**
        #swagger.summary = "Register"
        #swagger.tags = ['User']
        #swagger.description="Endpoint to register new User"
     */

    const { name, email, password } = req.body;

    try {
        const existingUser = await User.find({ email });

        if (existingUser.length !== 0) {
            logger.error("User already exists");
            return res.status(400).json({
                status: false,
                message: `${email}  User already exists`,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (user) {
            logger.info("User  created Sucessfully");

            const token = generateToken(user);

            return res.status(201).json({
                status: true,
                message: "User created Sucessfully",
                user: { email: user.email, name: user.name, id: user._id },
                token,
            });
        }
    } catch (error) {
        logger.error(error.toString());
        return res
            .status(500)
            .json({ status: false, message: error.toString() });
    }
});
const loginUser = asyncHandler(async (req, res) => {
     /**
        #swagger.summary = "Login"
        #swagger.tags = ['User']
        #swagger.description="Endpoint to Login  User"
     */

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        const isValidUser = await bcrypt.compare(password, user.password);

        if (isValidUser) {
            const token = generateToken(user);

            return res.status(200).json({
                status: true,
                token: token,
                message: "User logged in sucessfully",
                user: { email: user.email, name: user.name, id: user._id },
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "User not found",
            });
        }
    } catch (error) {
        logger.error(error.toString());
        return res
            .status(500)
            .json({ status: false, message: error.toString() });
    }
});

module.exports = { registerUser, loginUser };
