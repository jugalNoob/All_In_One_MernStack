//  --->>> Simple Pigantaion  -------------------->.>

const Register=require("../../model/student")
// const axios = require('axios');
// const { redisClient } = require("../Redis/redisClient"); // ✅ fix
//http://localhost:9000/search?page=1&limit // page is limit is 

exports.ApigetPagination = async (req, res) => { 
    try {
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 10;
        let skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
         Register.find().skip(skip).limit(limit),
         Register.countDocuments().sort().lean()
        ]);

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
