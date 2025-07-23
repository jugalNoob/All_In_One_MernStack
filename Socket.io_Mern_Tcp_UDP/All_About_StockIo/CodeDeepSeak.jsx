| Use Case       | Use Both? | Notes                                                 |
| -------------- | --------- | ----------------------------------------------------- |
| Chat App       | ✅ Yes     | REST for history, Socket.IO for live                  |
| Notifications  | ✅ Yes     | REST for fetching old ones, real-time push            |
| GPS Tracking   | ✅ Yes     | REST for last known location, socket for live updates |
| Admin Panels   | ✅ Yes     | REST for dashboards, socket for live metrics          |
| Auction System | ✅ Yes     | REST for bid history, socket for live bid updates     |



Socket.io Complete Code Examples: Client and Server
Here's a comprehensive collection of Socket.io code examples covering all major functionalities, with both server and client implementations for each case.

1. Basic Setup
Server (Node.js)
javascript
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000", // Adjust for your client URL
    methods: ["GET", "POST"]
  }
});

// Basic connection handler
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

http.listen(3001, () => {
  console.log('Socket.io server running on port 3001');
});
Client (Browser)
html
<!DOCTYPE html>
<html>
<head>
  <title>Socket.io Basic Client</title>
</head>
<body>
  <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
  <script>
    const socket = io('http://localhost:3001');
    
    socket.on('connect', () => {
      console.log('Connected to server with ID:', socket.id);
    });
    
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  </script>
</body>
</html>
2. Event Emission
Server
javascript
io.on('connection', (socket) => {
  // Send welcome message on connection
  socket.emit('welcome', `Hello ${socket.id}! You are connected.`);

  // Handle custom event from client
  socket.on('clientEvent', (data) => {
    console.log('Received from client:', data);
    socket.emit('serverResponse', `Server received: ${data.message}`);
  });

  // Broadcast to all clients
  socket.on('broadcastMessage', (msg) => {
    io.emit('globalMessage', `${socket.id} says: ${msg}`);
  });
});
Client
javascript
// Listen for welcome message
socket.on('welcome', (message) => {
  console.log('Server says:', message);
});

// Send event to server
document.getElementById('sendBtn').addEventListener('click', () => {
  const message = document.getElementById('messageInput').value;
  socket.emit('clientEvent', { message });
});

// Handle server response
socket.on('serverResponse', (response) => {
  console.log('Server response:', response);
});

// Handle global messages
socket.on('globalMessage', (msg) => {
  console.log('Global message:', msg);
});
3. Rooms and Namespaces
Server
javascript
// Main namespace
io.on('connection', (socket) => {
  socket.on('joinRoom', (room) => {
    socket.join(room);
    io.to(room).emit('roomMessage', `${socket.id} joined ${room}`);
  });

  socket.on('roomMessage', ({ room, message }) => {
    io.to(room).emit('roomMessage', `${socket.id}: ${message}`);
  });
});

// Admin namespace
const adminNamespace = io.of('/admin');
adminNamespace.on('connection', (socket) => {
  socket.emit('adminMessage', 'Welcome to admin namespace');
  
  socket.on('adminCommand', (cmd) => {
    console.log('Admin command:', cmd);
  });
});
Client
javascript
// Join room
function joinRoom(roomName) {
  socket.emit('joinRoom', roomName);
}

// Send room message
function sendRoomMessage(room, message) {
  socket.emit('roomMessage', { room, message });
}

// Listen for room messages
socket.on('roomMessage', (msg) => {
  console.log('Room message:', msg);
});

// Connect to admin namespace
const adminSocket = io('/admin');
adminSocket.on('adminMessage', (msg) => {
  console.log('Admin namespace:', msg);
});
4. Authentication
Server
javascript
// Middleware for authentication
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (token === 'valid-token-123') {
    next();
  } else {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log('Authenticated user connected');
});
Client
javascript
const socket = io('http://localhost:3001', {
  auth: {
    token: 'valid-token-123'
  }
});

socket.on('connect_error', (err) => {
  console.log('Connection error:', err.message);
});
5. Broadcasting
Server
javascript
io.on('connection', (socket) => {
  // To all clients
  socket.on('announce', (msg) => {
    io.emit('announcement', msg);
  });

  // To all except sender
  socket.on('broadcast', (msg) => {
    socket.broadcast.emit('broadcastMessage', msg);
  });

  // To specific client
  socket.on('privateMessage', ({ to, message }) => {
    io.to(to).emit('privateMessage', {
      from: socket.id,
      message
    });
  });
});
Client
javascript
// Send announcement
socket.emit('announce', 'Hello everyone!');

// Send broadcast
socket.emit('broadcast', 'Hello others!');

// Send private message
function sendPrivate(toSocketId, message) {
  socket.emit('privateMessage', { to: toSocketId, message });
}

// Handle incoming messages
socket.on('announcement', (msg) => {
  console.log('Announcement:', msg);
});

socket.on('privateMessage', ({ from, message }) => {
  console.log(`Private from ${from}:`, message);
});
6. Error Handling and Reconnection
Server
javascript
io.on('connection', (socket) => {
  socket.on('error', (error) => {
    console.log('Socket error:', error);
  });
});

io.engine.on('connection_error', (err) => {
  console.log('Engine error:', err);
});
Client
javascript
socket.on('connect_error', (err) => {
  console.log('Connection error:', err.message);
});

socket.on('reconnect_attempt', (attempt) => {
  console.log('Reconnection attempt:', attempt);
});

socket.on('reconnect', (attempt) => {
  console.log('Reconnected after', attempt, 'attempts');
});

socket.on('reconnect_error', (err) => {
  console.log('Reconnection error:', err);
});

socket.on('reconnect_failed', () => {
  console.log('Failed to reconnect');
});
7. Binary Data Transfer
Server
javascript
io.on('connection', (socket) => {
  socket.on('fileUpload', (file, callback) => {
    console.log('Received file of size:', file.length);
    // Process file
    callback({ status: 'File received' });
  });
});
Client
javascript
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  
  reader.onload = (event) => {
    const arrayBuffer = event.target.result;
    socket.emit('fileUpload', arrayBuffer, (response) => {
      console.log('Server response:', response);
    });
  };
  
  reader.readAsArrayBuffer(file);
});
8. Presence System (Online Users)
Server
javascript
const onlineUsers = new Set();

io.on('connection', (socket) => {
  // Add to online users
  onlineUsers.add(socket.id);
  io.emit('onlineUsers', Array.from(onlineUsers));

  socket.on('disconnect', () => {
    // Remove from online users
    onlineUsers.delete(socket.id);
    io.emit('onlineUsers', Array.from(onlineUsers));
  });
});
Client
javascript
socket.on('onlineUsers', (users) => {
  console.log('Online users:', users);
  // Update UI with online users list
});
9. Typing Indicators
Server
javascript
io.on('connection', (socket) => {
  socket.on('typing', (room) => {
    socket.broadcast.to(room).emit('userTyping', {
      userId: socket.id,
      isTyping: true
    });
  });

  socket.on('stopTyping', (room) => {
    socket.broadcast.to(room).emit('userTyping', {
      userId: socket.id,
      isTyping: false
    });
  });
});
Client
javascript
const messageInput = document.getElementById('messageInput');
let typingTimeout;

messageInput.addEventListener('input', () => {
  socket.emit('typing', currentRoom);
  
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    socket.emit('stopTyping', currentRoom);
  }, 1000);
});

socket.on('userTyping', ({ userId, isTyping }) => {
  // Update UI to show who's typing
  console.log(`${userId} is ${isTyping ? 'typing...' : 'not typing'}`);
});
10. Real-time Notifications
Server
javascript
io.on('connection', (socket) => {
  socket.on('subscribeToNotifications', (userId) => {
    socket.join(`notifications_${userId}`);
  });

  function sendNotification(userId, message) {
    io.to(`notifications_${userId}`).emit('newNotification', {
      message,
      timestamp: new Date()
    });
  }
});
Client
javascript
// Subscribe to notifications
socket.emit('subscribeToNotifications', currentUserId);

// Handle incoming notifications
socket.on('newNotification', (notification) => {
  console.log('New notification:', notification.message);
  // Show notification in UI
});
These examples cover the most common Socket.io use cases. You can mix and match these patterns to build complex real-time applications. Remember to add proper error handling and security measures in production applications.

