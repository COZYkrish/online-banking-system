const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  accountNumber: {
    type: String,
    unique: true,
    required: true,
  },

  balance: {
    type: Number,
    default: 0,
  },

  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
});


module.exports = mongoose.model("User", userSchema);
