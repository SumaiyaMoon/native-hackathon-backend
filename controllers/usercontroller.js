const { SendResponse } = require("../helpers/helpers");
const UserModel = require("../models/authmodel");
const bcrypt = require("bcryptjs");

const UserController = {
  // Route to add a new user (protected, admin only)
  add: async (req, res) => {
    try {
      let { userName, password, userContact, email } = req.body;
      let obj = { userName, password, userContact, email };
      let errArr = [];

      if (!obj.userName) {
        errArr.push("User Name is Required");
      }
      if (!obj.password) {
        errArr.push("Password is Required");
      }
      if (!obj.email) {
        errArr.push("Email is Required");
      }

      if (errArr.length > 0) {
        res.status(400).send(SendResponse(false, "Validation Error", errArr));
        return;
      }

      let userExist = await UserModel.findOne({ userName: obj.userName });

      if (userExist) {
        res
          .status(400)
          .send(SendResponse(false, "User Already Exist with this User Name"));
        return;
      }

      obj.password = await bcrypt.hash(obj.password, 10);

      let User = new UserModel(obj);
      let result = await User.save();

      if (result) {
        res
          .status(200)
          .send(
            SendResponse(true, "User Created by Admin Successfully", result)
          );
      }
    } catch (error) {
      res.status(500).send(SendResponse(false, "Internal Server Error", error));
    }
  },

  // Route to update user by ID (protected, admin only)
  edit: async (req, res) => {
    try {
      // Get user ID from request parameters
      const id = req.params.id;

      // Get updated user data from request body
      const updatedCourse = req.body;

      // Update the user in the database
      let result = await UserModel.findByIdAndUpdate(id, updatedCourse);

      res
        .status(200)
        .send(SendResponse(true, "Data Updated by Admin Successfully", result));
    } catch (e) {
      res.status(500).send(SendResponse(false, "Internal server Error", e));
    }
  },

  // Route to get all users (protected, admin only)
  get: async (req, res) => {
    try {
      // Retrieve all users from the database
      let result = await UserModel.find();

      res.status(200).send(SendResponse(true, "", result));
    } catch (e) {
      res.status(500).send(SendResponse(false, "Internal Server Error", e));
    }
  },

  // Route to get user by ID (protected, admin only)
  getById: async (req, res) => {
    try {
      // Get user ID from request parameters
      let id = req.params.id;

      // Retrieve the user by ID from the database
      let result = await UserModel.findById(id);

      res.status(200).send(SendResponse(true, "", result));
    } catch (e) {
      res.status(500).send(SendResponse(false, "Internal Server Error", e));
    }
  },

  // Route to delete user by ID (protected, admin only)
  del: (req, res) => {
    try {
      // Get user ID from request parameters
      let id = req.params.id;

      // Delete the user by ID from the database
      UserModel.findByIdAndDelete(id)
        .then(() => {
          res
            .status(200)
            .send(SendResponse(true, "Data Deleted by Admin Successfully"));
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

module.exports = UserController;
