.🔁 1. Caching (Most Popular Use Case)
Goal: Reduce latency and database load.

🔹 Examples:
Session storage (e.g., user login sessions)

Page or API caching (e.g., caching blog posts or product lists)

Database query result caching

Content delivery caching (CDNs)


| Use Case                   | Redis Key Pattern            | TTL        |
| -------------------------- | ---------------------------- | ---------- |
| 🧑 Session Storage         | `session:user:<userId>`      | 1 hour     |
| 📰 Page/API Caching        | `cache:page:/blog/slug-name` | 5 minutes  |
| 🧮 DB Query Result Caching | `query:users:active`         | 60 seconds |
| 🌐 CDN Layer               | Managed by external infra    | N/A        |



const express = require("express");
const fetch = require("node-fetch");
const { createClient } = require("redis");

const app = express();
const redisClient = createClient();
redisClient.connect();

const TTL = 60; // 60 seconds

app.get("/blog/:id", async (req, res) => {
  const blogId = req.params.id;
  const cacheKey = `blog:${blogId}`;

  try {
    // Check Redis cache
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      console.log("📦 Served from Redis");
      return res.json(JSON.parse(cached));
    }

    // Fetch from origin (mock)
    const apiRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`);
    const data = await apiRes.json();

    // Save to Redis with TTL
    await redisClient.setEx(cacheKey, TTL, JSON.stringify(data));

    console.log("🌐 Fetched from API and cached");
    res.json(data);
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => console.log("🚀 Running at http://localhost:3000"));


| Action                  | Benefit                       |
| ----------------------- | ----------------------------- |
| First visit             | Fetches API → stores in Redis |
| Next visit (within TTL) | Returns from Redis → ⚡ faster |
| After TTL expires       | Refetch and refresh cache     |



 Example 2: Session Caching (Login Sessions)
js
Copy
Edit
// After successful login:
await redisClient.setEx(`session:user:${userId}`, 3600, JSON.stringify(userData));

// On subsequent request:
const session = await redisClient.get(`session:user:${userId}`);
if (session) {
  const user = JSON.parse(session);
  // ✅ Continue session
}


🧠 Advanced Patterns:

| Pattern                    | Use It For                           |
| -------------------------- | ------------------------------------ |
| Cache Aside (Lazy Loading) | Fetch → Cache on miss (most common)  |
| Write-Through              | Always write to Redis & DB together  |
| Read-Through               | Redis handles cache + fallback logic |
| TTL with auto-expiry       | Ensure cache never grows stale       |





📦 Summary: When to Use Redis Caching?
✅ Use Redis caching when:

You want to reduce DB load

You’re hitting rate-limited APIs

You want sub-millisecond response times

You need temporary session or token storage

You have slow operations (e.g., aggregation, joins)



Would you like:

A full cache-aside + fallback architecture?

Add Redis cache invalidation on DB updates?

Integrate with CDN-level cache headers?

Let me know your next caching challenge!
