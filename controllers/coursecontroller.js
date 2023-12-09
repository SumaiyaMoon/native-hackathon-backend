const { SendResponse } = require("../helpers/helpers");
const CourseModel = require("../models/coursemodel");

const CourseController = {
  add: async (req, res) => {
    try {
      const { title, description, instructor, fee } = req.body;
      const obj = new CourseModel({ title, description, instructor, fee });
      let errArr = [];
      if (!obj.title) {
        errArr.push("Required Title");
      }
      if (!obj.description) {
        errArr.push("Required Description");
      }
      if (errArr.length > 0) {
        res.status(400).send(SendResponse(false, "Validation Error!", errArr));
      } else {
        let Course = new CourseModel(obj);
        let result = await Course.save();
        res
          .status(200)
          .send(SendResponse(true, "Data Added successfully", result));
      }
    } catch (e) {
      res.status(500).send(SendResponse(false, "Internal Server Error", e));
    }
  },

  edit: async (req, res) => {
    try {
      const id = req.params.id;
      const updatedCourse = req.body;
      let result = await CourseModel.findByIdAndUpdate(id, updatedCourse);
      res
        .status(200)
        .send(SendResponse(true, "Data Updated Successfully", result));
    } catch (e) {
      res.status(500).send(SendResponse(false, "Internal server Error", e));
    }
  },

  get: async (req, res) => {
    try {
      let result = await CourseModel.find();
      res.status(200).send(SendResponse(true, "", result));
    } catch (e) {
      res.status(500).send(SendResponse(false, "Internal Server Error", e));
    }
  },

  getById: async (req, res) => {
    try {
      let id = req.params.id;
      let result = await CourseModel.findById(id);
      res.status(200).send(SendResponse(true, "", result));
    } catch (e) {
      res.status(500).send(SendResponse(false, "Internal Server Error", e));
    }
  },

  del: (req, res) => {
    try {
      let id = req.params.id;
      CourseModel.findByIdAndDelete(id)
        .then(() => {
          res.status(200).send(SendResponse(true, "Data Deleted Successfully"));
        })
        .catch((err) => {
          res
            .status(400)
            .send(SendResponse(false, "Internal Server Error", err));
        });
    } catch (e) {
      res.status(500).send(SendResponse(false, "Internal Server Error", e));
    }
  },
};

module.exports = CourseController;
