const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const csurf = require("csurf");
const cookieSession = require("cookie-session");
const db = require("./db");
const { hash, compare } = require("./bc");

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
            console.log("hashedPassword: ", hashedPassword);
            db.registerUser(first, last, email, hashedPassword)
                .then(({ rows }) => {
                    console.log("New user added to table users");
                    req.session.userId = rows[0].id;
                    res.redirect("/");
                    res.json({ error: false });
                })
                .catch((err) => {
                    console.log("error creating user profile", err);
                    res.json({ error: true });
                });
        })
        .catch((err) => {
            console.log("error creating user profile", err);
            res.json({ error: true });
        });
});

//POST /login
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.checkForUserEmail(email).then(({ rows }) => {
        console.log("typedPass: ", password);
        console.log("db stored Pass", rows[0].password);
        compare(password, rows[0].password)
            .then((result) => {
                console.log("result: ", result);
                if (result) {
                    console.log("req.session.userId".req.session.userId);
                    req.session.userId = rows[0].id;
                    res.json({ error: false });
                } else {
                    res.json({ error: true });
                }
            })
            .catch((err) => {
                console.log("Passwords don't match, error in compare: ", err);
                res.json({ error: true });
            });
    });
});

// //POST /login
// app.post("/login", requireLoggedOut, (req, res) => {
//     const { email, password } = req.body;
//     db.checkForUserEmail(email)
//         .then(({ rows }) => {
//             console.log("typedPass: ", password);
//             console.log("db stored Pass", rows[0].password);
//             compare(password, rows[0].password).then((result) => {
//                 console.log("rez:", result);
//                 if (result) {
//                     console.log("req.session.userId", req.session.userId);
//                     req.session.userId = rows[0].id;
//                     db.checkForUserSignature(rows[0].id)
//                         .then(({ rows }) => {
//                             if (rows.length > 0) {
//                                 req.session.signatureId = rows[0].id;
//                                 res.redirect("/thanks");
//                             } else res.redirect("/petition");
//                         })
//                         .catch((err) => {
//                             console.log("signature not in DB", err);
//                             res.render("login", {
//                                 title: "login",
//                                 error: true,
//                                 message:
//                                     "You have entered incorrect login or password.",
//                             });
//                         });
//                 } else {
//                     console.log("error in compare");
//                     res.render("login", {
//                         title: "login",
//                         userLoggedOut: true,
//                         error: true,
//                         message:
//                             "No match was found for the credentials you have entered",
//                     });
//                 }
//             });
//         })
//         .catch((err) => {
//             console.log("passwords don't match", err);
//             res.render("login", {
//                 title: "login",
//                 userLoggedOut: true,
//                 error: true,
//                 message: "You have entered incorrect login or password.",
//             });
//         });
// });

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
