const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" }  // Allow all for dev
});

io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);
});

httpServer.listen(4000, () => {
  console.log('🚀 Socket.IO server running on http://localhost:4000');
});

// Export io so workers can use it
module.exports = io;
