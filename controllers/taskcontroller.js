const { SendResponse } = require("../helpers/helpers");
const TaskModel = require("../models/taskmodel");

const TaskController = {
  add: async (req, res) => {
    try {
      const { title, description } = req.body;
      const obj = new TaskModel({ title, description });
      let errArr = [];
      if (!obj.title) {
        errArr.push("Required title");
      }
      if (!obj.description) {
        errArr.push("Required description");
      }
      if (errArr.length > 0) {
        res.status(400).send(SendResponse(false, "Validation Error!", errArr));
      } else {
        let Task = new TaskModel(obj);
        let result = await Task.save();
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
      const updatedTask = req.body;
      let result = await TaskModel.findByIdAndUpdate(id, updatedTask);
      res
        .status(200)
        .send(SendResponse(true, "Data Updated Successfully", result));
    } catch (e) {
      res.status(500).send(SendResponse(false, "Internal server Error", e));
    }
  },

  get: async (req, res) => {
    try {
      let result = await TaskModel.find();
      res.status(200).send(SendResponse(true, "", result));
    } catch (e) {
      res.status(500).send(SendResponse(false, "Internal Server Error", e));
    }
  },

  getById: async (req, res) => {
    try {
      let id = req.params.id;
      let result = await TaskModel.findById(id);
      res.status(200).send(SendResponse(true, "", result));
    } catch (e) {
      res.status(500).send(SendResponse(false, "Internal Server Error", e));
    }
  },

  del: (req, res) => {
    try {
      let id = req.params.id;
      TaskModel.findByIdAndDelete(id)
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

module.exports = TaskController;
