const { redisClient, pubClient } = require("../Redis/redisClient");

const rateLimiterradispub = async (req, res, next) => {
  const ip = req.ip;
  const key = `rate_limit:${ip}`;
  const windowLimit = 5;
  const windowTTL = 10;
  const blockTTL = 20;

  try {
    const current = await redisClient.get(key);

    if (current !== null) {
      const count = parseInt(current);

      if (count >= windowLimit) {
        const ttl = await redisClient.ttl(key);

        // 🔔 Publish block alert
        await pubClient.publish("rate_block", JSON.stringify({
          ip,
          timestamp: new Date().toISOString(),
          retryAfter: ttl
        }));

        return res.status(429).json({
          error: "⏱ Rate limit exceeded. Try again later.",
          retryAfter: `${ttl} seconds`
        });
      }

      if (count === windowLimit - 1) {
        await redisClient.setEx(key, blockTTL, String(windowLimit));
      } else {
        await redisClient.incr(key);
      }

    } else {
      await redisClient.setEx(key, windowTTL, "1");
    }

    next();
  } catch (err) {
    console.error("Rate limiter error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = rateLimiterradispub;
