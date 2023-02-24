let express = require("express");
let router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

let userModel;

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  userModel.find({ email }, (err, users) => {
    if (err) {
      res.status(401).send("Database error");
    }
    if (users.length === 0) {
      res.status(201).send("No user with given email found");
    }
    bcrypt.compare(password, users[0].password, (err, result) => {
      if (err) {
        res.status(201).send("Invalid Credentials");
      } else if (result) {
        const token = jwt.sign(
          { email: users[0].email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "7d" }
        );
        res.status(200).send({ token, id: users[0]._id });
      } else {
        res.status(201).send("Invalid Credentials");
      }
    });
  });
});

router.post("/signup", async (req, res) => {
  let hashedPassword = await bcrypt.hash(req.body.password, 10);
  let user = new userModel({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: hashedPassword,
    username: req.body.username,
    Fname: req.body.first_name,
    Lname: req.body.last_name,
    date_of_birth: req.body.date_of_birth,
    contact: req.body.contact,
    followers: [],
    following: [],
    picture: "http://localhost:3000/user-images/default.jpg",
    greddits: [],
    posts: [],
    savedPosts: [],
  });
  user.save((err, result) => {
    if (err) {
      console.log(err);
      if (err.code == 11000) {
        res.status(200).send("Email already exists");
      }
    } else {
      const token = jwt.sign(
        { email: result.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "7d" }
      );
      res.status(200).send({ token, id: result._id });
    }
  });
});

router.post("/checkLogin", (req, res) => {
  const token = req.body.token;
  if (token == null) return res.sendStatus(201);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(201).send("Invalid Token");
    res.status(200).send("Success");
  });
});

module.exports = function(_userModel) {
    userModel = _userModel;
    return router;
};