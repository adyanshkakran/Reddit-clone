let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let userModel, gredditModel, postModel, reportModel;

router.post("/createPost", (req, res) => {
  let { title, content, id, subId } = req.body;

  let post = new postModel({
    _id: new mongoose.Types.ObjectId(),
    title,
    content,
    postedBy: id,
    greddit: subId,
    comments: [],
    upvotes: [],
    downvotes: [],
    reports: [],
  });

  userModel.findByIdAndUpdate(
    id,
    { $push: { posts: post._id } },
    (err, result) => {
      if (err) {
        return res.status(201).send("Database error User");
      } else {
        gredditModel.findByIdAndUpdate(
          subId,
          { $push: { posts: post._id } },
          (err2, result) => {
            if (err2) {
              return res.status(201).send("Database error Greddit");
            } else {
              post.save((err3, result) => {
                if (err3) {
                  return res.status(201).send("Database error Post");
                } else {
                  return res.status(200).send("Successfully created Post");
                }
              });
            }
          }
        );
      }
    }
  );
});

router.get("/getPostsBySub/:subId", (req, res) => {
  let { subId } = req.params;

  gredditModel
    .findById(subId)
    .populate({
      path: "posts",
      populate: [
        {
          path: "postedBy",
          model: "User",
        },
        {
          path: "comments.commentedBy",
          model: "User",
        },
      ],
    })
    .exec((err, result) => {
      if (err) {
        console.log(err);
        return res.status(201).send("Database error");
      } else {
        // console.log(result.posts[0].comments);
        return res.status(200).send(result.posts);
      }
    });
});

router.post("/comment", (req, res) => {
  let { postId, id, content } = req.body;
  const comment = { content, commentedBy: id };

  postModel.findByIdAndUpdate(
    postId,
    { $push: { comments: comment } },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(201).send("Database error");
      } else {
        return res.status(200).send("Successfully commented");
      }
    }
  );
});

router.post("/upvote", (req, res) => {
  let { postId, id } = req.body;

  postModel.findById(
    postId,
    (err, result) => {
      if(err)
        res.status(201).send("Database error");
      else {
        if(result.upvotes.includes(id)) {
          postModel.findByIdAndUpdate(
            postId,
            { $pull: { upvotes: id } },
            (err, result) => {
              if(err)
                res.status(201).send("Database error");
              else
                res.status(200).send("Successfully upvoted");
            }
          );
        } else {
          postModel.findByIdAndUpdate(
            postId,
            { $push: { upvotes: id } },
            (err, result) => {
              if(err)
                res.status(201).send("Database error");
              else
                res.status(200).send("Successfully upvoted");
            }
          );
        }
      }
    }
  );
});

router.post("/downvote", (req, res) => {
  let { postId, id } = req.body;

  postModel.findById(
    postId,
    (err, result) => {
      if(err)
        res.status(201).send("Database error");
      else {
        if(result.downvotes.includes(id)) {
          postModel.findByIdAndUpdate(
            postId,
            { $pull: { downvotes: id } },
            (err, result) => {
              if(err)
                res.status(201).send("Database error");
              else
                res.status(200).send("Successfully downvoted");
            }
          );
        } else {
          postModel.findByIdAndUpdate(
            postId,
            { $push: { downvotes: id } },
            (err, result) => {
              if(err)
                res.status(201).send("Database error");
              else
                res.status(200).send("Successfully downvoted");
            }
          );
        }
      }
    }
  );
});

router.post("/save", (req, res) => {
  const { postId, id, saveOrNot } = req.body;

  if(saveOrNot) {
    userModel.findByIdAndUpdate(
      id,
      { $push: { savedPosts: postId } },
      (err, result) => {
        if(err)
          res.status(201).send("Database error");
        else
          res.status(200).send("Successfully saved");
      }
    );
  }else{
    userModel.findByIdAndUpdate(
      id,
      { $pull: { savedPosts: postId } },
      (err, result) => {
        if(err)
          res.status(201).send("Database error");
        else
          res.status(200).send("Successfully unsaved");
      }
    );
  }
});

function deletePostById(postId, res) {
  gredditModel.findOneAndUpdate(
    { posts: { $in: [postId] } },
    { $pull: { posts: postId } },
    (err, result) => {
      if(err)
        res.status(201).send("Database error");
      else {
        userModel.findOneAndUpdate(
          { posts: { $in: [postId] } },
          { $pull: { posts: postId } },
          (err, result) => {
            if(err)
              res.status(201).send("Database error");
            else {
              postModel.findById(
                postId,
                (err, result) => {
                  if(err)
                    res.status(201).send("Database error");
                  else{
                    console.log(result);
                    result.reports.forEach((i) => {
                      reportModel.findByIdAndDelete(i, (err, result) => {
                        if(err)
                        console.log(err);
                      });
                    }
                    )
                    result.remove();
                    return res.status(200).send("Successfully deleted");
                  }
                }
              );
            }
          }
        );
      }
    }
  )
}

router.get("/delete/:postId", (req, res) => {
  let { postId } = req.params;

  deletePostById(postId, res);
});

module.exports = (_userModel, _gredditModel, _postModel, _reportModel) => {
  userModel = _userModel;
  gredditModel = _gredditModel;
  postModel = _postModel;
  reportModel = _reportModel;
  return router;
};
