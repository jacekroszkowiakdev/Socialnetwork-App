const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const db = require("./db");
const { hash } = require("./bc");

// Middleware:
app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(
    cookieSession({
        secret: `Grzegorz Brzęczyszczykiewicz`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

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

// POST /register
app.post("/register", (req, res) => {
    const { first, last, email, password } = req.body;
    console.log("register body: ", req.body);
    hash(password)
        .then((hashedPassword) => {
            console.log("Hp: ", hashedPassword);
            db.registerUser(first, last, email, hashedPassword)
                .then(({ rows }) => {
                    console.log("New user added to table users");
                    req.session.userId = rows[0].id;
                    res.redirect("/");
                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log("error creating user profile", err);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("error creating user profile", err);
            res.json({ success: false });
        });
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
