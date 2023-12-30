const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    notificationID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    taskID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    message: { type: String, required: true },
    notificationDate: { type: Date, default: Date.now, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model("Notification", notificationSchema);

module.exports = NotificationModel;
