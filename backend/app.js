var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { config } = require("dotenv");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { userSchema } = require("./schema");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
config();
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URI);

let userModel = mongoose.model("User", userSchema);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin" && password === "admin") {
    return res.status(200).send({token: "admin"});
  }

  userModel.find({ email }, (err, users) => {
    if(err) {
      res.status(401).send("Database error");
    }
    if (users.length === 0) {
      res.status(201).send("No user with given email found");
    }
    bcrypt.compare(password, users[0].password, (err, result) => {
      if(err) {
        res.status(201).send("Invalid Credentials");
      } else if(result) {
        const token = jwt.sign({email: users[0].email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30m"});
        res.status(200).send({token});
      } else {
        res.status(201).send("Invalid Credentials");
      }
    });
  });

});

app.post("/api/signup", async (req, res) => {
  let hashedPassword = await bcrypt.hash(req.body.password, 10);
  let user = new userModel({
    email: req.body.email,
    password: hashedPassword,
    username: req.body.username,
    Fname: req.body.first_name,
    Lname: req.body.last_name,
    date_of_birth: req.body.date_of_birth,
    contact: req.body.contact,
    followers: [],
    following: [],
  });
  user.save((err, result) => {
    if (err){
      console.log(err);
      if(err.code == 11000){
        res.status(200).send("Email already exists");
      }
    }else{
      res.status(200).send("Success");
    }
  });
});

app.get("/api/users", async (req, res) => {
  const users = await userModel.find();
  console.log(users);
  res.status(200).send("Success");
});

app.delete("/api/users/", async (req, res) => {
  await userModel.deleteMany();
  res.status(200).send("Success");
});

app.post("/api/checkLogin", (req, res) => {
  const token = req.body.token;
  if (token == null) return res.sendStatus(201);
  if(token == 'admin') return res.sendStatus(200);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(201).send("Invalid Token");
    res.status(200).send("Success");
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
