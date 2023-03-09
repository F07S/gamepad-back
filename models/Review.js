const mongoose = require("mongoose");

const Review = mongoose.model("Review", {
  title: String,
  review: String,
  game: String,
  gameId: Number,
  user: String,
  userimage: String,
});

module.exports = Review;
