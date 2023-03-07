const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");
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

app.use(userRoutes);
app.use(favComRoutes);

app.get("/test", (req, res) => {
  try {
    res.json("Test route");
  } catch {
    res.status(400).json({ message: error.message });
  }
});
app.get("/", async (req, res) => {
  try {
    const page = req.query.page;
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.API_KEY}&dates=2022-12-01,2023-11-30&platforms=18,1,7&page=${page}`
    );
    // console.log(response.data);
    res.json(response.data);
  } catch {
    res.status(400).json(error);
  }
});
app.get("/allgames", async (req, res) => {
  try {
    const page = req.query.page || "";
    console.log(req.query.page);
    const search = req.query.search || "";
    const type = req.query.genres || "";
    // console.log(req.query.genres);
    const platform = req.query.platforms || "";
    const sort = req.query.ordering || "";

    if (!type && !platform && !sort) {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${page}&search=${search}`
      );
      //   console.log(response.data);
      res.json(response.data);
    } else if (type && !platform && !sort) {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${page}&search=${search}&genres=${type}`
      );
      //   console.log(response.data);
      res.json(response.data);
    } else if (type && platform && !sort) {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${page}&search=${search}&genres=${type}&platforms=${platform}`
      );
      //   console.log(response.data);
      res.json(response.data);
    } else if (!type && !platform && sort) {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${page}&search=${search}&ordering=${sort}`
      );
      //   console.log(response.data);
      res.json(response.data);
    } else if (!type && platform) {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${page}&search=${search}&platforms=${platform}`
      );
      //   console.log(response.data);
      res.json(response.data);
    } else if (type && !platform && sort) {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${page}&search=${search}&genres=${type}&ordering=${sort}`
      );
      //   console.log(response.data);
      res.json(response.data);
    } else if (!type && platform && sort) {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${page}&search=${search}&platforms=${platform}&ordering=${sort}`
      );
      //   console.log(response.data);
      res.json(response.data);
    } else if (type && platform && sort) {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${page}&search=${search}&genres=${type}&platforms=${platform}&ordering=${sort}`
      );
      //   console.log(response.data);
      res.json(response.data);
    }
  } catch {
    res.status(400).json({ message: error.message });
  }
});

app.get("/genres", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=${process.env.API_KEY}`
    );
    // console.log(response.data);
    res.json(response.data);
  } catch {
    res.status(400).json({ message: error.message });
  }
});

app.get("/platforms", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/platforms?key=${process.env.API_KEY}`
    );
    // console.log(response.data);
    res.json(response.data);
  } catch {
    res.status(400).json({ message: error.message });
  }
});

app.get("/game/:id", async (req, res) => {
  try {
    const gameId = req.params.id;
    const response = await axios.get(
      `https://api.rawg.io/api/games/${gameId}?key=${process.env.API_KEY}`
    );
    // console.log(response.data);
    res.json(response.data);
  } catch {
    res.status(400).json({ message: error.message });
  }
});

app.get("/game-series/:id", async (req, res) => {
  try {
    const gameId = req.params.id;
    const response = await axios.get(
      `https://api.rawg.io/api/games/${gameId}/game-series?key=${process.env.API_KEY}`
    );
    // console.log(response.data);
    res.json(response.data);
  } catch {
    res.status(400).json({ message: error.message });
  }
});

app.get("/review/:id", async (req, res) => {
  try {
    const gameId = req.params.id;
    const response = await axios.get(
      `https://api.rawg.io/api/games/${gameId}?key=${process.env.API_KEY}`
    );
    // console.log(response.data);
    res.json(response.data);
  } catch {
    res.status(400).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json("Route introuvable");
});

app.listen(process.env.PORT || 4500, () => {
  console.log("Server started");
});
