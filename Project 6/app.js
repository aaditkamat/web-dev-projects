const express = require("express");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/userDB");

require('dotenv').config();

const md5 = require('md5');

const userSchema = new mongoose.Schema({
  username: "string",
  password: "string",
});

const User = new mongoose.model("user", userSchema);

const logger = require("morgan");

const createError = require("http-errors");

const cookieParser = require("cookie-parser");

const app = express();

const port = 3000;

const path = require('path');

app.use(cookieParser());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('view engine', 'ejs');

app.route("/").get((req, res) => {
    res.render("home");
});

app.route("/login").get((req, res) => {
    res.render("login");
}).post((req, res) => {
   User.findOne({
        email: req.body.username,
   }, (err, user) => {
    if (!err && user !== null && user.password === md5(req.body.password)) {
        res.render("secrets");
    } else {
        res.render("home");
        console.error(err);
    }
   });
});

app.route("/register").get((req, res) => {
    res.render("register");
}).post((req, res) => {
    const user = new User({
        email: req.body.username,
        password: md5(req.body.password)
    });
    user.save((err, user) => {
        if (err) {
            console.error(err);
        }
        res.render("home")
    });
})

// catch 404 error and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

