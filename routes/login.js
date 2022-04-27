const express = require("express");
const Router = express.Router();
const User = require("../models/user.js");
const { authenticate } = require("../middleware/passport.js");

// This displays the homepage
Router.get("/", (req, res) => {
  res.render("index.ejs");
});

// Authenticates for already existing user.
Router.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  authenticate(req, res);
});

module.exports = Router;
