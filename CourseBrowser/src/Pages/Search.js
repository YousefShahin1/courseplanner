import { useEffect, useState } from "react";
import "../css/Search.css";

import Courses from "../Services/Courses";
import Schedules from "../Services/Schedules";

export default function Search(props) {
    let [type, setType] = useState(0);

    const [subject, setSubject] = useState("");
    const [courseNumber, setCourseNumber] = useState("");
    const [suffix, setSuffix] = useState("");

    const [keywords, setKeywords] = useState("");

    let [open, setOpen] = useState(false);

    let [list, setList] = useState([]);
    const [schedules, setSchedules] = useState([]);

    const [schedule, setSchedule] = useState();
    let [course, setCourse] = useState({});

    useEffect(() => {
        Schedules.getAll(setSchedules);
    }, []);

    useEffect(() => {
        if (schedules.length > 0) {
            setSchedule(schedules[0].id);
        }
    }, [schedules]);

    return (
        <div
            style={{
                padding: 40,
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                flex: 1,
            }}
        >
            <div
                style={{
                    fontSize: 48,
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    color: "#840144",
                }}
            >
                Search
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 20,
                    borderBottomColor: "#999",
                    borderBottomWidth: 1,
                    borderBottomStyle: "solid",
                    width: 750,
                }}
            >
                <div
                    style={{
                        padding: 15,
                        borderBottomColor: "#840144",
                        borderBottomWidth: type == 0 ? 3 : 0,
                        borderBottomStyle: "solid",
                        fontWeight: type == 0 ? "bold" : null,
                        cursor: "pointer",
                    }}
                    onClick={() => setType(0)}
                >
                    Search by Subject and Course Codes
                </div>
                <div
                    style={{
                        padding: 15,
                        borderBottomColor: "#840144",
                        borderBottomWidth: type == 1 ? 3 : 0,
                        borderBottomStyle: "solid",
                        fontWeight: type == 1 ? "bold" : null,
                        cursor: "pointer",
                    }}
                    onClick={() => setType(1)}
                >
                    Search by Keywords
                </div>
            </div>

            <div
                style={{
                    display: type == 0 ? "flex" : "none",
                    gap: 20,
                    marginTop: 30,
                    flexDirection: "row",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "start",
                        flexDirection: "column",
                    }}
                >
                    <div
                        style={{
                            fontSize: 20,
                            marginBottom: 5,
                            fontWeight: "500",
                        }}
                    >
                        Subject
                    </div>
                    <input
                        value={subject}
                        type="text"
                        style={{
                            padding: 15,
                            width: 200,
                            borderRadius: 5,
                            borderWidth: 1,
                        }}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "start",
                        flexDirection: "column",
                    }}
                >
                    <div
                        style={{
                            fontSize: 20,
                            marginBottom: 5,
                            fontWeight: "500",
                        }}
                    >
                        Course Number
                    </div>
                    <input
                        value={courseNumber}
                        type="text"
                        style={{
                            padding: 15,
                            width: 200,
                            borderRadius: 5,
                            borderWidth: 1,
                        }}
                        onChange={(e) => setCourseNumber(e.target.value)}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "start",
                        flexDirection: "column",
                    }}
                >
                    <div
                        style={{
                            fontSize: 20,
                            marginBottom: 5,
                            fontWeight: "500",
                        }}
                    >
                        Suffix
                    </div>
                    <input
                        value={suffix}
                        type="text"
                        style={{
                            padding: 15,
                            width: 200,
                            borderRadius: 5,
                            borderWidth: 1,
                        }}
                        onChange={(e) => setSuffix(e.target.value)}
                    />
                </div>
            </div>

            <div
                style={{
                    display: type == 1 ? "flex" : "none",
                    gap: 20,
                    marginTop: 30,
                    flexDirection: "row",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "start",
                        flexDirection: "column",
                    }}
                >
                    <div
                        style={{
                            fontSize: 20,
                            marginBottom: 5,
                            fontWeight: "500",
                        }}
                    >
                        Keywords
                    </div>
                    <input
                        value={keywords}
                        type="text"
                        style={{
                            padding: 15,
                            width: 500,
                            borderRadius: 5,
                            borderWidth: 1,
                        }}
                        onChange={(e) => setKeywords(e.target.value)}
                    />
                </div>
            </div>
            <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
                <button
                    style={{
                        padding: 15,
                        paddingRight: 30,
                        paddingLeft: 30,
                        backgroundColor: "#840144",
                        color: "white",
                        border: 0,
                        cursor: "pointer",
                        borderRadius: 5,
                        fontSize: 18,
                    }}
                    onClick={() => {
                        if (type == 0)
                            Courses.search(
                                subject,
                                courseNumber,
                                suffix,
                                setList
                            );
                        else Courses.searchKeywords(keywords, setList);
                    }}
                >
                    Search
                </button>

                <button
                    style={{
                        padding: 15,
                        paddingRight: 30,
                        paddingLeft: 30,
                        backgroundColor: "transparent",
                        color: "#444",
                        border: 0,
                        cursor: "pointer",
                        borderRadius: 5,
                        fontWeight: "600",
                        fontSize: 18,
                        borderWidth: 1,
                        borderColor: "#444",
                        borderStyle: "solid",
                    }}
                    onClick={() => {
                        if (type == 0) {
                            setSubject("");
                            setCourseNumber("");
                            setSuffix("");
                        } else {
                            setKeywords("");
                        }
                    }}
                >
                    Clear
                </button>
            </div>
            <div>
                <table
                    style={{
                        marginTop: 40,

                        flexDirection: "row",
                    }}
                >
                    <tr>
                        <th>Subject</th>
                        <th>Course</th>
                        <th>Class Name</th>
                        <th>Class#</th>
                        <th>Days</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th
                            style={{
                                display:
                                    props.token || props.token == ""
                                        ? "none"
                                        : null,
                            }}
                        ></th>
                    </tr>

                    {list.map((course) => {
                        return (
                            <tr>
                                <td>{course.subject}</td>
                                <td>{course.courseNumber}</td>
                                <td>{course.className}</td>
                                <td>{course.classNumber}</td>
                                <td>{course.days}</td>
                                <td>{course.startTime}</td>
                                <td>{course.endTime}</td>
                                <td
                                    style={{
                                        padding: 0,
                                        paddingRight: 10,
                                        paddingLeft: 10,
                                        display:
                                            props.token || props.token == ""
                                                ? "none"
                                                : null,
                                    }}
                                >
                                    <button
                                        style={{
                                            padding: 10,
                                            paddingRight: 15,
                                            paddingLeft: 15,
                                            backgroundColor: "#840144",
                                            color: "white",
                                            border: 0,
                                            cursor: "pointer",
                                            borderRadius: 5,
                                            fontSize: 12,
                                        }}
                                        onClick={() => {
                                            setCourse(course);
                                            setOpen(true);
                                        }}
                                    >
                                        Add to Schedule
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </table>
            </div>
            <div
                style={{
                    position: "fixed",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundColor: "#00000055",
                    display: open ? "flex" : "none",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        padding: 30,
                        backgroundColor: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "start",
                        borderRadius: 15,
                    }}
                >
                    <h3>Select a Schedule:</h3>

                    <select
                        onChange={(e) => {
                            console.log(e.target.value);
                            setSchedule(e.target.value);
                        }}
                        style={{
                            padding: 15,
                            width: 300,
                            borderRadius: 5,
                            borderWidth: 1,
                        }}
                    >
                        {schedules.map((sched) => {
                            return (
                                <option value={sched.id}>{sched.name}</option>
                            );
                        })}
                    </select>
                    <div
                        style={{
                            display: "flex",
                            gap: 10,
                            marginTop: 30,
                            flexDirection: "row",
                        }}
                    >
                        <button
                            style={{
                                padding: 10,
                                paddingRight: 20,
                                paddingLeft: 20,
                                backgroundColor: "#840144",
                                color: "white",
                                border: 0,
                                cursor: "pointer",
                                borderRadius: 5,
                                fontSize: 14,
                            }}
                            onClick={() => {
                                console.log(schedule);
                                alert(schedule);
                                alert(course.id);
                                Schedules.addCourse(schedule, course.id);
                            }}
                        >
                            Add Course
                        </button>

                        <button
                            style={{
                                padding: 10,
                                paddingRight: 20,
                                paddingLeft: 20,
                                backgroundColor: "transparent",
                                color: "#444",
                                border: 0,
                                cursor: "pointer",
                                borderRadius: 5,
                                fontWeight: "600",
                                fontSize: 14,
                                borderWidth: 1,
                                borderColor: "#444",
                                borderStyle: "solid",
                            }}
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
