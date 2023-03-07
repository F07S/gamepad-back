const mongoose = require("mongoose");

const Fav = mongoose.model("Favourite", {
  name: {
    unique: true,
    type: String,
  },

  image: {
    required: true,
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  favToken: String,
});

module.exports = Fav;
