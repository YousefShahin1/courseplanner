import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import "../css/Search.css";
import SchedulesService from "../Services/Schedules";

export default function Schedules(props) {
    const [plname, setplName] = useState(props.schedule.name);
    const [pldescription, setplDescription] = useState(
        props.schedule.description
    );

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [courses, setCourses] = useState([]);

    let [open, setOpen] = useState(false);

    let [course, setCourse] = useState();

    useEffect(() => {
        SchedulesService.getCourses(props.schedule.id, setCourses);
    }, []);
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
                Schedule Details
            </div>

            <div
                style={{
                    display: "flex",
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
                        Schedule Name
                    </div>
                    <input
                        value={name}
                        type="text"
                        style={{
                            padding: 15,
                            width: 200,
                            borderRadius: 5,
                            borderWidth: 1,
                        }}
                        placeholder={plname}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
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
                        Description
                    </div>
                    <input
                        value={description}
                        type="text"
                        style={{
                            padding: 15,
                            width: 350,
                            borderRadius: 5,
                            borderWidth: 1,
                        }}
                        placeholder={pldescription}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
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
                    onClick={() =>
                        SchedulesService.update(
                            props.schedule.id,
                            name,
                            description,
                            setplName,
                            setplDescription
                        )
                    }
                >
                    Save
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
                        setName("");
                        setDescription("");
                    }}
                >
                    Clear
                </button>
            </div>

            <div
                style={{
                    fontSize: 48,
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    color: "#840144",
                    marginTop: 30,
                }}
            >
                Schedule Courses
            </div>

            <div>
                <table
                    style={{
                        marginTop: 40,
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
                        <th></th>
                    </tr>

                    {courses.map((course) => {
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
                                            setCourse(course.id);
                                            setOpen(true);
                                        }}
                                    >
                                        Remove
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
                    <span style={{ fontSize: 18 }}>
                        <b>Confirmation</b>
                    </span>
                    <span style={{ marginTop: 10 }}>
                        Are you sure you want to remove this course?
                    </span>
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
                                SchedulesService.removeCourse(
                                    props.schedule.id,
                                    course,
                                    setCourses
                                );
                                setOpen(false);
                            }}
                        >
                            Remove
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
