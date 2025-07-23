// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const shortid = require('shortid');
const connectDB = require('./db/conn');
const { sendMessage } = require('./producer');
const Register = require('./model/student');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: 'http://localhost:3000' },
});
const port = 9000;

app.use(cors());
app.use(express.json());


// Let me know if you want to:

// Consume user-fetch-events and save to DB

// Broadcast Kafka updates via Socket.IO

// Display user + Kafka status on a React dashboard

// All of this can scale beautifully with your current stack 💪


// ✅ Your GET route to fetch data from MongoDB
app.get('/home', async (req, res) => {
  try {
    const data = await Register.find(); // assuming you have a Register model

    // ✅ Send user data to Kafka
    await sendMessage("user-fetch-events", "all_users", data);

    await sendMessage("user-fetch-events", {
      event: "FETCH_ALL_USERS",
      timestamp: new Date().toISOString(),
      payload: data
    });

    console.log("Users sent to Kafka successfully");

    res.status(200).json(data); // only one response
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Server Error');
  }
});

// const users = await Register.find().select("-password -__v"); // omit sensitive fields



(async () => {
  await connectDB();

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    let lastRandomNumber = null;

    const emitInterval = setInterval(() => {
      lastRandomNumber = Math.floor(Math.random() * 100);
      socket.emit('randomNumber', lastRandomNumber);
      console.log('🔁 Sent to client:', lastRandomNumber);
    }, 2000);

    const saveInterval = setInterval(async () => {
      if (lastRandomNumber !== null) {
        const payload = {
          value: lastRandomNumber,
          shortId: shortid.generate(),
          timestamp: new Date().toISOString(),
        };

        try {
          await sendMessage("random-numbers", payload);
        } catch (err) {
          console.error("❌ Kafka error:", err);
        }
      }
    }, 30000);

    socket.on('disconnect', () => {
      clearInterval(emitInterval);
      clearInterval(saveInterval);
      console.log('User disconnected:', socket.id);
    });
  });

  server.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
})();
