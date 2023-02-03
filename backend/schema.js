const { Schema } = require("mongoose");

const userSchema = new Schema({
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
  Contact: {
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
        ref: "userModel",
      },
    ],
  },
  following: {
    required: true,
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "userModel",
      },
    ],
  },
});

module.exports = { userSchema };
