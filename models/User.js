const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            unique: [true, "email is already registered"],
        },
        password: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        forgetPasswordToken: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
