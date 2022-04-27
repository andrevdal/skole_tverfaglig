require("dotenv").config();
const express = require("express");
const app = express();
app.set("view engine", "ejs");
const mongoose = require("mongoose");
const localStrategy = require("passport-local").Strategy;
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

app.use(
  session({
    secret: "yojesse",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => console.log("DB is connected"));

app.use(express.urlencoded({ extended: false }));

const users = new mongoose.Schema({
  username: String,
  password: String,
});

users.plugin(passportLocalMongoose);

const User = new mongoose.model("user", users);

passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/info", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("info.ejs");
  } else {
    res.redirect("/register");
  }
});

app.get("/logout", (req,res)=>{
  req.logout();
  res.redirect("/");
})

app.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  passport.authenticate("local")(req, res, () => {
    res.redirect("/info");
  });
});

app.post("/register", (req, res) => {
  User.register(
    { username: req.body.username },
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/info");
        });
      }
    }
  );
});

app.listen(4000, () => {
  console.log("we good in da hood on port 4000");
});
