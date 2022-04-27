// This is where I require all my dependencies
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const localStrategy = require("passport-local").Strategy;
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
app.set("view engine", "ejs");

// Cookies middleware
app.use(
  session({
    secret: "yojesse",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Connects to DB
mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => console.log("DB is connected"));

// Middleware for parsing bodies from forms
app.use(express.urlencoded({ extended: false }));

// This decides how users are stored in the DB
const users = new mongoose.Schema({
  username: String,
  password: String,
});

// Adds plugin that authenticates for me
users.plugin(passportLocalMongoose);

// Create user model
const User = new mongoose.model("user", users);

// Specefies local strategt
passport.use(new localStrategy(User.authenticate()));

// Saves user ID in session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// This displays the homepage
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// This displays the registartion page
app.get("/register", (req, res) => {
  res.render("register.ejs");
});

// This displays the info page, however only if authenticated.
app.get("/info", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("info.ejs");
  } else {
    res.redirect("/register");
  }
});

// This is what makes the logout button take you to the start page and unauthenticates you
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Authenticates for already existing user.
app.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  passport.authenticate("local")(req, res, () => {
    res.redirect("/info");
  });
});

// Saves new user to DB and authenticates user if repeated password is the same as password
app.post("/register", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let repeatedPassword = req.body.repeatPassword;
  if (repeatedPassword === password) {
    User.register({ username: username }, password, (err, user) => {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/info");
        });
      }
    });
  } else {
    console.log("Passwords dosen't match");
  }
});

app.listen(4000, () => {
  console.log("we good in da hood on port 4000");
});
