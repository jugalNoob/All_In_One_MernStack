✅ 1. Basic Server + Client Setup
📦 Server (Node.js)
js
Copy
Edit
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', socket => {
  console.log('Client connected:', socket.id);
});

server.listen(3000, () => console.log('Server running on port 3000'));
💻 Client (HTML)
html
Copy
Edit
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io('http://localhost:3000');
</script>
💬 2. Send and Receive Events
Server
js
Copy
Edit
io.on('connection', socket => {
  socket.on('chat message', msg => {
    console.log('Received:', msg);
    io.emit('chat message', msg); // Send to all
  });
});
Client
js
Copy
Edit
socket.emit('chat message', 'Hello from client!');

socket.on('chat message', msg => {
  console.log('Message received:', msg);
});
👥 3. Broadcasting to All Except Sender
js
Copy
Edit
socket.broadcast.emit('new user', socket.id);
🧱 4. Rooms (Join & Emit to Specific Room)
Server
js
Copy
Edit
socket.on('joinRoom', room => {
  socket.join(room);
  io.to(room).emit('message', `User joined room: ${room}`);
});
Client
js
Copy
Edit
socket.emit('joinRoom', 'room1');
🌐 5. Namespaces (Separate Channels)
Server
js
Copy
Edit
const chat = io.of('/chat');
chat.on('connection', socket => {
  socket.emit('welcome', 'Welcome to the chat namespace!');
});
Client
js
Copy
Edit
const chat = io('/chat');
chat.on('welcome', msg => console.log(msg));
✅ 6. Acknowledgements (Callbacks)
Server
js
Copy
Edit
socket.on('ping', (msg, callback) => {
  console.log(msg); // 'pinging'
  callback('pong'); // send response
});
Client
js
Copy
Edit
socket.emit('ping', 'pinging', response => {
  console.log(response); // 'pong'
});
🔐 7. Authentication via Middleware
js
Copy
Edit
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (token === '123456') {
    next();
  } else {
    next(new Error('Unauthorized'));
  }
});
Client
js
Copy
Edit
const socket = io('http://localhost:3000', {
  auth: {
    token: '123456'
  }
});
🔄 8. Reconnect Logic (Client)
js
Copy
Edit
const socket = io({
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
💡 9. Disconnect Handling
js
Copy
Edit
socket.on('disconnect', reason => {
  console.log(`Disconnected due to: ${reason}`);
});
🔁 10. Emit to All in a Room Except Sender
js
Copy
Edit
socket.to('room1').emit('event', 'Message to room except sender');
🔌 11. Disconnect a User Manually
js
Copy
Edit
io.on('connection', socket => {
  socket.disconnect(true); // force disconnect
});
🔥 12. Send Data Periodically
js
Copy
Edit
setInterval(() => {
  io.emit('heartbeat', new Date());
}, 1000);
📶 13. Count Online Users
js
Copy
Edit
io.on('connection', socket => {
  console.log('Users connected:', io.engine.clientsCount);
});
🧪 14. Server-to-Server Emit (Cluster)
With Redis adapter:

bash
Copy
Edit
npm install @socket.io/redis-adapter ioredis
js
Copy
Edit
const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');
const pubClient = createClient();
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));
📚 Bonus: Helpful Socket.IO Client Options
js
Copy
Edit
const socket = io('http://localhost:3000', {
  reconnection: true,
  timeout: 5000,
  autoConnect: true,
  transports: ['websocket'],
});
⚙️ Combine All Patterns in Real Chat App?
Would you like me to build a:

🔧 Complete chat app with typing indicator, rooms, and Redis scaling

📦 Deployment-ready Socket.IO + Express + Docker example

📊 Live dashboard that sends metrics to front-end using Socket.IO?

Just say the word, and I’ll code it for you.