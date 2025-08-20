const RegisterGet = require("../module/student");
const axios = require('axios');
const  redisClient  = require("../Redis/redisClient"); // ✅ fix
const zlib = require("zlib");
const { initProducer, sendMessage } = require("../producer/producer_login"); 

/// ------ >>>>> With Redis Cahes Show row class  -----------------> Important  


//-->http://localhost:9000/SearchAdvaanceredis?page=1&limit=10&name=Jonathan


exports.ApigetQuearyAdavanceRedis = async (req, res) => {
  const {
    name, countrys, emailer, bloodG, gendering, ageEq,
    truess, hoobies, removes, ones, twos,
    prices, pricegreat, priceless,
    agelessValue, agegreatValues
  } = req.query;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const TTL = 20; // Redis TTL in seconds
  const startTime = Date.now();

  // Build MongoDB query
  const query = {
    ...(name && { name: { $regex: name, $options: "i" } }),
    ...(countrys && { country: { $regex: countrys, $options: "i" } }),
    ...(emailer && { email: { $regex: emailer, $options: "i" } }),
    ...(bloodG && { bloodGroup: { $regex: bloodG, $options: "i" } }),
    ...(ageEq !== undefined && { age: { $eq: Number(ageEq) } }),
    ...(gendering && { gender: { $eq: gendering } }),
    ...(truess && { isEligible: { $eq: truess === "true" } }),
    ...(hoobies && { hobbies: { $in: [hoobies] } }),
    ...(removes === "name" && { name: { $exists: false } }),
    ...(ones && twos && { hobbies: { $in: [ones, twos] } }),
    ...(prices && { price: { $eq: Number(prices) } }),
    ...(priceless !== undefined && pricegreat !== undefined && {
      price: { $gte: Number(priceless), $lte: Number(pricegreat) }
    }),
    ...(agelessValue !== undefined && agegreatValues !== undefined && {
      age: { $gte: Number(agelessValue), $lte: Number(agegreatValues) }
    }),
  };

  // Generate unique Redis key for this specific query
  const redisKey = `students:query:${Buffer.from(JSON.stringify({ query, page, limit })).toString("base64")}`;

  try {
    // Try fetching from Redis
    const cached = await redisClient.get(redisKey);
    if (cached) {
      const buffer = Buffer.from(cached, "base64");
      const decompressed = zlib.gunzipSync(buffer).toString();
      const parsed = JSON.parse(decompressed);
      const duration = Date.now() - startTime;

      console.log(`✅ [CACHE HIT] Query + Pagination result from Redis. Response time: ${duration}ms`);

      res.set({
        "X-Cache": "HIT",
        "X-Cache-Source": "Redis",
        "X-Response-Time": `${duration}ms`,
        "Content-Type": "application/json",
      });

      return res.status(200).json(parsed);
    }
  } catch (err) {
    console.warn("⚠️ Redis cache error:", err.message);
  }

  // Fetch fresh data from MongoDB if Redis misses
  try {
    const [data, total] = await Promise.all([
      RegisterGet.find(query).skip(skip).limit(limit).lean(),
      RegisterGet.countDocuments(query),
    ]);

    const payload = {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data,
    };

    // Cache the response
    const compressed = zlib.gzipSync(JSON.stringify(payload));
    await redisClient.setEx(redisKey, TTL, compressed.toString("base64"));

    const duration = Date.now() - startTime;
    console.log(`🗂️ [CACHE MISS] Data fetched and cached with TTL = ${TTL}s`);
    console.log(`📦 Response time: ${duration}ms`);

    res.set({
      "X-Cache": "MISS",
      "X-Cache-Source": "MongoDB",
      "X-Response-Time": `${duration}ms`,
      "Content-Type": "application/json",
    });


    // 🔁 Kafka message
    await sendMessage("get_user",  payload );


    // / Send analytics event to Kafka instead of full payload
    // await sendMessage("api_query_analytics", {
    //   type: "user_query",
    //   queryParams: req.query,
    //   resultCount: data.length,
    //   cacheStatus: "miss",
    //   responseTime: Date.now() - startTime
    // });



    return res.status(200).json(payload);
  } catch (error) {
    console.error("❌ DB Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


initProducer()
