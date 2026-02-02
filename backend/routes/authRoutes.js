const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Account = require("../models/Account");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  const accountNumber = "AC" + Date.now();

  await Account.create({
    userId: user._id,
    accountNumber
  });

  res.status(201).json({ message: "User registered successfully" });
});

module.exports = router;
