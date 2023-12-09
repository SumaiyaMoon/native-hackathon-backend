// userRoute.js
const express = require("express");
const UserController = require("../controllers/usercontroller");
const AuthController = require("../controllers/authcontroller");
const router = express.Router();

// Route to get all users (protected, admin only)
router.get("/", AuthController.adminProtected, UserController.get);

// Route to add a new user (protected, admin only)
router.post("/", AuthController.adminProtected, UserController.add);

// Route to update user by ID (protected, admin only)
router.put("/:id", AuthController.adminProtected, UserController.edit);

// Route to delete user by ID (protected, admin only)
router.delete("/:id", AuthController.adminProtected, UserController.del);

// Route to get user by ID (protected, admin only)
router.get("/:id", AuthController.adminProtected, UserController.getById);

module.exports = router;
