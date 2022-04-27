const express = require("express")
const Router = express.Router()
const User = require("../models/user.js")
const {authenticate} = require("../middleware/passport.js")

// This displays the registartion page
Router.get("/register", (req, res) => {
    res.render("register.ejs");
  });
  
// Saves new user to DB and authenticates user if repeated password is the same as password
Router.post("/register", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let repeatedPassword = req.body.repeatPassword;
    if (repeatedPassword === password) {
      User.register({ username: username }, password, (err, user) => {
        if (err) {
          console.log(err);
          res.redirect("/register");
        } else {
          authenticate(req, res);
        }
      });
    } else {
      console.log("Passwords dosen't match");
    }
  });

  module.exports = Router