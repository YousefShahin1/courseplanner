const routes = require("express").Router();
const { verifyUser } = require("./Auth");
const User = require("../Models/User");
const Course = require("../Models/Course");
routes.post("/create", verifyUser, async (req, res) => {
    let name = req.body.name;
    let description = req.body.description;

    let currentUser = req.authData.user;

    //Check if the user exists
    const user = await User.findOne({ uuid: currentUser }).exec();

    let id = 0;

    //for (let i = 0; i < user.schedules.langth; i++) {
    //if (user.schedules[0].id > id) id = user.schedules[0].id;
    //console.log(id);
    //}
    user.schedules.forEach((i) => {
        if (i.id > id) id = i.id;
        console.log(id);
    });

    console.log("done");
    let schedule = {
        id: id + 1,
        name: name,
        description: description,
        lastEdited: Date.now(),
        courses: [],
    };

    user.schedules.push(schedule);

    user.markModified("schedules");
    try {
        await user.save();
    } catch (err) {
        //Any database error
        return res.status(400).send({ err: err });
    }

    return res.send({ result: user.schedules });
});

routes.delete("/delete/:id", verifyUser, async (req, res) => {
    let id = req.params.id;
    let currentUser = req.authData.user;

    //Check if the user exists
    const user = await User.findOne({ uuid: currentUser }).exec();

    let schedules = [];
    user.schedules.forEach((i) => {
        if (i.id != id) schedules.push(i);
    });

    user.schedules = schedules;
    user.markModified("schedules");
    try {
        await user.save();
    } catch (err) {
        //Any database error
        return res.status(400).send({ err: err });
    }

    return res.send({ result: "Schedule Deleted Successfully" });
});

routes.post("/update/:id", verifyUser, async (req, res) => {
    let id = req.params.id;

    let name = req.body.name;
    let description = req.body.description;

    let currentUser = req.authData.user;

    //Check if the user exists
    const user = await User.findOne({ uuid: currentUser }).exec();

    let schedules = [];
    let schedule;

    user.schedules.forEach((i) => {
        if (i.id != id) schedules.push(i);
        else schedule = i;
    });

    if (name && name != "") {
        schedule.name = name;
    }

    if (description && description != "") {
        schedule.description = description;
    }

    schedules.push(schedule);

    user.schedules = schedules;
    user.markModified("schedules");
    try {
        await user.save();
    } catch (err) {
        //Any database error
        return res.status(400).send({ err: err });
    }

    return res.send({ result: schedules });
});

routes.post("/addCourse/:id/:courseId", verifyUser, async (req, res) => {
    let id = req.params.id;
    let courseId = req.params.courseId;

    let currentUser = req.authData.user;

    //Check if the user exists
    const user = await User.findOne({ uuid: currentUser }).exec();

    let schedules = [];
    let schedule;

    user.schedules.forEach((i) => {
        if (i.id != id) schedules.push(i);
        else schedule = i;
    });

    let found = schedule.courses.find((i) => i == courseId);

    if (!found) {
        schedule.courses.push(courseId);
    }

    schedules.push(schedule);

    user.schedules = schedules;
    user.markModified("schedules");
    try {
        await user.save();
    } catch (err) {
        //Any database error
        return res.status(400).send({ err: err });
    }

    return res.send({ result: "Course Added Successfully" });
});

routes.post("/removeCourse/:id/:courseId", verifyUser, async (req, res) => {
    let id = req.params.id;
    let courseId = req.params.courseId;

    let currentUser = req.authData.user;

    //Check if the user exists
    const user = await User.findOne({ uuid: currentUser }).exec();

    let schedules = [];
    let schedule;

    user.schedules.forEach((i) => {
        if (i.id != id) schedules.push(i);
        else schedule = i;
    });

    let courses = [];

    schedule.courses.forEach((i) => {
        if (i != courseId) courses.push(i);
    });

    schedule.courses = courses;

    schedules.push(schedule);

    user.schedules = schedules;
    user.markModified("schedules");
    try {
        await user.save();
    } catch (err) {
        //Any database error
        return res.status(400).send({ err: err });
    }

    return res.send({ result: "Course Removed Successfully" });
});

routes.get("/view/:id", verifyUser, async (req, res) => {
    let id = req.params.id;
    let currentUser = req.authData.user;

    //Check if the user exists
    const user = await User.findOne({ uuid: currentUser }).exec();

    let schedule;

    user.schedules.forEach((i) => {
        if (i.id == id) schedule = i;
    });

    const courses = await Course.find({
        id: { $in: schedule.courses },
    }).exec();

    return res.send({ result: courses });
});

routes.get("/all", verifyUser, async (req, res) => {
    let currentUser = req.authData.user;

    //Check if the user exists
    const user = await User.findOne({ uuid: currentUser }).exec();

    return res.send({ result: user.schedules });
});

module.exports = routes;
