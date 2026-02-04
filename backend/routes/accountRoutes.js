const express = require("express");
const auth = require("../middleware/authMiddleware");
const Account = require("../models/Account");
const Transaction = require("../models/Transaction");
const { transferMoney } = require("../controllers/transferController");

const router = express.Router();

// Get logged-in user's account
router.get("/me", auth, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.user.id });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json({
      accountNumber: account.accountNumber,
      balance: account.balance,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get recent transactions (FIXED)
router.get("/transactions/recent", auth, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.user.id });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const transactions = await Transaction.find({
      $or: [
        { senderAccount: account.accountNumber },
        { receiverAccount: account.accountNumber },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(5);

    const normalized = transactions
      .map((tx) => {
        const typeForUser =
          tx.senderAccount === account.accountNumber ? "DEBIT" : "CREDIT";
        return {
          _id: tx._id,
          senderAccount: tx.senderAccount,
          receiverAccount: tx.receiverAccount,
          amount: tx.amount,
          type: typeForUser,
          createdAt: tx.createdAt,
          originalType: tx.type,
        };
      })
      .filter((tx) => {
        if (tx.originalType === "TRANSFER") return true;
        return tx.originalType === tx.type;
      })
      .map(({ originalType, ...tx }) => tx);

    res.json(normalized);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Transfer money
router.post("/transfer", auth, transferMoney);

module.exports = router;
