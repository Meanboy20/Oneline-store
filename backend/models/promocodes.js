const mongoose = require("mongoose");

const promocodeSchema = new mongoose.Schema({
  promocode: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  used: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("promocode", promocodeSchema);
