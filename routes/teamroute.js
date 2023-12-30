const express = require("express");
const TeamController = require("../controllers/teamcontroller");
const AuthController = require("../controllers/authcontroller");
const route = express.Router();

route.get("/", AuthController.protected, TeamController.get);
// route.get('/search',()=>{}) //fixed route
route.get("/:id", AuthController.protected, TeamController.getById); // get by id path Team/...id...
route.post("/", TeamController.add); // post in /Team
route.put("/:id", TeamController.edit); // update in id path Team/...id...
route.delete("/:id", TeamController.del); // delete id path Team/...id...

module.exports = route;
