const express = require("express");
const router = express.Router();

const Fav = require("../models/Fav");
const Review = require("../models/Review");

router.post("/addfavourites", async (req, res) => {
  try {
    const { name, image, user } = req.body;

    const newFav = new Fav({
      name: name,
      image: image,
      user: user,
    });
    await newFav.save();
    const clientRes = {
      name: newFav.name,
      image: newFav.image,
    };
    res.json(clientRes);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.get("/favourites", async (req, res) => {
  try {
    const favourites = await Fav.find();
    res.json({ favourites: favourites });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.delete("/favourites/delete/:id", async (req, res) => {
  try {
    await Fav.findByIdAndRemove(req.params.id);
    const favourites = await Fav.find();
    res.status(200).json({ favourites: favourites });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.post("/addreview", async (req, res) => {
  try {
    const { title, review, game, gameId } = req.body;
    const newReview = new Review({
      title: title,
      review: review,
      game: game,
      gameId: gameId,
    });
    await newReview.save();

    const reviews = await Review.find();
    res.json({ reviews: reviews });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.get("/allreviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json({ reviews: reviews });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
