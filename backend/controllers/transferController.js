const Account = require("../models/Account");
const Transaction = require("../models/Transaction");

const transferMoney = async (req, res) => {
  try {
    const { receiverAccountNumber, receiverAccount, amount } = req.body;
    const targetAccountNumber = receiverAccountNumber || receiverAccount;
    const transferAmount = Number(amount);

    if (!targetAccountNumber) {
      return res.status(400).json({ message: "Receiver account required" });
    }

    if (!Number.isFinite(transferAmount) || transferAmount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const sender = await Account.findOne({ userId: req.user._id });
    const receiver = await Account.findOne({
      accountNumber: targetAccountNumber,
    });

    if (!sender) {
      return res.status(404).json({ message: "Sender account not found" });
    }

    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    if (sender.accountNumber === receiver.accountNumber) {
      return res.status(400).json({ message: "Cannot transfer to same account" });
    }

    if (sender.balance < transferAmount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Update balances
    sender.balance -= transferAmount;
    receiver.balance += transferAmount;

    await sender.save();
    await receiver.save();

    // Save a single transfer record
//     await Transaction.create({
//       senderAccount: sender.accountNumber,
//       receiverAccount: receiver.accountNumber,
//       amount: transferAmount,
//       type: "TRANSFER",
//     });

//     res.status(200).json({
//       message: "Transfer successful",
//       balance: sender.balance,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Transfer failed" });
//   }
// };

// module.exports = { transferMoney };
