import { useState } from "react";

export default function Home(props) {
    const [err, setErr] = useState("");

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const [signupUser, setSignupUser] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");

    let [type, setType] = useState(0);
    return (
        <div>
            <div
                style={{
                    backgroundColor: "#ffbf5788",
                    padding: 35,
                    paddingLeft: 0,
                    display: "flex",
                    alignItems: "start",
                    flexDirection: "column",
                }}
            >
                <div
                    style={{
                        fontSize: 42,
                        fontWeight: "bold",
                        marginLeft: 60,
                    }}
                >
                    Welcome to Course Planner
                </div>
                <div style={{ marginTop: 20, fontSize: 20, marginLeft: 60 }}>
                    This site allows students to browse courses, create
                    schedules and save them.
                </div>
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        marginTop: 30,
                        height: 1,
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            height: 1,
                            marginLeft: 35,
                            marginRight: 15,
                            backgroundColor: "#777",
                        }}
                    ></div>
                </div>
            </div>
            <div
                style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    display:
                        type != 0
                            ? "none"
                            : localStorage.getItem("token") == ""
                            ? "flex"
                            : "none",
                }}
            >
                <div
                    style={{
                        padding: 35,
                        marginLeft: 50,
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        marginTop: 10,
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
                        Login
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: 20,
                            marginTop: 10,
                            flexDirection: "column",
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
                                    marginTop: 20,
                                    fontSize: 20,
                                    marginBottom: 5,
                                    fontWeight: "500",
                                }}
                            >
                                Username/Email
                            </div>
                            <input
                                value={user}
                                type="text"
                                style={{
                                    padding: 15,
                                    width: 300,
                                    borderRadius: 5,
                                    borderWidth: 1,
                                }}
                                onChange={(e) => setUser(e.target.value)}
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
                                    marginTop: 0,
                                    fontSize: 20,
                                    marginBottom: 5,
                                    fontWeight: "500",
                                }}
                            >
                                Password
                            </div>
                            <input
                                value={password}
                                type="text"
                                style={{
                                    padding: 15,
                                    width: 300,
                                    borderRadius: 5,
                                    borderWidth: 1,
                                }}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <span
                        style={{
                            marginTop: 12,
                            color: "red",
                            display: err == "" ? "none" : "flex",
                            fontSize: 18,
                        }}
                    >
                        {err}
                    </span>
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
                                props.Auth.login(
                                    user,
                                    password,
                                    props.setToken,
                                    setErr,
                                    props.setPage
                                )
                            }
                        >
                            Login
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
                                setUser("");
                                setPassword("");
                                alert(localStorage.getItem("token"));
                            }}
                        >
                            Clear
                        </button>
                    </div>
                    <a
                        style={{
                            marginTop: 20,
                            color: "#840144",
                            fontSize: 18,
                            cursor: "pointer",
                        }}
                        onClick={() => setType(1)}
                    >
                        Don't have an account? Register here
                    </a>
                </div>
            </div>

            <div
                style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    display:
                        type != 1
                            ? "none"
                            : localStorage.getItem("token") == ""
                            ? "flex"
                            : "none",
                }}
            >
                <div
                    style={{
                        padding: 35,
                        marginLeft: 50,
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        marginTop: 10,
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
                        Sign Up
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: 20,
                            marginTop: 10,
                            flexDirection: "column",
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
                                    marginTop: 20,
                                    fontSize: 20,
                                    marginBottom: 5,
                                    fontWeight: "500",
                                }}
                            >
                                Username
                            </div>
                            <input
                                value={signupUser}
                                type="text"
                                style={{
                                    padding: 15,
                                    width: 300,
                                    borderRadius: 5,
                                    borderWidth: 1,
                                }}
                                onChange={(e) => setSignupUser(e.target.value)}
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
                                Email
                            </div>
                            <input
                                value={signupEmail}
                                type="text"
                                style={{
                                    padding: 15,
                                    width: 300,
                                    borderRadius: 5,
                                    borderWidth: 1,
                                }}
                                onChange={(e) => setSignupEmail(e.target.value)}
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
                                    marginTop: 0,
                                    fontSize: 20,
                                    marginBottom: 5,
                                    fontWeight: "500",
                                }}
                            >
                                Password
                            </div>
                            <input
                                value={signupPassword}
                                type="text"
                                style={{
                                    padding: 15,
                                    width: 300,
                                    borderRadius: 5,
                                    borderWidth: 1,
                                }}
                                type="password"
                                onChange={(e) =>
                                    setSignupPassword(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <span
                        style={{
                            marginTop: 12,
                            color: "red",
                            display: err == "" ? "none" : "flex",
                            fontSize: 18,
                        }}
                    >
                        {err}
                    </span>
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
                                props.Auth.login(
                                    user,
                                    password,
                                    props.setToken,
                                    setErr,
                                    props.setPage
                                )
                            }
                        >
                            Sign Up
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
                                setSignupEmail("");
                                setSignupPassword("");
                                setSignupUser("");
                            }}
                        >
                            Clear
                        </button>
                    </div>
                    <a
                        style={{
                            marginTop: 20,
                            color: "#840144",
                            fontSize: 18,
                            cursor: "pointer",
                        }}
                        onClick={() => setType(0)}
                    >
                        Already have an account? Login here
                    </a>
                </div>
            </div>
        </div>
    );
}
