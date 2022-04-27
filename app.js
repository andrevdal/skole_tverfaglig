// This is where I require all my dependencies
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const infoRouter = require("./routes/info.js");
const loginRouter = require("./routes/login.js");
const registerRouter = require("./routes/register");
const logoutRouter = require("./routes/logout");
const User = require("./models/user.js");
const { passport } = require("./middleware/passport.js");
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

// importing all routes
app.use(infoRouter);
app.use(registerRouter);
app.use(loginRouter);
app.use(logoutRouter);

app.listen(4000, () => {
  console.log("we good in da hood on port 4000");
});
