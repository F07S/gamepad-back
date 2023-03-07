const mongoose = require("mongoose");

const Review = mongoose.model("Review", {
  title: String,
  review: String,
  game: String,
  gameId: Number,
});

module.exports = Review;
