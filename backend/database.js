const {Schema, model, default: mongoose} = require("mongoose");

mongoose.set("strictQuery", false);
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
});
let userModel = model("User", userSchema);

module.exports = { userModel }
