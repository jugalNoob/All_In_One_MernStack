//  --->>> Simple Pigantaion  -------------------->.>

const Register=require("../../model/student")
// const axios = require('axios');
// const { redisClient } = require("../Redis/redisClient"); // ✅ fix
//http://localhost:9000/search?page=1&limit // page is limit is 


const { redisClient } = require("../../Redis/redisClient"); // ✅ fix


exports.ApigetPagination = async (req, res) => { 
    try {

           // 1. Check Redis cache first
    const cachedData = await redisClient.get('students');

    if (cachedData) {
      console.log('✅ Data from Redis cache');
      return res.status(200).json(JSON.parse(cachedData));
    }


        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 10;
        let skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
         Register.find().skip(skip).limit(limit),
         Register.countDocuments().sort().lean()
        ]);

          //     // 3. Save result to Redis with an expiry (optional)
            await redisClient.setEx('students', 3600, JSON.stringify(data)); // 1 hour = 3600 seconds
        
        res.status(200).json({
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            data
        });
    } catch (error) {
        console.error("❌ Error in Apiget:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}




// ⚖️ Offset vs Cursor Pagination


// | Feature     | Offset (`skip`)                              | Cursor (`_id`/keyset\`)           |
// | ----------- | -------------------------------------------- | --------------------------------- |
// | Performance | Slower for large pages (skip scans all docs) | Fast, uses index                  |
// | Stability   | Can break if rows inserted/deleted           | Stable, always consistent         |
// | Use Case    | Admin dashboards, small datasets             | APIs, infinite scroll, large data |
