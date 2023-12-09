// Import all the dependencies
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

//Import all the routes
const courseRoute = require("./routes/courseroute");
const authRoute = require("./routes/authroute");
const userRoute = require("./routes/userroute");

// Initialize Express application
const App = express();

// Middleware setup
App.use(express.json()); // Middleware for parsing JSON in requests
App.use(cors()); // Middleware for Cross-Origin Resource Sharing

// Mounting route handlers for specific paths
App.use("/course", courseRoute); //getting all courses here
App.use("/auth", authRoute);
App.use("/users", userRoute);

// Establishes a connection to a MongoDB database using Mongoose and starts the Express server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    App.listen(process.env.PORT, () => {
      console.log(
        `Database Connected and server is running on http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("err", err);
  });
