

/// Zib -->>  Redis Caches ------------->>>
const RegisterGet = require("../model/Apistudent");
const axios = require('axios');


const { redisClient } = require("../Redis/redisClient"); // ✅ fix


const zlib = require("zlib");


exports.Apiget = async (req, res) => {
  const redisKey = "students:compressed";
  const TTL = 20; // seconds
  const startTime = Date.now();

  try {
    // 1️⃣ Try to fetch from Redis cache
    const cached = await redisClient.get(redisKey);
    if (cached) {
      const buffer = Buffer.from(cached, "base64");
      const decompressed = zlib.gunzipSync(buffer).toString();
      const duration = Date.now() - startTime;

      // ✅ Log for cache HIT
      console.log(`✅ [CACHE HIT] Data served from Redis. TTL remaining. Response time: ${duration}ms`);

      res.set({
        "X-Cache": "HIT",
        "X-Cache-Source": "Redis",
        "X-Response-Time": `${duration}ms`,
        "Content-Type": "application/json",
      });

      return res.status(200).json(JSON.parse(decompressed));
    }
  } catch (e) {
    // ⚠️ Log Redis failure but continue
    console.warn("⚠️ Redis unavailable or error while decompressing:", e.message);
  }

  try {
    // 2️⃣ Fallback: Fetch from MongoDB
    const data = await RegisterGet.find().lean();
    const json = JSON.stringify(data);

    // 3️⃣ Compress and cache in Redis with TTL
    const compressed = zlib.gzipSync(json);
    await redisClient.setEx(redisKey, TTL, compressed.toString("base64"));

    const duration = Date.now() - startTime;

    // 🗂️ Log for cache MISS and cache set
    console.log(`🗂️ [CACHE MISS] Data fetched from MongoDB and cached in Redis with TTL = ${TTL}s`);
    console.log(`📦 Response time after cache set: ${duration}ms`);

    res.set({
      "X-Cache": "MISS",
      "X-Cache-Source": "MongoDB",
      "X-Response-Time": `${duration}ms`,
      "Content-Type": "application/json",
    });

    return res.status(200).json(data);
  } catch (error) {
    // ❌ Handle DB error
    console.error("❌ Database error:", error);

    const statusCode = error.message === "Database timeout" ? 504 : 500;
    return res.status(statusCode).json({
      error: statusCode === 504 ? "Database timeout" : "Failed to fetch students",
      details: process.env.NODE_ENV === "development" ? error.message : undefined,
      timestamp: new Date().toISOString(),
    });
  }
};





/// Single Redis Caches ------------->>>


// exports.Apiget = async (req, res) => {
//   try {
//     // 1. Check Redis cache first
//     const cachedData = await redisClient.get('students');

//     if (cachedData) {
//       console.log('✅ Data from Redis cache');
//       return res.status(200).json(JSON.parse(cachedData));
//     }

//     // 2. If not cached, fetch from MongoDB
//     const data = await RegisterGet.find();

//     // 3. Save result to Redis with an expiry (optional)
//     await redisClient.setEx('students', 3600, JSON.stringify(data)); // 1 hour = 3600 seconds



//     console.log('⛏️ Data from MongoDB');
//     res.status(200).json(data);

//   } catch (error) {
//     console.error('❌ Error in Apiget:', error);
//     res.status(500).json({ error: 'Failed to fetch students' });
//   }
// };


