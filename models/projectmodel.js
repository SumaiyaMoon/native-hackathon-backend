const mongoose = require("mongoose");
//student schema

const ProjectSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    labels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Label" }],
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Projects", ProjectSchema);

module.exports = ProjectModel;
