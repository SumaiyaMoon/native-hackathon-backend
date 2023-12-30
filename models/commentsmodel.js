const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    commentID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    taskID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentText: { type: String, required: true },
    commentDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("Comment", commentSchema);

module.exports = CommentModel;
