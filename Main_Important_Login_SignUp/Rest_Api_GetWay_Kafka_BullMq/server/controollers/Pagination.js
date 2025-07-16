
//  --->>> Simple Pigantaion  -------------------->.>

const RegisterGet = require("../model/Apistudent");
const axios = require('axios');
const { redisClient } = require("../Redis/redisClient"); // ✅ fix
//http://localhost:9000/search?page=1&limit // page is limit is 

exports.ApigetPagination = async (req, res) => { 
    try {
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 10;
        let skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            RegisterGet.find().skip(skip).limit(limit),
            RegisterGet.countDocuments().sort().lean()
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



/// ---->>> With Redis Pagination start rowe class  ----------------->>>>


exports.ApigetPaginationss = async (req, res) => { 
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Optional: cache total count in Redis
        let total = await redisClient.get("api_total_count");
        if (!total) {
            total = await RegisterGet.countDocuments();
            await redisClient.setEx("api_total_count", 60, total); // expires in 60s
        } else {
            total = Number(total);
        }

        const data = await RegisterGet.find({})
            .skip(skip)
            .limit(limit)
            .lean(); // ✅ improves performance for read-only

        res.status(200).json({
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            data
        });
    } catch (error) {
        console.error("❌ Error in ApigetPagination:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
