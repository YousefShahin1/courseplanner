export default {
    currentUser: null,
    login: (user, password, setToken, setErr, setPage) => {
        fetch("http://localhost:3002/api/auth/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: user,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((i) => {
                if (i.err) setErr(i.err);
                else {
                    setErr("");
                    setPage("Search");
                    localStorage.setItem("token", i.token);
                    setToken(i.token);
                }
            })
            .catch((error) => {
                console.error(error);
                setErr(error.err);
            });
    },
    logout: (setToken, setPage) => {
        setPage("Home");
        localStorage.setItem("token", "");
        setToken("");
    },
};
