const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const csurf = require("csurf");
const cookieSession = require("cookie-session");
const db = require("./db");
const { hash, compare } = require("./bc");
const cryptoRandomString = require("crypto-random-string");
const ses = require("./ses");
const s3 = require("./s3");
const { s3Url } = require("./config.json");
const multer = require("multer");
const uidSafe = require("uid-safe");
// io.socket stuff:
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

// Middleware:
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

const cookieSessionMiddleware = cookieSession({
    secret: `Grzegorz Brzęczyszczykiewicz`,
    maxAge: 1000 * 60 * 60 * 24 * 14,
});

// io.socket stuff:
app.use(cookieSessionMiddleware);

io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.json());
app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use((req, res, next) => {
    console.log("-----------------");
    console.log(`${req.method} request coming in on route ${req.url}`);
    console.log("-----------------");
    next();
});

// redirection:
app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

// POST /api/register
app.post("/api/register", (req, res) => {
    const { first, last, email, password } = req.body;
    console.log("register request body: ", req.body);
    hash(password)
        .then((hashedPassword) => {
            db.registerUser(first, last, email, hashedPassword)
                .then(({ rows }) => {
                    console.log("New user added to table users");
                    req.session.userId = rows[0].id;
                    res.json({ error: false });
                })
                .catch((err) => {
                    console.log("error writing user profile to DB", err);
                    res.json({ error: true });
                });
        })
        .catch((err) => {
            console.log("error hashing password: ", err);
            res.json({ error: true });
        });
});

//POST /api/login
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    db.checkForUserEmail(email)
        .then(({ rows }) => {
            compare(password, rows[0].password)
                .then((result) => {
                    if (result) {
                        req.session.userId = rows[0].id;
                        res.json({ error: false });
                    } else {
                        res.json({ error: true });
                    }
                })
                .catch((err) => {
                    console.log("Error in compare: ", err);
                    res.json({ error: true });
                });
        })
        .catch((err) => {
            console.log("error when checking DB for user email: ", err);
            res.json({ error: true });
        });
});

// POST /api/reset/start
app.post("/api/reset/start", (req, res) => {
    const { email } = req.body;
    db.verifyEmail(email)
        .then(({ rows }) => {
            if (rows.length == 0) {
                res.json({ error: true });
            } else {
                const secretCode = cryptoRandomString({ length: 6 });
                res.json({ error: false });
                db.addResetCode(email, secretCode)
                    .then(() => {
                        ses.sendEmail(
                            email,
                            `Use this code: ${secretCode} within 10 minutes to update your password`,
                            "Password reset request."
                        );
                    })
                    .catch((err) => {
                        console.log(
                            "error while writing verification code to DB: ",
                            err
                        );
                        res.json({ error: true });
                    });
            }
        })
        .catch((err) => {
            console.log("error while checking email in DB: ", err);
        });
});

app.post("/api/reset/verify", (req, res) => {
    const { code, password: newPassword, email } = req.body;
    db.verifyResetCode(code)
        .then(({ rows }) => {
            const codeEntered = code;
            const codeStored = rows[0].code;
            if (codeEntered === codeStored) {
                hash(newPassword)
                    .then((hash) => {
                        db.updatePassword(email, hash);
                        console.log("password successfully updated");
                        res.json({ error: false });
                    })
                    .catch((err) => {
                        console.log("updating password in DB failed: ", err);
                        res.json({ error: true });
                    });
            } else {
                console.log("entered code doesn't match its DB counterpart");
                res.json({ error: true });
            }
        })
        .catch((err) => {
            console.log("error while verifying code from DB: ", err);
            res.json({ error: true });
        });
});

//GET /api/logout
app.get("/api/logout", (req, res) => {
    req.session = null;
    res.json({ error: false });
});

//GET /api/profile
app.get("/api/profile", (req, res) => {
    const id = req.session.userId;
    db.getProfileInfo(id)
        .then(({ rows }) => {
            // const { first, last, email, created_at, profile_pic } = rows[0];
            // res.json({
            //     id: req.session.userId,
            //     first: first,
            //     last: last,
            //     email: email,
            //     created_at: created_at,
            //     profile_pic: profile_pic,
            res.json(rows);
        })
        .catch((err) => {
            console.log("error while getting user profile from DB: ", err);
            res.json({ error: true });
        });
});

//POST /api/profile/pic-upload:
app.post(
    "/api/profile/pic-upload",
    uploader.single("profile_pic"),
    s3.upload,
    (req, res) => {
        const url = `${s3Url}${req.file.filename}`;
        const id = req.session.userId;
        if (req.file) {
            db.uploadProfilePic(url, id)
                .then(() => {
                    res.json({ profile_pic: url });
                })
                .catch((err) => {
                    console.log(
                        "error while uploading profile picture to the DB: ",
                        err
                    );
                    res.json({ error: true });
                });
        } else {
            res.json({ error: true });
        }
    }
);

//POST /api/profile/bio-update
app.post("/api/profile/bio-update", (req, res) => {
    const id = req.session.userId;
    const { bio } = req.body;
    db.updateBio(bio, id)
        .then(({ rows }) => {
            res.json(rows[0].bio);
        })
        .catch((err) => {
            console.log("error while updating bio in DB: ", err);
            res.json({ error: true });
        });
});

//GET /api/other-user/:id
app.get("/api/other-user/:id", (req, res) => {
    if (req.params.id == req.session.userId) {
        res.json({ loggedIn: true });
    } else {
        db.getOtherProfile(req.params.id)
            .then(({ rows }) => {
                res.json(rows);
            })
            .catch((err) => {
                console.log(
                    "error while reading other user profile from DB: ",
                    err
                );
                res.json({ error: true });
            });
    }
});

//GET api/users
app.get("/api/new-users", (req, res) => {
    db.getLatestUsers()
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log("error while retrieving last 3 users from DB: ", err);
            res.json({ error: true });
        });
});

//GET api/find-users
app.get("/api/find-users/:userQuery", (req, res) => {
    const { userQuery } = req.params;
    db.searchUsers(userQuery)
        .then(({ rows }) => {
            res.json(rows);
            console.log("find users rows: ", rows);
        })
        .catch((err) => {
            console.log("error while finding users in DB: ", err);
            res.json({ error: true });
        });
});

//GET api/friendship-status/:otherUserId
app.get("api/friendship-status/:otherUserId", (req, res) => {
    const { otherUserId } = req.params;
    db.getFriendStatus(req.session.userId, otherUserId).then(({ rows }) => {});
});

//GET /*
app.get("*", function (req, res) {
    // if
    if (!req.session.userId) {
        console.log(`req.session.userId is null, user not logged in`);
        res.redirect("/welcome");
    } else {
        // serve them the page they requested - they're allowed to be here :)
        // NEVER COMMENT THIS LINE OUT EVER EVER EVER EVER
        console.log(`user logged in with ID : `, req.session.userId);
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

// to make io.socket work app needs to be replaced with server!
server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

// socket id code goes here:
// io.on("connection", (socket) => {
//     console.log("socket with id ${socket.id} just connected");
//     // every user will have two ID's:
//     // -socket.id that is the ID socket.io will assign to every user
//     // -userId - that is the ID we assign to user when they login/register (socket.request.session.userId)

//     // req.session DOES NOT WORK HERE because we don't have a request object,
//     // if in your POST /registration and POST/login routes - DON'T assign userId to req.session then "socket.request"
// });
