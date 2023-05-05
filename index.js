const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
// const axios = require("axios");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const userRoutes = require("./routes/user");
const favComRoutes = require("./routes/favcom");
const gameRoutes = require("./routes/games");

app.use(userRoutes);
app.use(favComRoutes);
app.use(gameRoutes);

app.get("/test", (req, res) => {
  try {
    res.json("Test route");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json("Route introuvable");
});

app.listen(process.env.PORT || 4500, () => {
  console.log("Server started");
});
