const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please enter name"],
        },
        email: {
            type: String,
            required: [true, "please enter email"],
            unique: [true, "email is already registered"],
        },
        password: {
            type: String,
            required: [true, "password is required "],
        },
    },
    {
        timestamps: true,
    }
);



module.exports = mongoose.model("User", userSchema);
