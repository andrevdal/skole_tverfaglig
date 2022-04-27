const express = require("express")
const Router = express.Router()

// This displays the info page, however only if authenticated.
Router.get("/info", (req, res) => {
    if (req.isAuthenticated()) {
      res.render("info.ejs");
    } else {
      res.redirect("/register");
    }
  });

  module.exports = Router