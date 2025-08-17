// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const shortid = require('shortid');
const connectDB = require('./db/conn');
const  { initProducer, PostsendMessage } = require('./Producer/Postproducer'); ///post  Producer 
const router = require("./routes/router");

const Register = require('./model/student');

const  redisClient  = require('./Redis/redisClient'); // ✅ fix

const app = express();
const server = http.createServer(app);



const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",  // allow React app
    methods: ["GET", "POST"],
    credentials: true
  },
});


// console.log(io)


const port = 9000;

app.use(cors());
app.use(express.json());
app.use(router);





(async () => {
  await connectDB();
  await initProducer(); // ✅ now awaited
  console.log('io')

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
          await PostsendMessage("user-signup", payload);
        } catch (err) {
          console.error("❌ Kafka error:", err);
        }
      }
    }, 300000);

    


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



// Let me know if you want to:

// Consume user-fetch-events and save to DB

// Broadcast Kafka updates via Socket.IO

// Display user + Kafka status on a React dashboard

// All of this can scale beautifully with your current stack 💪

