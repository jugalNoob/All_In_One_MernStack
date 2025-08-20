const express = require("express");
const router = express.Router();
// const counterMiddleware = require("../RateLimit/Limit"); // Basic rate limiter
// const rateLimiterradis = require("../RateLimit/Redis"); // Redis-based rate limiter
const   rateLimiterradis= require("../RateLimit/Redis.js"); // Redis Pub/Sub limiter
const SearhAdvaanceRedis = require("../controller/AdvSeachRedisPagination.js");

const SigUpUser=require('../controller/SignUp')
// const Get_Users=require('../controller/GetUser.js')


//    const response = await axios.get('/api/getQuearyAdavanceRedis', {

// 🔍 Advanced query search with Redis & pagination
router.get("/apisearchredis",  rateLimiterradis, SearhAdvaanceRedis.ApigetQuearyAdavanceRedis);


// // --------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>
// router.get('/getUser', Get_Users.usersGet);

router.post('/user_sigup' , SigUpUser.signUP)




module.exports = router;
