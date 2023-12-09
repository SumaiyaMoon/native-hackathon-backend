const mongoose = require("mongoose");
//student schema

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "User Name is Required"],
  },
  userContact: {
    type: Number,
  },
  email: {
    type: String,
    required: [true, "User Name is Required"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  role: {
    type: String,
    default: "user", // Default role is "user"
  },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
