const express = require("express");
const router = new express.Router();

const Apigetuser=require("../controollers/SignUp")


router.get("/get", Apigetuser.Apiget);


module.exports = router;