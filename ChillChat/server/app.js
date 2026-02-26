const express = require('express');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();

const Chat = require('./models/chatModel');

const app = express();
app.use(cors());
app.use(express.json());

// ------------------- MongoDB Connection -------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ----------------------------------------------------------

// Create server
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

// WebSocket connection
io.on("connection", (socket) => {
  console.log("New client connected");

  // When someone sends a message
  socket.on("chat", async (data) => {
    io.emit("chat", data); // send to all clients

    try {
      // Save to MongoDB
      const chatMessage = new Chat({
        message: data.message,
        sender: data.sender,
      });
      await chatMessage.save();
      console.log("💾 Message saved to MongoDB");
    } catch (err) {
      console.log("❌ Error saving message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
