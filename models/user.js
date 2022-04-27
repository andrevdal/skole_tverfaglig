const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// This decides how users are stored in the DB
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Adds plugin that authenticates for me
userSchema.plugin(passportLocalMongoose);

// Create user model
const User = new mongoose.model("user", userSchema);

module.exports = User;
