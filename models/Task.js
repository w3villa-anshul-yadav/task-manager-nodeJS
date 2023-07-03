const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
});

module.exports = mongoose.model("Task", taskSchema);
