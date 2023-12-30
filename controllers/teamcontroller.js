const { SendResponse } = require("../helpers/helpers");
const TeamModel = require("../models/teammodel");

const TeamController = {
  add: async (req, res) => {
    try {
      const { title, description } = req.body;
      const obj = new TeamModel({ title, description });
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
        let Team = new TeamModel(obj);
        let result = await Team.save();
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
      const updatedTeam = req.body;
      let result = await TeamModel.findByIdAndUpdate(id, updatedTeam);
      res
        .status(200)
        .send(SendResponse(true, "Data Updated Successfully", result));
    } catch (e) {
      res.status(500).send(SendResponse(false, "Internal server Error", e));
    }
  },

  get: async (req, res) => {
    try {
      let result = await TeamModel.find();
      res.status(200).send(SendResponse(true, "", result));
    } catch (e) {
      res.status(500).send(SendResponse(false, "Internal Server Error", e));
    }
  },

  getById: async (req, res) => {
    try {
      let id = req.params.id;
      let result = await TeamModel.findById(id);
      res.status(200).send(SendResponse(true, "", result));
    } catch (e) {
      res.status(500).send(SendResponse(false, "Internal Server Error", e));
    }
  },

  del: (req, res) => {
    try {
      let id = req.params.id;
      TeamModel.findByIdAndDelete(id)
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

module.exports = TeamController;
