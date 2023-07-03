const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const TokenGenerator = require("../../config/tokenGenerator");

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
                    phoneNumber: user.phoneNumber,
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

    const { name, email, password, phoneNumber } = req.body;

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
            phoneNumber,
        });

        if (user) {
            logger.info("User  created Sucessfully");

            const token = generateToken(user);

            return res.status(201).json({
                status: true,
                message: "User created Sucessfully",
                user: {
                    email: user.email,
                    name: user.name,
                    id: user._id,
                    phoneNumber: user.phoneNumber,
                },
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
                user: {
                    email: user.email,
                    name: user.name,
                    id: user._id,
                    phoneNumber: user.phoneNumber,
                },
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

const forgetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const isValidUser = req.user.email === email;

    if (!isValidUser) {
        return res.status(400).json({
            status: false,
            message:
                "Email is not associated with your accoun, You Can Change only own password",
        });
    }

    try {
        const forgetToken = TokenGenerator.generate();

        await User.updateOne({ email }, { forgetPasswordToken: forgetToken });

        return res.status(200).json({
            status: true,
            token: forgetToken,
            message: "This is token to reset password ",
        });
    } catch (error) {
        logger.error(error.toString());
        return res
            .status(500)
            .json({ status: false, message: error.toString() });
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    const { password, forgetPasswordToken } = req.body;
    try {
        const isValidToken = TokenGenerator.isValid(forgetPasswordToken);

        if (!isValidToken) {
            return res.status(400).json({
                status: false,
                message: "Token is invalid",
            });
        }

        const user = await User.findOne({
            forgetPasswordToken: forgetPasswordToken.trim(),
        });

        if (user) {
            const isSamePassword = await bcrypt.compare(
                password,
                user.password
            );

            if (isSamePassword) {
                return res.status(400).json({
                    status: false,
                    message: "Password is same as previous Choose a new One",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await User.updateOne(
                { forgetPasswordToken },
                { password: hashedPassword, forgetPasswordToken: null }
            );

            return res.status(200).json({
                status: true,
                message: "Password Updated Sucessfully",
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "Token is invalid",
            });
        }
    } catch (error) {
        logger.error(error.toString());
        return res
            .status(500)
            .json({ status: false, message: error.toString() });
    }
});
module.exports = { registerUser, loginUser, forgetPassword, resetPassword };
