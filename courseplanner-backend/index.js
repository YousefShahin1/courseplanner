const express = require("express");
const cors = require("cors");
const app = express();
const port = 3002;
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv/config");

//Importing Routes
const { routes, verifyUser } = require("./Services/Auth");
const scheduleRoutes = require("./Services/Schedules");
const courseRoutes = require("./Services/Courses");

// Add cors for React
app.use(cors());

// Serve Front-End
app.use("/", express.static("static"));

// Middleware for logging
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

// Parse data as json
app.use(express.json());

// Install the router at /api
app.use("/api", router);

//Routes
router.use("/auth", routes);
router.use("/schedules", scheduleRoutes);
router.use("/courses", courseRoutes);

//Connect to Database
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to DB!")
);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
