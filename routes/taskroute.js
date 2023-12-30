const express = require("express");
const TaskController = require("../controllers/taskcontroller");
const AuthController = require("../controllers/authcontroller");
const route = express.Router();

route.get("/", AuthController.protected, TaskController.get);
// route.get('/search',()=>{}) //fixed route
route.get("/:id", AuthController.protected, TaskController.getById); // get by id path Task/...id...
route.post("/", TaskController.add); // post in /Task
route.put("/:id", TaskController.edit); // update in id path Task/...id...
route.delete("/:id", TaskController.del); // delete id path Task/...id...

module.exports = route;
