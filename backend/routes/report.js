const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

let userModel, gredditModel, postModel, reportModel;
let reportExpireTime = 1000 * 60 * 60 * 24 * 7; // ms * s * m * h * d

router.post("/createReport", (req, res) => {
  const { id, postId, reason, reportedUser } = req.body;

  const newReport = new reportModel({
    _id: mongoose.Types.ObjectId(),
    reason: reason,
    reportedPost: postId,
    reportedBy: id,
    reportedUser: reportedUser,
  });

  postModel.findByIdAndUpdate(postId, {$push: {reports: newReport._id}}, (err, post) => {
    if (err) return res.status(201).send("Database error");
    else {
      newReport.save((err, result) => {
        if (err) return res.status(201).send("Database error");
        else return res.status(200).send("Successfully reported");
      });
    }
  });
});

router.post("/getReports", (req, res) => {
  const { id, subId } = req.body;

  gredditModel.findById(subId, (err, greddit) => {
    if (err) return res.status(201).send("Database error");
    else {
      reportModel
        .find({ reportedPost: { $in: greddit.posts } })
        .populate("reportedPost")
        .populate("reportedBy")
        .populate("reportedUser")
        .exec((err, result) => {
          if (err) return res.status(201).send("Database error");
          else{
            result.forEach((report) => {
              if (report._id.getTimestamp().getTime() + reportExpireTime < Date.now()) {
                deleteReportById(report._id);
              }
            });
            result = result.filter((report) => {
              return report._id.getTimestamp().getTime() + reportExpireTime > Date.now();
            });
            return res.status(200).send(result);
          }
        });
    }
  });
});

function deleteReportById(reportId) {
  reportModel.findByIdAndDelete(reportId, (err, result) => {
    if (err) return res.status(201).send("Database error");
    else {
      postModel.find({ reports: { $in: reportId } }, (err, result) => {
        if (err) return res.status(201).send("Database error");
        else if(result && result[0]){
          result[0].reports.pull(reportId);
          result[0].save((err, result) => {
            if (err) return res.status(201).send("Database error");
          });
        }
      });
    }
  });
}

router.get("/delete/:reportId", (req, res) => {
  const { reportId } = req.params;

  deleteReportById(reportId);
});

module.exports = (_userModel, _gredditModel, _postModel, _reportModel) => {
  userModel = _userModel;
  gredditModel = _gredditModel;
  postModel = _postModel;
  reportModel = _reportModel;
  return router;
};
