const mongoose = require("mongoose");

const Fav = mongoose.model("Favourite", {
  name: {
    unique: true,
    type: Array,
  },

  image: {
    required: true,
    type: Array,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  user: String,
  favToken: String,
});

module.exports = Fav;
