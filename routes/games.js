const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const page = req.query.page;
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.API_KEY}&dates=2023-01-01,2024-12-30&platforms=18,1,7&page=${page}`
    );
    // console.log(response.data);
    res.json(response.data);
  } catch {
    res.status(400).json({ message: error.message });
  }
});

router.get("/allgames", async (req, res) => {
  try {
    const page = req.query.page || "";
    // console.log(req.query.page);
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

router.get("/genres", async (req, res) => {
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

router.get("/platforms", async (req, res) => {
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

router.get("/game/:id", async (req, res) => {
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

router.get("/game-series/:id", async (req, res) => {
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

router.get("/review/:id", async (req, res) => {
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

module.exports = router;
