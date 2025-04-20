const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
const path = require("path");
require("dotenv").config();
require("./utils/birthdayChecker");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/birthday-app")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/", require("./routes/userRoutes"));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
