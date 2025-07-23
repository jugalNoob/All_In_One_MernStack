const express = require("express");
const router = new express.Router();

const Signuser = require("../controollers/SignUp");
const apiGetuser = require("../controollers/ApiGet");
const pagit = require("../controollers/Pagination");
const search = require("../controollers/Queary");
const Agers = require("../controollers/Aggre");
const SearchAdvaance = require("../controollers/AdvSeachRedisPagination");
const SearhAdvaanceRedis = require("../controollers/AdvSeachRedisPagination");

const counterMiddleware = require("../RateLimit/Limit"); // Basic rate limiter
const rateLimiterradis = require("../RateLimit/Redis"); // Redis-based rate limiter
const rateLimiterradispub = require("../RateLimit/PubSubRedis"); // Redis Pub/Sub limiter

// ----------- All Routes ----------------

// 🚀 Signup route
router.post("/form", Signuser.first);

// 📄 Get user with Redis Pub/Sub rate limit
router.get("/api/v1/users", rateLimiterradispub, apiGetuser.Apiget);

// 🔍 Advanced query search (no Redis)
router.get("/SearchAdvaance", SearchAdvaance.ApigetQuearyAdavance);

// 🔍 Advanced query search with Redis & pagination
router.get("/apisearchredis", rateLimiterradispub, SearhAdvaanceRedis.ApigetQuearyAdavanceRedis);

// 📄 Pagination example
router.get("/Paninationsearch", pagit.ApigetPagination);

// 🔍 Simple query search
router.get("/search", search.ApigetQueary);

// 📊 Aggregation example
router.get("/aggresion", Agers.Aggress);

// -----------------------------------------------------

module.exports = router;
