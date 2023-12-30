const { SendResponse } = require("../helpers/helpers");
const ProjectModel = require("../models/projectmodel");

const ProjectController = {
  add: async (req, res) => {
    try {
      const { name, description } = req.body;
      const obj = new ProjectModel({ name, description });
      let errArr = [];
      if (!obj.name) {
        errArr.push("Required name");
      }
      if (!obj.description) {
        errArr.push("Required Description");
      }
      if (errArr.length > 0) {
        res.status(400).send(SendResponse(false, "Validation Error!", errArr));
      } else {
        let Project = new ProjectModel(obj);
        let result = await Project.save();
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
      const updatedProject = req.body;
      let result = await ProjectModel.findByIdAndUpdate(id, updatedProject);
      res
        .status(200)
        .send(SendResponse(true, "Data Updated Successfully", result));
    } catch (e) {
      res.status(500).send(SendResponse(false, "Internal server Error", e));
    }
  },

  get: async (req, res) => {
    try {
      let result = await ProjectModel.find();
      res.status(200).send(SendResponse(true, "", result));
    } catch (e) {
      res.status(500).send(SendResponse(false, "Internal Server Error", e));
    }
  },

  getById: async (req, res) => {
    try {
      let id = req.params.id;
      let result = await ProjectModel.findById(id);
      res.status(200).send(SendResponse(true, "", result));
    } catch (e) {
      res.status(500).send(SendResponse(false, "Internal Server Error", e));
    }
  },

  del: (req, res) => {
    try {
      let id = req.params.id;
      ProjectModel.findByIdAndDelete(id)
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

module.exports = ProjectController;
