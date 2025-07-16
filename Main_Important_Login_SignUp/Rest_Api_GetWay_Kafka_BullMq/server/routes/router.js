const express = require("express");
const router = new express.Router();
const Signuser=require("../controollers/SignUp")
const apiGetuser=require("../controollers/ApiGet")



// ---->>> Redis Limit Row class -------------------------->>>
const  counterMiddleware=require("../RateLimit/Limit") // Simple rateLimit 
const  rateLimiterradis=require("../RateLimit/Redis") // redis limit 
const rateLimiterradispub = require("../RateLimit/PubSubRedis");

// ---> Pagination ------------------>>
const pagit=require("../controollers/Pagination")



///--->>>Quary search --------------->>

const search=require("../controollers/Queary")

/// --->>aggregation-------->>>>
const Agers=require("../controollers/Aggre")


///--->Advance Code Searching ------------------>..>>


const SearchAdvaance=require("../controollers/AdvSeachRedisPagination")

const  SearhAdvaanceRedis =require("../controollers/AdvSeachRedisPagination")




router.get("/SearchAdvaance", SearchAdvaance.ApigetQuearyAdavance);


router.get("/apisearchredis",rateLimiterradispub , SearhAdvaanceRedis.ApigetQuearyAdavanceRedis);


router.post("/form", Signuser.first);

router.get("/Paninationsearch" , pagit.ApigetPagination) // --> getPagination

router.get("/search" ,  search.ApigetQueary) // --> getSearchQuary

router.get("/aggresion" , Agers.Aggress)

router.get("/getuser",  rateLimiterradispub, apiGetuser.Apiget);// -->with rate LIMIT

module.exports = router;
