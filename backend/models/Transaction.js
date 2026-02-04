const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    senderAccount: {
      type: String,
      required: true,
    },
    receiverAccount: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["DEBIT", "CREDIT"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
