const {redisClient}=require("../Redis/redisClient")

router.get("/posts", async (req, res) => {
  try {
    // Check Redis cache first
    const cachedData = await redisClient.get("posts");

    if (cachedData) {
      console.log("📦 Serving from Redis Cache");
      return res.json(JSON.parse(cachedData));
    }

    // Fetch from external API
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    // Cache the result with TTL (e.g., 60 seconds)
    await redisClient.setEx("posts", 60, JSON.stringify(data));

    console.log("🌐 Fetched from API and cached");
    res.json(data);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




