const express = require("express");
const CourseController = require("../controllers/coursecontroller");
const AuthController = require("../controllers/authcontroller");
const route = express.Router();

route.get("/", AuthController.protected, CourseController.get);
// route.get('/search',()=>{}) //fixed route
route.get("/:id", AuthController.protected, CourseController.getById); // get by id path course/...id...
route.post("/", CourseController.add); // post in /course
route.put("/:id", CourseController.edit); // update in id path course/...id...
route.delete("/:id", CourseController.del); // delete id path course/...id...

module.exports = route;
