const express = require("express")
const Router = express.Router()

// This is what makes the logout button take you to the start page and unauthenticates you
Router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  module.exports = Router