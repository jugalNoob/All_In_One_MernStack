const { createClient } = require("redis");

const redisHost = process.env.REDIS_HOST || "127.0.0.1";
const redisPort = process.env.REDIS_PORT || 6379;

const redisClient = createClient({
  url: `redis://${redisHost}:${redisPort}`
});
const pubClient = redisClient.duplicate();
const subClient = redisClient.duplicate();

redisClient.on("error", (err) => console.error("Redis client error:", err));
pubClient.on("error", (err) => console.error("Redis pub error:", err));
subClient.on("error", (err) => console.error("Redis sub error:", err));

(async () => {
  try {
    await redisClient.connect();
    await pubClient.connect();
    await subClient.connect();
    console.log(`✅ Connected to Redis at ${redisHost}:${redisPort}`);
  } catch (err) {
    console.error("❌ Redis connection failed:", err);
  }
})();

module.exports = { redisClient, pubClient, subClient };
