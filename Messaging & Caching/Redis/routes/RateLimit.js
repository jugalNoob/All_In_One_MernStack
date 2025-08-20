const rateLimiter = async (req, res, next) => {
  const ip = req.ip; // Or use req.headers['x-forwarded-for'] behind proxy
  const key = `rate_limit:${ip}`;
  const limit = 5;      // max requests
  const ttl = 60;       // time window in seconds

  try {
    const current = await redisClient.get(key);

    if (current !== null && parseInt(current) >= limit) {
      return res.status(429).json({ error: "⏱ Rate limit exceeded. Try again later." });
    }

    if (current === null) {
      // First request: set key with TTL
      await redisClient.set(key, 1, { EX: ttl });
    } else {
      // Increment if already exists
      await redisClient.incr(key);
    }

    next(); // Allow request to proceed
  } catch (err) {
    console.error("Rate limiter error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

app.use(rateLimiter); // apply to all routes


📌 Visual Summary

IP: 123.456.789.0
┌────────────┐
│ Redis Key  │ => rate_limit:123.456.789.0
├────────────┤
│ Value      │ => Count (1-5)
│ TTL        │ => 60 seconds
└────────────┘




/// ---- >> Redis Throttling --------------------->>>


⚙️ What is Throttling?
Throttling = controlling how fast requests are processed over time (vs. Rate Limiting, which caps the number of requests).

Think:

Rate Limiting → "You get 5 requests per 60 seconds."

Throttling → "Only 1 request every 2 seconds is allowed."

🔧 Redis-Based Throttling Implementation
✅ Use-case: "Allow 1 request every 2 seconds per IP/user"

✅ Code: 1 Request per 2 Seconds per IP


const express = require("express");
const { createClient } = require("redis");

const app = express();
const PORT = 3000;

const redisClient = createClient();
redisClient.connect().catch(console.error);

const throttleMiddleware = async (req, res, next) => {
  const ip = req.ip;
  const key = `throttle:${ip}`;
  const throttleInterval = 2; // seconds

  try {
    const lastAccess = await redisClient.get(key);

    if (lastAccess) {
      return res.status(429).json({ error: "⏳ Too many requests. Slow down!" });
    }

    // Set key with expiration of throttle window
    await redisClient.set(key, "1", { EX: throttleInterval });

    next();
  } catch (err) {
    console.error("Throttling Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

app.use(throttleMiddleware); // Apply to all routes

app.get("/", (req, res) => {
  res.send("✅ Request allowed (throttled by Redis)");
});

app.listen(PORT, () => {
  console.log(`🚀 Throttle server running at http://localhost:${PORT}`);
});


| Redis Key       | Value | TTL  |
| --------------- | ----- | ---- |
| `throttle:<ip>` | `"1"` | `2s` |




⏱ 3. Rate Limiting / Throttling
Goal: Prevent abuse by limiting API usage or actions.

🔹 Methods:
Fixed Window Counter

Sliding Window Log

Token Bucket

Leaky Bucket

E.g., “Only allow 10 requests per minute per user.”