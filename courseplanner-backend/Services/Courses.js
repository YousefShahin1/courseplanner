const routes = require("express").Router();
const Course = require("../Models/Course");
const data = require("../data.json");
const { distance, closest } = require("fastest-levenshtein");

routes.get("/search/:subject/:courseNumber/:suffix?", async (req, res) => {
    let subject = req.params.subject;
    let courseNumber = req.params.courseNumber;
    let suffix;
    if (req.params.suffix) {
        suffix = req.params.suffix;
    }

    //Find all the matching courses
    const courses = await Course.find({
        subject: subject.toUpperCase(),
        courseNumber: {
            $regex: req.params.suffix ? courseNumber + suffix : courseNumber,
        },
    }).exec();

    res.send({ result: courses });
});

routes.get("/pop", async (req, res) => {
    data.forEach(async (i, index) => {
        let course = new Course({
            id: index,
            subject: i.subject,
            courseNumber: i.catalog_nbr,
            className: i.className,
            classNumber: i.course_info[0].class_nbr,
            startTime: i.course_info[0].start_time,
            endTime: i.course_info[0].end_time,
            days: i.course_info[0].days,
        });

        const savedCourse = await course.save();
    });

    res.send({ msg: "success" });
});

routes.post("/searchbykeywords", async (req, res) => {
    let input = req.body.input;

    input = input.toUpperCase();
    console.log(input);

    let smallest = -1;

    let resultSet = await Course.find({});

    let returnSet = [];

    resultSet.forEach((i) => {
        let dists = [];

        input.split(" ").forEach((x) => {
            i.className.split(" ").forEach((name) => {
                dists.push(distance(x, name.toUpperCase()));
            });
        });

        let d = Math.min(...dists);
        //console.log(d);

        if (smallest == -1) smallest = d;
        else if (d < smallest) smallest = d;

        returnSet.push({
            id: i.id,
            subject: i.subject,
            courseNumber: i.courseNumber,
            className: i.className,
            classNumber: i.classNumber,
            startTime: i.startTime,
            endTime: i.endTime,
            days: i.days,
            distance: d,
        });
    });

    return res.send({
        result: returnSet
            .filter((i) => i.distance < smallest + 2)
            .sort((a, b) =>
                a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0
            ),
    });
});

module.exports = routes;
