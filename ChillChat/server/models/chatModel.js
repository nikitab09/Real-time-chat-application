const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  message: String,
  sender: String,
  time: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Chat", chatSchema);