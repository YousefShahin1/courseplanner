export default {
    create(name, description, setList) {
        fetch("http://localhost:3002/api/schedules/create", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
                name: name,
                description: description,
            }),
        })
            .then((response) => response.json())
            .then((i) => {
                setList(i.result);
            })
            .catch((error) => {
                console.error(error);
            });
    },
    update(id, name, description, setName, setDescription) {
        fetch("http://localhost:3002/api/schedules/update/" + id, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
                name: name,
                description: description,
            }),
        })
            .then((response) => response.json())
            .then((i) => {
                setName(i.result.name);
                setDescription(i.result.description);
            })
            .catch((error) => {
                console.error(error);
            });
    },
    getAll(setList) {
        fetch("http://localhost:3002/api/schedules/all", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
        })
            .then((response) => response.json())
            .then((i) => {
                setList(i.result);
            })
            .catch((error) => {
                console.error(error);
            });
    },
    getCourses(id, setList) {
        fetch("http://localhost:3002/api/schedules/view/" + id, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
        })
            .then((response) => response.json())
            .then((i) => {
                console.log(i.result);
                setList(i.result);
            })
            .catch((error) => {
                console.error(error);
            });
    },
    delete(id, setList) {
        fetch("http://localhost:3002/api/schedules/delete/" + id, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
        })
            .then((response) => response.json())
            .then((i) => {
                console.log(i.result);
                this.getAll(setList);
            })
            .catch((error) => {
                console.error(error);
            });
    },
    addCourse(id, courseId) {
        fetch(
            "http://localhost:3002/api/schedules/addCourse/" +
                id +
                "/" +
                courseId,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            }
        )
            .then((response) => response.json())
            .then((i) => {
                alert("Added Course Successfully");
            })
            .catch((error) => {
                console.error(error);
            });
    },
    removeCourse(id, courseId, setList) {
        fetch(
            "http://localhost:3002/api/schedules/removeCourse/" +
                id +
                "/" +
                courseId,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            }
        )
            .then((response) => response.json())
            .then((i) => {
                this.getCourses(id, setList);
            })
            .catch((error) => {
                console.error(error);
            });
    },
};
