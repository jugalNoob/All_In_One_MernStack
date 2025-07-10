const express = require("express");
const router = new express.Router();
const Signuser=require("../controollers/SignUp")
const apiGetuser=require("../controollers/ApiGet")


router.post("/form", Signuser.first);

router.get("/getuser", apiGetuser.Apiget);
module.exports = router;
