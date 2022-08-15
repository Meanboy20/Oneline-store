const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("products", productSchema);
