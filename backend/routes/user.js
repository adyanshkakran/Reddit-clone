let express = require("express");
let router = express.Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const upload = multer({ dest: "public/user-images/" });
const fs = require("fs");

let userModel;

router.post("/getUser", (req, res) => {
  const id = req.body.id;
  if (id == null) return res.status(201).send("No id provided");

  userModel.findById(id, (err, users) => {
    if (err) {
      res.status(201).send("Database error");
    } else if (!users) {
      res.status(201).send("No user with given email found");
    } else res.status(200).send(users);
  });
});

router.post("/updateUser", (req, res) => {
  const id = req.body.id;
  if (id == null) return res.status(201).send("No id provided");

  userModel.findByIdAndUpdate(id, req.body, (err, users) => {
    if (err) {
      res.status(201).send("Database error");
    }
    if (!users) {
      res.status(201).send("No user with given email found");
    }
    res.status(200).send("Successfully updated");
  });
});

router.post("/updatePassword", (req, res) => {
  const id = req.body.id;
  if (id == null) return res.status(201).send("No id provided");

  const password = req.body.password;
  const newPassword = req.body.newPassword;
  userModel.findById(id, (err, users) => {
    if (err) {
      res.status(201).send("Database error");
    }
    if (!users) {
      res.status(201).send("No user with given email found");
    }
    bcrypt.compare(password, users.password, (err, result) => {
      if (err) {
        res.status(201).send("Invalid Credentials 1");
      } else if (result) {
        bcrypt.hash(newPassword, 10, (err, hash) => {
          if (err) {
            res.status(201).send("Database error");
          } else {
            userModel.findByIdAndUpdate(
              id,
              { password: hash },
              (err, users) => {
                if (err) {
                  res.status(201).send("Database error");
                }
                if (!users) {
                  res.status(201).send("No user with given email found");
                }
                res.status(200).send("Successfully updated");
              }
            );
          }
        });
      } else {
        res.status(201).send("Invalid Credentials");
      }
    });
  });
});

router.post("/updatePicture", upload.single("picture"), (req, res) => {
  const file = req.file;
  const id = req.body.id;
  res.status(200);

  if (!file) return res.status(201).send("No image provided");

  const url =
    "http://localhost:3000/user-images/" +
    id +
    "." +
    file.mimetype.split("/")[1];
  fs.rename(
    file.path,
    "public/user-images/" + id + "." + file.mimetype.split("/")[1],
    (err) => {}
  );

  userModel.findByIdAndUpdate(id, { picture: url }, (err, users) => {
    if (err) return res.status(201).send("Database error");
    else
      return res
        .status(200)
        .send("Successfully updated! Reload to view picture.");
  });
});

router.post("/follow", (req, res) => {
  const { followerId, id, followOrNot } = req.body;

  if (followOrNot) {
    userModel.findByIdAndUpdate(
      followerId,
      { $push: { following: id } },
      (err, result) => {
        if (err) res.status(201).send("Database error");
        else {
          userModel.findByIdAndUpdate(
            id,
            { $push: { followers: followerId } },
            (err, result) => {
              if (err) res.status(201).send("Database error");
              else res.status(200).send("Successfully followed");
            }
          );
        }
      }
    );
  } else {
    userModel.findByIdAndUpdate(
      followerId,
      { $pull: { following: id } },
      (err, result) => {
        if (err) res.status(201).send("Database error");
        else {
          userModel.findByIdAndUpdate(
            id,
            { $pull: { followers: followerId } },
            (err, result) => {
              if (err) res.status(201).send("Database error");
              else res.status(200).send("Successfully unfollowed");
            }
          );
        }
      }
    );
  }
});

router.post("/removeFollower", (req, res) => {
  const { followerId, id } = req.body;

  userModel.findByIdAndUpdate(
    followerId,
    { $pull: { following: id } },
    (err, result) => {
      if (err) res.status(201).send("Database error");
      else {
        userModel.findByIdAndUpdate(
          id,
          { $pull: { followers: followerId } },
          (err, result) => {
            if (err) res.status(201).send("Database error");
            else res.status(200).send("Successfully removed");
          }
        );
      }
    }
  );
});

router.post("/getFollow", (req, res) => {
  const id = req.body.id;
  if (id == null) return res.status(201).send("No id provided follow");

  userModel
    .findById(id)
    .populate("followers")
    .populate("following")
    .exec((err, users) => {
      if (err) {
        res.status(201).send("Database error");
      } else if (!users) {
        res.status(201).send("No user with given email found");
      } else
        res
          .status(200)
          .send({ followers: users.followers, following: users.following });
    });
});

router.get("/getSavedPosts/:id", (req, res) => {
  const id = req.params.id;
  if (id == null) return res.status(201).send("No id provided");

  userModel
    .findById(id)
    .populate({
      path: "savedPosts",
      populate: {
        path: "postedBy",
        model: "User",
      },
    })
    .exec((err, users) => {
      if (err) {
        res.status(201).send("Database error");
      } else if (!users) {
        res.status(201).send("No user with given email found");
      } else res.status(200).send(users.savedPosts);
    });
});

module.exports = function (_userModel) {
  userModel = _userModel;
  return router;
};
