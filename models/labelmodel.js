const mongoose = require("mongoose");

const labelSchema = new mongoose.Schema(
  {
    labelID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    color: { type: String, required: true },
  },
  { timestamps: true }
);

const LabelModel = mongoose.model("Label", labelSchema);

module.exports = LabelModel;
