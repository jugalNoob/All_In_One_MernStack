const redisClient = require("../Redis/redisClient");

const rateLimiterradis = async (req, res, next) => {
  const ip = req.ip;
  const key = `rate_limit:${ip}`;
  const windowLimit = 15;    // Max allowed requests
  const windowTTL = 50;     // Time window (in seconds)
  const blockTTL = 20;      // Block duration (in seconds)

  try {
    const current = await redisClient.get(key);

    if (current !== null) {
      const count = parseInt(current);

      if (count >= windowLimit) {
        const ttl = await redisClient.ttl(key);
        return res.status(429).json({
          error: "⏱ Rate limit exceeded. Try again later.",
          retryAfter: `${ttl} seconds`
        });
      }

      if (count === windowLimit - 1) {
        // Block for 20s after hitting limit
        await redisClient.setEx(key, blockTTL, String(windowLimit));
      } else {
        await redisClient.incr(key);
      }

    } else {
      // First request: set key with 10s TTL
      await redisClient.setEx(key, windowTTL, "1"); // 👈 convert to string
    }

    next();

  } catch (err) {
    console.error("Rate limiter error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = rateLimiterradis;



// 📌 Visual Summary

// IP: 123.456.789.0
// ┌────────────┐
// │ Redis Key  │ => rate_limit:123.456.789.0
// ├────────────┤
// │ Value      │ => Count (1-5)
// │ TTL        │ => 60 seconds



// | Action                       | Result                        |
// | ---------------------------- | ----------------------------- |
// | 1st to 5th request in 10 sec | ✅ Allowed                     |
// | 6th request within 10 sec    | ❌ Blocked for next 20 seconds |
// | After 20 seconds             | ✅ Allowed again               |
