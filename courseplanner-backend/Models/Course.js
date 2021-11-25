const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    subject: {
        type: String,
        required: true,
    },
    courseNumber: {
        type: String,
        required: true,
    },
    className: {
        type: String,
        required: true,
    },
    classNumber: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: false,
    },
    endTime: {
        type: String,
        required: false,
    },
    days: {
        type: Array,
        default: [],
    },
});

module.exports = mongoose.model("Course", CourseSchema);
