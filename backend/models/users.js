const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: false,
  },
  shoppingCart: [],
});

module.exports = mongoose.model("users", userSchema);
