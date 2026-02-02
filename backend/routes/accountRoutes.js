const express = require("express");
const auth = require("../middleware/authMiddleware");
const Account = require("../models/Account");
const Transaction = require("../models/Transaction");

const router = express.Router();

// Get logged-in user's account
router.get("/me", auth, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });
  res.json(account);
});

// Get recent transactions
router.get("/transactions/recent", auth, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });

  const transactions = await Transaction.find({ accountId: account._id })
    .sort({ createdAt: -1 })
    .limit(5);

  res.json(transactions);
});

module.exports = router;
