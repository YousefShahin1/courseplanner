export default {
    search(subject, courseNumber, suffix, setList) {
        fetch(
            "http://localhost:3002/api/courses/search/" +
                subject +
                "/" +
                courseNumber +
                "/" +
                suffix,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => response.json())
            .then((i) => {
                setList(i.result);
            })
            .catch((error) => {
                console.error(error);
            });
    },

    searchKeywords(keywords, setList) {
        fetch("http://localhost:3002/api/courses/searchbykeywords", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                input: keywords,
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
};
