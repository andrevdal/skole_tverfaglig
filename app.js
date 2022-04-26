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
app.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  users.findOne({username : username}, (err, loggedUser)=>{
    if(err){
      console.log(err);
    } else{
      if(loggedUser){
        if (loggedUser.password === password) {
          console.log("login success");
        } else {
          console.log("incorrect password");
        }
      } else {
        console.log("user not found");
      }
    }
  })
});
app.post("/register", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let repeatedPassword = req.body.repeatPassword;
  if (password === repeatedPassword) {
    const user = new users({ username: username, password: password });
    user.save((err)=>{
      if(err){
        console.log(err);
      } else {
        console.log("user saved");
      }
    });
  } else {
    console.log("password dont match");
  }
});
app.listen(4000, () => {
  console.log("we good in da hood on port 4000");
});
