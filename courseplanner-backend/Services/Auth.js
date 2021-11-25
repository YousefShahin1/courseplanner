const routes = require("express").Router();
const admin = require("firebase-admin");
const firebase = require("firebase");
const serviceAccount = require("../serviceKey.json");
const User = require("../Models/User");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};

// Initialize Firebase
const fireapp = firebase.initializeApp(firebaseConfig);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

routes.post("/login", async (req, res) => {
    //req.body.user contains email or password
    if (!req.body.user || req.body.user.trim() == "")
        return res.send({ err: "You must provide a username or an emaiil" });
    if (!req.body.password || req.body.password.trim() == "")
        return res.send({ err: "You must provide a password" });

    let email;
    let password = req.body.password;

    //Check if req.body.user is a username and get the email
    const usernameAccount = await User.findOne({
        username: req.body.user,
    }).exec();
    if (usernameAccount) email = usernameAccount.email;
    else email = req.body.user;

    //Check if the email and password are correct
    fireapp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (user) => {
            const userAccount = await User.findOne({
                uuid: user.user.uid,
            }).exec();
            try {
                //If the email and password are correct
                //Send a JWT token with a signed userId
                if (userAccount)
                    jwt.sign(
                        { user: user.user.uid },
                        process.env.JWT_SECRET,
                        (err, token) => {
                            res.json({ token: token });
                        }
                    );
                //If there is user profile in the database send error
                else res.status(400).json({ err: "Account not created" });
                return;
            } catch (err) {
                //Any database error
                return res.status(400).send({ err: err });
            }
        })
        .catch((err) => {
            //If the email and password are not correct
            switch (err.code) {
                case "auth/invalid-email":
                case "auth/user-disabled":
                    res.status(400).send({ err: err.message });
                    break;
                case "auth/user-not-found":
                case "auth/wrong-password":
                    res.status(400).send({
                        err: "Either the email or the password you provided are wrong",
                    });
            }
            return;
        });
});

routes.post("/signup", async (req, res) => {
    //Validation Schema for the input parameters
    const schema = Joi.object({
        fname: Joi.string().max(30).required(),
        lname: Joi.string().max(30).required(),
        username: Joi.string().max(50).required(),
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required(),
        password: Joi.string().max(50).required(),
    });

    const result = schema.validate(req.body);

    //Error if the validation fails
    if (result.error) {
        return res.status(400).send({ err: result.error.details[0].message });
    }

    let fname = req.body.fname;
    let lname = req.body.lname;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    try {
        //Check if username or email already exists
        const usernameAccount = await User.findOne({
            username: username,
        }).exec();
        const emailAccount = await User.findOne({ email: email }).exec();
        if (emailAccount) {
            //If a user with the email already exists send an error
            return res.status(400).send({
                err: "A user with this email already exists",
            });
        }
        if (usernameAccount) {
            //If a user with the username already exists send an error
            return res.status(400).send({
                err: "A user with this username already exists",
            });
        }

        //Create Firebase auth record
        admin
            .auth()
            .createUser({
                email: email,
                password: password,
                displayName: fname + " " + lname,
            })
            .then(async (userInfo) => {
                //Create a new user record in the database
                const nuser = new User({
                    uuid: userInfo.uid,
                    fname: fname,
                    lname: lname,
                    username: username,
                    email: email,
                });
                try {
                    const savedUser = await nuser.save();

                    //Once the user record is saved in the database, send a JWT token with the signed userId
                    jwt.sign(
                        { user: userInfo.uid },
                        process.env.JWT_SECRET,
                        (err, token) => {
                            res.json({ token: token });
                        }
                    );
                } catch (err) {
                    //Any database error
                    console.log(err);
                    return res.status(400).send({
                        err: err,
                    });
                }
            })
            .catch((err) => {
                //Any Firebase Auth error
                return res.status(400).send({ error: err });
            });
    } catch (err) {
        //Any database error
        console.log(err);
        return res.status(400).send({
            err: err,
        });
    }
});

//Returns ok if the verifyUser function passes successfully
routes.get("/test", verifyUser, async (req, res) => {
    res.send("ok");
});

//Returns a userId if the token is correct and returns null if it isn't
function verifyToken(token) {
    let verified;
    jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
        if (!err) verified = authData;
    });

    return verified;
}

async function verifyUser(req, res, next) {
    //Return an error if no credentials are sent
    if (!req.headers.authorization) {
        return res.json({ error: "No credentials sent!" });
    }

    let token = req.headers.authorization;

    //Return an error if verifyToken returns null
    let authData = verifyToken(token);
    if (!authData) {
        res.sendStatus(401);
        return;
    }

    //Attach the authData to the request if verifyToken passes
    req.authData = authData;

    next();
}

module.exports = { routes, verifyUser };
