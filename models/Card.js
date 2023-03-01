const mongoose = require("mongoose");

const Card = mongoose.model("Card", {
  name: String,
  description: String,
  _id: "",
});

module.exports = Card;
