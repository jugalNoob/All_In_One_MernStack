1. What is Socket.IO?

Answer:
Socket.IO is a JavaScript library that enables real-time, bidirectional communication between web clients (browser) and servers (Node.js).

Works on top of WebSockets and falls back to HTTP long-polling if WebSockets aren’t supported.

Supports event-based communication.

Use case: Real-time chat apps, notifications, dashboards, live feeds.




2. Difference between WebSocket and Socket.IO


| Feature      | WebSocket                      | Socket.IO                                             |
| ------------ | ------------------------------ | ----------------------------------------------------- |
| Protocol     | Pure WebSocket protocol        | WebSocket + fallbacks                                 |
| Reliability  | No automatic reconnection      | Automatic reconnection, heartbeat                     |
| Event system | Low-level messages             | High-level event system (`emit` & `on`)               |
| Broadcasting | Requires manual implementation | Built-in support (`io.emit`, `socket.broadcast.emit`) |

]

3. How does Socket.IO work?

Socket.IO consists of:

Server: Runs on Node.js

Client: Runs on browser or mobile apps

Communication flow:

Client -> HTTP handshake -> Upgrade to WebSocket -> Real-time events



Supports rooms, namespaces, and broadcasting.



4. What are Namespaces in Socket.IO?

A namespace allows you to split the connection into multiple logical channels.

Default namespace: '/'

Example:

const chat = io.of('/chat');
chat.on('connection', (socket) => {
  console.log('User connected to chat namespace');
});



se case: Separate events for chat, notifications, analytics on same server.


5. What are Rooms in Socket.IO?

Rooms allow grouping sockets to send messages to a subset of clients.

Example:

io.on('connection', (socket) => {
  socket.join('room1');
  socket.to('room1').emit('message', 'Hello Room1');
});


Use case: Chat group messaging.



6. How to emit and listen for events?

Server emits:

io.emit('event_name', data);


Client listens:

socket.on('event_name', (data) => {
  console.log(data);
});


7. Difference between io.emit, socket.emit, and socket.broadcast.emit


| Method                  | Description                                |
| ----------------------- | ------------------------------------------ |
| `io.emit`               | Sends to **all clients**                   |
| `socket.emit`           | Sends to **current client only**           |
| `socket.broadcast.emit` | Sends to **all clients except the sender** |



8. How does Socket.IO handle reconnections?

Built-in automatic reconnection.

Configurable options:

const socket = io('http://localhost:3000', {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});


Fires events: 'connect_error', 'reconnect_attempt', 'reconnect_failed'.




9. How to send private messages using Socket.IO?
// Server
io.on('connection', (socket) => {
  socket.on('private_message', ({ to, message }) => {
    io.to(to).emit('private_message', message);
  });
});


Each socket has a unique socket.id to identify clients.



10. How does Socket.IO handle scaling?

Problem: Multiple Node.js instances cannot share sockets.

Solution: Use Redis Adapter:

const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));


Enables broadcasting across multiple servers (horizontal scaling).


11. How to disconnect a client?
socket.disconnect();


Can also detect disconnection:

socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
});

12. What is the difference between polling and WebSocket transport?

Polling: HTTP request sent repeatedly to check for updates (fallback mechanism)

WebSocket: Full-duplex persistent connection

Socket.IO automatically upgrades from polling → WebSocket.

13. How to handle middleware in Socket.IO?

Middleware runs before connection is established:

io.use((socket, next) => {
  if (socket.handshake.auth.token) {
    next();
  } else {
    next(new Error('Authentication error'));
  }
});


Useful for authentication & validation.

14. How to integrate Socket.IO with Express?
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('User connected');
});

server.listen(3000, () => console.log('Server running'));

15. Use cases of Socket.IO in real-world projects

Chat applications: WhatsApp, Slack, Discord

Live dashboards: Stock prices, analytics metrics

Gaming: Multiplayer real-time games

Collaboration tools: Google Docs-like real-time edits

Notifications: Social media notifications, real-time alerts

16. How to store socket sessions for authentication?

Store user info on socket:

io.on('connection', (socket) => {
  socket.userId = getUserIdFromToken(socket.handshake.auth.token);
});


Can later use socket.userId to send messages.


17. Difference between Socket.IO and SSE (Server-Sent Events)

| Feature       | SSE                  | Socket.IO            |
| ------------- | -------------------- | -------------------- |
| Communication | Server → Client only | Bidirectional        |
| Protocol      | HTTP                 | WebSocket + fallback |
| Reconnection  | Browser auto         | Built-in             |
| Binary Data   | Not supported        | Supported            |




18. How to implement chat rooms with namespaces
const chat = io.of('/chat');
chat.on('connection', (socket) => {
  socket.join('room1');
  socket.on('message', (msg) => {
    chat.to('room1').emit('message', msg);
  });
});

19. Security practices for Socket.IO

Authenticate using tokens during handshake

Validate data on server-side

Limit events to authenticated users

Use CORS policies carefully

20. How to send data to all clients except certain sockets
socket.broadcast.to('room1').emit('event', data);


Broadcast to all in room except sender.

