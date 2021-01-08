const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const csurf = require("csurf");
const cookieSession = require("cookie-session");
const db = require("./db");
const { hash, compare } = require("./bc");
const cryptoRandomString = require("crypto-random-string");


// Middleware:
app.use(
    cookieSession({
        secret: `Grzegorz Brzęczyszczykiewicz`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);
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
    // if the user IS logged in
    if (req.session.userId) {
        // they shouldn't be allowed to see /welcome!!!!
        res.redirect("/");
    } else {
        // the user is allowed to see the welcome page!
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

// POST /register
app.post("/register", (req, res) => {
    const { first, last, email, password } = req.body;
    console.log("register request body: ", req.body);
    hash(password)
        .then((hashedPassword) => {
            // console.log("hashedPassword: ", hashedPassword);
            // console.log("req.session before register: ", req.session);
            db.registerUser(first, last, email, hashedPassword)
                .then(({ rows }) => {
                    console.log("New user added to table users");
                    req.session.userId = rows[0].id;
                    res.json({ error: false });
                    // console.log("req.session after register: ", req.session);
                })
                .catch((err) => {
                    console.log("error writing user profile to DBS", err);
                    res.json({ error: true });
                });
        })
        .catch((err) => {
            console.log("error hashing password: ", err);
            res.json({ error: true });
        });
});

//POST /login
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.checkForUserEmail(email)
        .then(({ rows }) => {
            console.log("email :", email);
            console.log("typedPass: ", password);
            console.log("db stored Pass", rows[0].password);
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

// GET /password/reset/start
app.get("/password/reset/start", (req, res) => {
    const { email } = req.body;
    db.checkForUserEmail(email)
        .then(({ rows }) => {
            if (rows.length > 0) {
                const secretCode = cryptoRandomString({length: 6,});
                res.json({ error: false });
                db.addResetCode(email, secretCode)
                    .then(() => {
                        sendEmail(email, `Use this code: ${secretCode} within 10 minutes to update your password`)
                    })
                    .catch((err) => {
                        console.log("error while writing verification code to DB: ", err);
                        res.json({ error: true })
                    })
            } else {
                res.json({ error: true })
            }
})
.catch((err) => {
    console.log("error while checking email in DB: ", err);
})

//POST /logout
app.get("/logout", (req, res) => {
    req.session = null;
    console.log("req.session after logout: ", req.session);
});

//GET /*
app.get("*", function (req, res) {
    // if the user is NOT logged in
    if (!req.session.userId) {
        // send them away!!!!
        res.redirect("/welcome");
    } else {
        // serve them the page they requested - they're allowed to be here :)
        // NEVER COMMENT THIS LINE OUT EVER EVER EVER EVER
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
