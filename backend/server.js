const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/accountRoutes");

mongoose.connect("mongodb://127.0.0.1:27017/banking");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/account", accountRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
