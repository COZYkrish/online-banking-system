const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  accountNumber: {
    type: String,
    unique: true
  },
  balance: {
    type: Number,
    default: 1000
  },
  accountType: {
    type: String,
    default: "SAVINGS"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Account", accountSchema);
