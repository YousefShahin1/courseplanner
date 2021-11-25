import logo from "./logo.svg";
import "./App.css";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import Schedules from "./Pages/Schedules";
import Schedule from "./Pages/Schedule";

import { useState } from "react";
import Auth from "./Services/Auth";

function App() {
    const [page, setPage] = useState("Home");
    const [token, setToken] = useState(localStorage.getItem("token"));

    const [schedule, setSchedule] = useState({});

    return (
        <div className="App">
            <div
                style={{
                    height: 100,
                    backgroundColor: "#840144",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingLeft: 35,
                    paddingRight: 35,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            width: 42,
                            height: 42,
                            color: "white",
                            marginRight: 20,
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                            />
                        </svg>
                    </div>
                    <div style={{ color: "white", fontSize: 36 }}>
                        Course Planner
                    </div>
                </div>
                <div>
                    <button
                        style={{
                            paddingLeft: 20,
                            paddingRight: 20,
                            height: 100,
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: 22,
                            cursor: "pointer",
                            color: "white",
                            border: 0,
                        }}
                        onClick={() => setPage("Home")}
                    >
                        <div style={{ fontWeight: "200" }}>Home</div>
                    </button>
                    <button
                        style={{
                            height: 100,
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: 22,
                            cursor: "pointer",
                            color: "white",
                            border: 0,
                            paddingLeft: 20,
                            paddingRight: 20,
                        }}
                        onClick={() => setPage("Search")}
                    >
                        <div style={{ fontWeight: "200" }}>Search</div>
                    </button>
                    <button
                        style={{
                            paddingLeft: 20,
                            paddingRight: 20,
                            height: 100,
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: 22,
                            cursor: "pointer",
                            color: "white",
                            border: 0,
                            display: token == "" || !token ? "none" : null,
                        }}
                        onClick={() => setPage("Schedules")}
                    >
                        <div style={{ fontWeight: "200" }}>My Schedules</div>
                    </button>
                    <button
                        style={{
                            paddingLeft: 20,
                            paddingRight: 20,
                            height: 100,
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: 22,
                            cursor: "pointer",
                            color: "white",
                            border: 0,
                            display: token == "" || !token ? "none" : null,
                        }}
                        onClick={() => Auth.logout(setToken, setPage)}
                    >
                        <div style={{ fontWeight: "200" }}>Log Out</div>
                    </button>
                </div>
            </div>

            {page == "Search" ? (
                <Search />
            ) : page == "Schedules" ? (
                <Schedules setPage={setPage} setSchedule={setSchedule} />
            ) : page == "Schedule" ? (
                <Schedule schedule={schedule} />
            ) : (
                <Home
                    token={token}
                    setPage={setPage}
                    setToken={setToken}
                    Auth={Auth}
                    token={token}
                />
            )}
        </div>
    );
}

export default App;
