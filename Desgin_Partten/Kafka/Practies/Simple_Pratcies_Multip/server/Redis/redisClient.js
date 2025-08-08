// redisClient.js
const { createClient } = require("redis");

const redisClient = createClient(); // General Redis commands (GET, SET, etc.)
const pubClient = redisClient.duplicate(); // For publishing messages
const subClient = redisClient.duplicate(); // For subscribing to messages

// Error Handling
redisClient.on("error", (err) => console.error("Redis client error:", err));
pubClient.on("error", (err) => console.error("Redis pub error:", err));
subClient.on("error", (err) => console.error("Redis sub error:", err));

(async () => {
  try {
    await redisClient.connect();
    await pubClient.connect();
    await subClient.connect();
    console.log("✅ Connected to Redis");
  } catch (err) {
    console.error("❌ Redis connection failed:", err);
  }
})();

module.exports = { redisClient, pubClient, subClient };