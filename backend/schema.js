const { Schema } = require("mongoose");

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  Fname: {
    type: String,
    required: true,
  },
  Lname: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  followers: {
    required: true,
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  following: {
    required: true,
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  picture: {
    type: String,
    required: true,
  },
  greddits: {
    required: true,
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Greddit",
      },
    ],
  },
  posts: {
    required: true,
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  savedPosts: {
    required: true,
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
});

const gredditSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  posts: {
    required: true,
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      }
    ],
  },
  description: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  tags: {
    required: true,
    type: [
      {
        type: String,
      },
    ],
  },
  bannedUsers: {
    required: true,
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  followers: {
    required: true,
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  bannedKeywords: {
    required: true,
    type: [
      {
        type: String,
      },
    ],
  },
  joinRequests: {
    required: true,
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  rejectedRequests: {
    required: true,
    type: [{
      User: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      Time: {
        type: Date,
      }
    }
    ],
  },
});

const postSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  greddit: {
    type: Schema.Types.ObjectId,
    ref: "Greddit",
    required: true,
  },
  comments: {
    required: true,
    type: [{
      content: {
        type: String,
      },
      commentedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    }
    ],
  },
  upvotes: {
    required: true,
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  downvotes: {
    required: true,
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  reports: {
    required: true,
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Report",
      }
    ]
  },
});

const reportSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  reportedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reportedPost: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  reportedUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = { userSchema, gredditSchema, postSchema, reportSchema };
