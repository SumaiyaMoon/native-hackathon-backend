const express = require("express");
const ProjectController = require("../controllers/projectcontroller");
const AuthController = require("../controllers/authcontroller");
const route = express.Router();

route.get("/", AuthController.protected, ProjectController.get);
// route.get('/search',()=>{}) //fixed route
route.get("/:id", AuthController.protected, ProjectController.getById); // get by id path Project/...id...
route.post("/", ProjectController.add); // post in /Project
route.put("/:id", ProjectController.edit); // update in id path Project/...id...
route.delete("/:id", ProjectController.del); // delete id path Project/...id...

module.exports = route;
