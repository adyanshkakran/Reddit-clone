let express = require("express");
let router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");
const upload = multer({ dest: "public/greddit-images/" });
const fs = require("fs");

let userModel, gredditModel, postModel;

router.post("/createSub", upload.single("image"), (req, res) => {
  let { name, description, tags, keywords, id } = req.body;
  let file = req.file;
  let bannedKeywords = keywords.split(",");
  bannedKeywords = bannedKeywords.map((keyword) => keyword.trim());
  tags = tags.split(",");
  tags = tags.map((tag) => tag.trim());
  let subId = mongoose.Types.ObjectId();
  const url =
    "http://localhost:3000/greddit-images/" +
    subId +
    "." +
    file.mimetype.split("/")[1];
  fs.rename(
    file.path,
    "public/greddit-images/" + subId + "." + file.mimetype.split("/")[1],
    (err) => {}
  );

  let greddit = new gredditModel({
    _id: subId,
    createdAt: Date.now(),
    name,
    description,
    bannedKeywords,
    tags,
    picture: url,
    bannedUsers: [],
    followers: [id],
    posts: [],
    joinRequests: [],
    rejectedRequests: [],
  });

  userModel.findByIdAndUpdate(
    id,
    { $push: { greddits: greddit._id } },
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );

  greddit.save((err, result) => {
    if (err) {
      console.log(err);
      if (err.code == 11000) {
        res.status(200).send("Subreddit already exists");
      }
    } else {
      res.status(200).send("Successfully created");
    }
  });
});

router.post("/getSubs", (req, res) => {
  let { id } = req.body;

  userModel
    .findById(id)
    .populate("greddits")
    .exec((err, result) => {
      if (err) {
        console.log(err);
        res.status(201).send("Database error");
      } else if (result) {
        res.status(200).send(result.greddits);
      } else {
        res.status(201).send([]);
      }
    });
});

// PROBEOMELFIWNEOIHWEOPFIHCOIWEHCOIWEHOIWEHCOIWHECOWIHEPIHWECOIWHECOPIWEHCIHewjfhfeiquwhefiuheiqfhuieqfhuoiwjoqiw
router.delete("/deleteSub", (req, res) => {
  let { id, subId } = req.body;

  postModel.deleteMany({ greddit: subId }, (err, result) => {
    if (err) {
      res.status(201).send("Database error");
    } else {
      gredditModel.findByIdAndDelete(subId, (err, result) => {
        if (err) {
          res.status(201).send("Database error");
        } else if (result) {
          userModel.findByIdAndUpdate(
            id,
            { $pull: { greddits: subId } },
            (err2, result2) => {
              if (err2) {
                res.status(201).send("Database error");
              } else {
                res.status(200).send("Successfully deleted");
              }
            }
          );
        }
      });
    }
  });
});

router.post("/checkSubOwner", (req, res) => {
  const { id, subId } = req.body;

  userModel
    .findById(id)
    .populate("greddits")
    .exec((err, result) => {
      if (err) {
        res.status(201).send("Database error");
      } else {
        let isOwner = -1;
        result.greddits.forEach((sub, index) => {
          if (sub._id == subId) {
            isOwner = index;
          }
        });
        if (isOwner != -1) res.status(200).send(result.greddits[isOwner]);
        else res.status(201).send("You are not a moderator for this greddit.");
      }
    });
});

router.post("/getFollowersAndBlocked", (req, res) => {
  const { subId } = req.body;

  gredditModel
    .findById(subId)
    .populate("followers")
    .populate("bannedUsers")
    .exec((err, result) => {
      if (result) {
        // console.log(result.followers,result.bannedUsers);
        res.status(200).send({
          followers: result.followers,
          bannedUsers: result.bannedUsers,
        });
      } else {
        res.status(201).send("Couldn't get followers and banned users");
      }
    });
});

router.post("/getRequests", (req, res) => {
  const { subId } = req.body;

  gredditModel
    .findById(subId)
    .populate("joinRequests")
    .exec((err, result) => {
      if (result) {
        res.status(200).send(result.joinRequests);
      } else {
        res.status(201).send("Couldn't get Banned Users");
      }
    });
});

router.post("/acceptRequest", (req, res) => {
  const { subId, userId } = req.body;
  gredditModel.findByIdAndUpdate(
    subId,
    { $pull: { joinRequests: userId }, $push: { followers: userId } },
    (err, result) => {
      if (result) res.status(200).send("Successfully accepted");
      else res.status(201).send("Couldn't accept request");
    }
  );
});

router.post("/denyRequest", (req, res) => {
  const { subId, userId } = req.body;
  gredditModel.findByIdAndUpdate(
    subId,
    {
      $pull: { joinRequests: userId },
      $push: { rejectedRequests: { User: userId, Time: Date.now() } },
    },
    (err, result) => {
      if (result) res.status(200).send("Successfully denied");
      else res.status(201).send("Couldn't deny request");
    }
  );
});

router.get("/getSubs", (req, res) => {
  gredditModel.find({}, (err, result) => {
    if (err) {
      return res.status(201).send("Database error");
    } else {
      return res.status(200).send(result);
    }
  });
});

router.post("/getSub", (req, res) => {
  const { subId } = req.body;

  gredditModel.findById(subId, (err, result) => {
    if (err) {
      return res.status(201).send("Database error");
    } else {
      return res.status(200).send(result);
    }
  });
});

router.post("/leaveSub", (req, res) => {
  const { id, subId } = req.body;

  gredditModel.findByIdAndUpdate(subId, { $pull: { followers: id } }, (err) => {
    if (err) {
      return res.status(201).send("Database error");
    } else {
      return res.status(200).send("Successfully left");
    }
  });
});

router.post("/sendRequest", (req, res) => {
  const { id, subId } = req.body;

  gredditModel.findByIdAndUpdate(
    subId,
    { $push: { joinRequests: id } },
    (err, result) => {
      if (result) res.status(200).send("Successfully sent request");
      else res.status(201).send("Couldn't send request");
    }
  );
});

router.post("/blockUser", (req, res) => {
  const { id, subId } = req.body;

  postModel.updateMany(
    { greddit: subId, postedBy: id },
    { postedBy: mongoose.Types.ObjectId("63f73f533f851bc154c33ea9") },
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(201).send("Couldn't block user");
      } else {
        gredditModel.findByIdAndUpdate(
          subId,
          { $push: { bannedUsers: id }, $pull: { followers: id } },
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(201).send("Couldn't block user greddit");
            } else {
              res.status(200).send("Successfully blocked user");
            }
          }
        );
      }
    }
  );
});

module.exports = function (_userModel, _gredditModel, _postModel) {
  userModel = _userModel;
  gredditModel = _gredditModel;
  postModel = _postModel;
  return router;
};
