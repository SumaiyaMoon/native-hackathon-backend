const mongoose = require("mongoose");
const CourseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    // publishedDate: {
    //   type: Date,
    //   default: Date.now
    // }
  },
  {
    timestamps: true,
  }
);

const CourseModel = mongoose.model("courses", CourseSchema);

module.exports = CourseModel;
