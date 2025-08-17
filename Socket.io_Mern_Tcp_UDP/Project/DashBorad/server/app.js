// // server.js
// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const path = require('path');
// const { subClient } = require('./RedisClient/redis');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);



// io.on('connection', (socket) => {
//   console.log('Client connected', socket.id);

//   socket.on('disconnect', () => {
//     console.log('Client disconnected', socket.id);
//   });
// });

// // Subscribe to redis channel and broadcast
// (async () => {
//   // wait until subClient connected
//   while (!subClient || !subClient.isOpen) {
//     await new Promise(r => setTimeout(r, 100));
//   }

//   // subscribe callback receives each message
//   await subClient.subscribe('dashboard_updates', (message) => {
//     try {
//       const payload = JSON.parse(message);
//       // you can filter by type, target room, etc.
//       io.emit('dashboard_data', payload);
//     } catch (err) {
//       console.error('Invalid message received from Redis:', err, message);
//     }
//   });

//   console.log('Subscribed to redis channel: dashboard_updates');
// })();

// const PORT = process.env.PORT || 9000;
// server.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });


const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { subClient } = require("./RedisClient/redis");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React frontend
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Handle client connections
io.on("connection", (socket) => {
  console.log(`[Socket.IO] Client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
  });
});

// Subscribe to Redis updates
(async () => {
  await subClient.subscribe("dashboard_updates", (message) => {
    try {
      const payload = JSON.parse(message);
      io.emit("dashboard_data", payload);
      console.log(`[Redis -> Socket.IO] Sent update: ${payload.timestamp}`);
    } catch (err) {
      console.error("[Server] Invalid Redis message:", err, message);
    }
  });
})();

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`[Server] Listening on port ${PORT}`);
});
