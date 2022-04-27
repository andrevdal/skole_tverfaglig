const User = require("../models/user.js")
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

// Specefies local strategt
passport.use(new localStrategy(User.authenticate()));

// Saves user ID in session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//function to authenticate (So geir dosen't cry about DRY)
function authenticate(req, res) {
  passport.authenticate("local")(req, res, () => {
    res.redirect("/info");
  });
}

module.exports = {passport, authenticate}