const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// Store connected users
const users = {};

io.on('connection', (socket) => {
  console.log('User connected: ' + socket.id);

  // Register username
  socket.on('register', (username) => {
    users[username] = socket.id;
    console.log('Registered:', username);
  });

  // Private message
  socket.on('private message', ({ to, message }) => {
    const targetSocket = users[to];
    if (targetSocket) {
      io.to(targetSocket).emit('private message', {
        from: socket.id,
        message
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected: ' + socket.id);
    // Remove user from list
    for (let username in users) {
      if (users[username] === socket.id) delete users[username];
    }
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});




<!DOCTYPE html>
<html>
<body>
<h1>Private Chat</h1>

<input id="username" placeholder="Your username"/>
<input id="to" placeholder="Send to username"/>
<input id="message" placeholder="Message"/>
<button onclick="register()">Register</button>
<button onclick="sendPrivate()">Send</button>

<ul id="chat"></ul>

<script src="https://cdn.socket.io/4.6.1/socket.io.min.js"></script>
<script>
  const socket = io('http://localhost:3000');

  function register() {
    const username = document.getElementById('username').value;
    socket.emit('register', username);
  }

  function sendPrivate() {
    const to = document.getElementById('to').value;
    const message = document.getElementById('message').value;
    socket.emit('private message', { to, message });
  }

  socket.on('private message', ({ from, message }) => {
    const li = document.createElement('li');
    li.textContent = `From ${from}: ${message}`;
    document.getElementById('chat').appendChild(li);
  });
</script>
</body>
</html>
