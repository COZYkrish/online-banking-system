const User = require("../models/User");
const Transaction = require("../models/Transaction");

const transferMoney = async (req, res) => {
  try {
    const { receiverAccount, amount } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const sender = await User.findById(req.user._id);
    const receiver = await User.findOne({ accountNumber: receiverAccount });

    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Update balances
    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    // Save transactions
    await Transaction.create({
      senderAccount: sender.accountNumber,
      receiverAccount: receiver.accountNumber,
      amount,
      type: "DEBIT",
    });

    await Transaction.create({
      senderAccount: sender.accountNumber,
      receiverAccount: receiver.accountNumber,
      amount,
      type: "CREDIT",
    });

    res.status(200).json({
      message: "Transfer successful",
      balance: sender.balance,
    });
  } catch (error) {
    res.status(500).json({ message: "Transfer failed" });
  }
};

module.exports = { transferMoney };
