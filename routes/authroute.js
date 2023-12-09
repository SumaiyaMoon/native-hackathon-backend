const express = require("express");
const AuthController = require("../controllers/authcontroller");
const route = express.Router();

route.post("/login", AuthController.login);
route.post("/signup", AuthController.signUp);

module.exports = route;
