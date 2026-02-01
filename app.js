import express from "express";
// import route from "./route.js";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import "./auth/google.js"
import route from "./route.js"
// import google from "./auth/google.js"
dotenv.config();

const port = 3005;
const app = express();

app.use(session({
    secret: "hardcoded-test-secret",
    resave: false,
    saveUninitialized: true,
}));
// app.use(express.json())


app.use(passport.initialize())
app.use(passport.session())

// route
app.use("/api/v1", route)

app.get("/", (req, res) => {
    try {
        res.send(`<a href="/auth/google">Login with Google</a>`)

    } catch (err) {
        console.log("err", err)
    }

})
app.get("/search/:userId-:bookid", (req, res) => {
    try {
        res.send(req.params.bookid)

    } catch (err) {
        console.log("err", err)
    }

})
app.get("/download", (req, res) => {
    try {
        res.sendFile(__dirname + "files/command.txt")

    } catch (err) {
        console.log("err", err)
    }

})


app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', "email"] }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        successRedirect: "/profile"
    }));


app.get("/profile", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/")
    }
    console.log("res.user", req.user)
    return res.send(`<h1>Welcome ${req.user.displayName} </h1>
                      <a href="/logout">Logout</a>
        `)

})

app.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/")
    })
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send("Internal issue")
    next()
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});