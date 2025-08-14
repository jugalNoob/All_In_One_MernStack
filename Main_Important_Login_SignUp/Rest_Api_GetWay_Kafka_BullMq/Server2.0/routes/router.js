const express = require("express");
const router = new express.Router();

const Apigetuser=require("../controollers/UserGet")

const PostUser=require('../controollers/Userpost')


router.get("/get", Apigetuser.Apiget);



router.post("/userPost", PostUser.first);

module.exports = router;