const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { config } = require("dotenv");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {
  userSchema,
  gredditSchema,
  postSchema,
  reportSchema,
} = require("./schema");

const indexRouter = require("./routes/index");
const userRoutes = require("./routes/user");
const loginRoutes = require("./routes/login");
const gredditRoutes = require("./routes/greddit");
const postRoutes = require("./routes/post");
const reportRoutes = require("./routes/report");

const app = express();
config();
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URI, {}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database");
  }
});

const userModel = mongoose.model("User", userSchema);
const gredditModel = mongoose.model("Greddit", gredditSchema);
const postModel = mongoose.model("Post", postSchema);
const reportModel = mongoose.model("Report", reportSchema);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "UPDATE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", loginRoutes(userModel));
app.use(validateToken);

app.use("/", indexRouter);
app.use(
  "/report",
  reportRoutes(userModel, gredditModel, postModel, reportModel)
);
app.use("/user", userRoutes(userModel));
app.use("/sub", gredditRoutes(userModel, gredditModel, postModel));
app.use("/post", postRoutes(userModel, gredditModel, postModel, reportModel));

async function validateToken(req, res, next) {
  if (
    req.path === "/login" ||
    req.path === "/register" ||
    req.path === "/"
  ) {
    return next();
  }
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(201).json({
      error: true,
      message: "Access token is missing",
    });
  }
  const token = authorizationHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(201).send("Invalid token");
    }
  });
  next();
}

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
