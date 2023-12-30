const mongoose = require("mongoose");
//student schema

const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    profilePicture: { type: String }, // You might store the path or URL of the image
    dateOfBirth: { type: Date },
    gender: { type: String },
    location: { type: String },
    bio: { type: String },
    role: {
      type: String,
      default: "user", // Default role is "user"
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
