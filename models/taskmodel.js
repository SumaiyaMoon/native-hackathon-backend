const mongoose = require("mongoose");
//student schema

const TaskSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    priority: { type: String, enum: ["Low", "High", "Moderate"] },
    status: { type: String, enum: ["InProgress", "Completed", "NotStarted"] },
    labels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Label" }],
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("Tasks", TaskSchema);

module.exports = TaskModel;
