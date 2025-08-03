const express = require("express");
const router = express.Router();

const SigUpUser=require('../controller/SignUp')


router.post('/' , SigUpUser.signUP)




module.exports = router;
