const express=require("express")

const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on('error', (error) => {
  console.error(`Redis connection error: ${error}`);
});

(async () => {
  await redisClient.connect();
  console.log('Connected to Redis');
})();

const app=express()

const port=9000




app.get("/home", async (req, res) => {
    try {
      const cacheKey = "commentsData"; // Cache key for Redis
      const cacheTTL = 15; // Time-to-live for cache in seconds
  
      // Check if data is in cache
      const cachedData = await redisClient.get(cacheKey);
  
      if (cachedData) {
        console.log("Serving data from cache");
        res.set("X-Cache", "HIT"); // Custom header to indicate cache hit
        return res.json(JSON.parse(cachedData));
      }
  
      // If no cached data, fetch from API
      console.log("Fetching data from API...");
      const response = await fetch("https://jsonplaceholder.typicode.com/comments");
  
      if (!response.ok) {
        // If API call fails, return an error
        throw new Error(`Failed to fetch data from API: ${response.statusText}`);
      }
  
      const userData = await response.json();
  
      // Cache the response in Redis
      await redisClient.setEx(cacheKey, cacheTTL, JSON.stringify(userData));
  
      console.log("Data fetched and cached.");
      res.set("X-Cache", "MISS"); // Custom header to indicate cache miss
      res.json(userData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
  
      // Gracefully handle the error
      res.status(500).json({
        error: "Failed to fetch data",
        message: error.message,
      });
    }
  });
  

app.listen(port , ()=>{
    console.log(`server is running on port ${port}`)
})