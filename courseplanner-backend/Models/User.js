const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    schedules: {
        type: Array,
        default: [],
    },
});

module.exports = mongoose.model("User", UserSchema);
