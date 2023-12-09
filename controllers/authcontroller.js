const { SendResponse } = require("../helpers/helpers");
const UserModel = require("../models/authmodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AuthController = {
  signUp: async (req, res) => {
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
          .send(SendResponse(true, "User Created Successfully", result));
      }
    } catch (error) {
      res.status(500).send(SendResponse(false, "Internal Server Error", error));
    }
  },
  login: async (req, res) => {
    try {
      let { userName, password } = req.body;
      let obj = { userName, password };
      let existingUser = await UserModel.findOne({ userName: obj.userName });

      if (existingUser) {
        let correctPassword = await bcrypt.compare(
          obj.password,
          existingUser.password
        );

        if (correctPassword) {
          let token = jwt.sign({ ...existingUser }, process.env.SECRET_KEY);

          res.status(200).send(
            SendResponse(true, "Login Successfully", {
              token: token,
              user: existingUser,
            })
          );
        } else {
          res.status(401).send(SendResponse(false, "Password Not Match"));
        }
      } else {
        res
          .status(404)
          .send(SendResponse(false, "User Not Found with this User Name"));
      }
    } catch (error) {
      console.error("Error in login:", error);
      res.status(500).send(SendResponse(false, "Internal Server Error", error));
    }
  },
  protected: async (req, res, next) => {
    // 'Bearer jdflsdlfsjhlkdfjslkdfjhshfdkjshfdkjshdfkshdfkj'
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).send(SendResponse(false, "Unauthorized: Token Missing"));
      return;
    } else {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          res
            .status(401)
            .send(SendResponse(false, "Unauthorized: Invalid Token"));
          return;
        } else {
          next();
          return;
        }
      });
    }
  },

  adminProtected: async (req, res, next) => {
    // 'Bearer jdflsdlfsjhlkdfjslkdfjhshfdkjshfdkjshdfkshdfkj'
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).send(SendResponse(false, "Unauthorized: Token Missing"));
      return;
    } else {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          res
            .status(401)
            .send(SendResponse(false, "Unauthorized: Invalid Token"));
          return;
        } else {
          if (decoded._doc.role === "admin") {
            next();
            return;
          } else {
            res.status(403).send(SendResponse(false, "Admin Access Required"));
            return;
          }
        }
      });
    }
  },
};

module.exports = AuthController;
