const express = require('express');


const router = express.Router();

const {redisClient}=require("../Redis/redisClient")



router.get("" ,async ()=>{
//Tld 


const api=fetch("https://jsonplaceholder.typicode.com/posts")

const apis=(await api).json

console.log(apis)


})



// this  is get or  set in redis faster then other





