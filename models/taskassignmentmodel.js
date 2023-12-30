const mongoose = require("mongoose");

const taskAssignmentSchema = new mongoose.Schema(
  {
    assignmentID: {
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
    assignedDate: { type: Date, default: Date.now },
    completedDate: { type: Date },
  },
  { timestamps: true }
);

const TaskAssignmentModel = mongoose.model(
  "TaskAssignment",
  taskAssignmentSchema
);

module.exports = TaskAssignmentModel;
