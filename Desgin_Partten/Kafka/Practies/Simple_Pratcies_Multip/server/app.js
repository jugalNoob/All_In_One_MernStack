const express = require("express");
const connectDB = require("./db/conn"); // ✅ DB connection function
const { initProducer } = require("./producer/producer_login"); // ✅ Kafka producer
const router = require("./routes/router");

const app = express();
const port = 9000;

app.use(express.json());
app.use(router);

// ✅ Main startup logic
const startServer = async () => {
  try {
    await connectDB(); // ✅ WAIT for MongoDB connection
    console.log("✅ MongoDB connected");


    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Startup Error:", err.message);
    process.exit(1);
  }
};

startServer();
