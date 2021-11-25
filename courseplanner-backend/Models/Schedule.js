const mongoose = require("mongoose");

const ScheduleSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastEdited: {
        type: Date,
        default: Date.now(),
    },
    description: {
        type: String,
        required: false,
    },
    courses: {
        type: Array,
        default: [],
    },
});

module.exports = mongoose.model("Schedule", ScheduleSchema);
