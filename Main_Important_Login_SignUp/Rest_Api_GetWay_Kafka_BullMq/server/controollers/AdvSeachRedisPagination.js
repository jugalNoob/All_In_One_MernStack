const RegisterGet = require("../model/Apistudent");
const axios = require('axios');
const { redisClient } = require("../Redis/redisClient"); // ✅ fix
const zlib = require("zlib");




// /http://localhost:9000/SearchAdvaance?page=1&limit=10&name=Melissa&countrys=Vietnam 

//--->>name=Catherine&ageEq=30&emailer=sheri78@gmail.com&bloodG=B

//-->http://localhost:9000/SearchAdvaance?page=1&limit=10&agelessValue=29&agegreatValues=30
//--> http://localhost:9000/SearchAdvaance?page=1&limit=10&prices=%204437

/// --> without Redis Code Start row classs  ------------------->>
exports.ApigetQuearyAdavance = async (req, res) => {
  try {
    // Extract query filters
    const {
      name,
      countrys,
      emailer,
      bloodG,
      gendering,
      ageEq,
      truess,
      hoobies,
      removes,
      ones,
      twos,
      prices,
      pricegreat,
      priceless,
      agelessValue,
      agegreatValues,
    } = req.query;

    // Extract pagination parameters
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build MongoDB query object
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
        price: {
          $gte: Number(priceless),
          $lte: Number(pricegreat),
        },
      }),
      ...(agelessValue !== undefined && agegreatValues !== undefined && {
        age: {
          $gte: Number(agelessValue),
          $lte: Number(agegreatValues),
        },
      }),
    };

    // Execute query with pagination
    const [data, total] = await Promise.all([
      RegisterGet.find(query).skip(skip).limit(limit).lean(),
      RegisterGet.countDocuments(query),
    ]);

    res.status(200).json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data,
    });
  } catch (error) {
    console.error("❌ Error in ApigetQueary:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



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

    return res.status(200).json(payload);
  } catch (error) {
    console.error("❌ DB Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};





/// ------------------>>>>>>with quary montroing  -------------------->>>>


exports.ApigetQuearyAdavancess = async (req, res) => {
  const {
    name, countrys, emailer, bloodG, gendering, ageEq,
    truess, hoobies, removes, ones, twos,
    prices, pricegreat, priceless,
    agelessValue, agegreatValues
  } = req.query;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const TTL = 20;
  const requestStart = Date.now();

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
      price: { $gte: Number(priceless), $lte: Number(pricegreat) },
    }),
    ...(agelessValue !== undefined && agegreatValues !== undefined && {
      age: { $gte: Number(agelessValue), $lte: Number(agegreatValues) },
    }),
  };

  const redisKey = `students:query:${Buffer.from(JSON.stringify({ query, page, limit })).toString("base64")}`;

  // Try Redis first
  try {
    const redisStart = Date.now();
    const cached = await redisClient.get(redisKey);

    if (cached) {
      const redisDuration = Date.now() - redisStart;
      const buffer = Buffer.from(cached, "base64");
      const decompressed = zlib.gunzipSync(buffer).toString();
      const result = JSON.parse(decompressed);
      const totalDuration = Date.now() - requestStart;

      console.log(`✅ [CACHE HIT] Redis time: ${redisDuration}ms | Total API time: ${totalDuration}ms`);

      res.set({
        "X-Cache": "HIT",
        "X-Cache-Source": "Redis",
        "X-Response-Time": `${totalDuration}ms`,
        "X-Redis-Time": `${redisDuration}ms`,
        "Content-Type": "application/json",
      });

      return res.status(200).json(result);
    }
  } catch (err) {
    console.warn("⚠️ Redis error:", err.message);
  }

  // Fallback to MongoDB
  try {
    const mongoStart = Date.now();

    const [data, total] = await Promise.all([
      RegisterGet.find(query).skip(skip).limit(limit).lean(),
      RegisterGet.countDocuments(query),
    ]);

    const mongoDuration = Date.now() - mongoStart;
    const payload = {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data,
    };

    const compressed = zlib.gzipSync(JSON.stringify(payload));
    await redisClient.setEx(redisKey, TTL, compressed.toString("base64"));

    const totalDuration = Date.now() - requestStart;

    console.log(`🗂️ [CACHE MISS] MongoDB time: ${mongoDuration}ms | Total API time: ${totalDuration}ms`);

    res.set({
      "X-Cache": "MISS",
      "X-Cache-Source": "MongoDB",
      "X-Response-Time": `${totalDuration}ms`,
      "X-Mongo-Time": `${mongoDuration}ms`,
      "Content-Type": "application/json",
    });

    return res.status(200).json(payload);
  } catch (error) {
    console.error("❌ MongoDB error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      timestamp: new Date().toISOString(),
    });
  }
};
