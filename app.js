const express = require("express");
const app = express();
app.set("view engine", "ejs");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => console.log("DB is connected"));
app.use(express.urlencoded({ extended: false }));
const users = mongoose.model("user", {
  username: String,
  password: String,
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.post("/", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
});
app.post("/register", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let repeatedPassword = req.body.repeatPassword;
  if (password === repeatedPassword) {
    const user = new users({ username: username, password: password });
    user.save().then(() => console.log("yes"));
  } else {
  }
});
app.listen(4000, () => {
  console.log("we good in da hood on port 4000");
});
