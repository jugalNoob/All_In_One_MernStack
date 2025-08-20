


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