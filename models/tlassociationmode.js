const mongoose = require("mongoose");

const TLAssociationSchema = new mongoose.Schema(
  {
    taskLabelID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    taskID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    labelID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Label",
      required: true,
    },
  },
  { timestamps: true }
);

const TLAssociationModel = mongoose.model("TLAssociation", TLAssociationSchema);

module.exports = TLAssociationModel;
