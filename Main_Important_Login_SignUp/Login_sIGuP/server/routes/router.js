const express = require("express");
const router = new express.Router();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { validateSignup } = require("../middleware/validateSignup");


// ---> RateLimit Your ------------>>

const RateLimit = require("../middleware/rate"); // Correct import




// --- > Controolers Planel Folder --------->>
  
const usersign=require("../controollers/SignUp")

const userlogin=require("../controollers/Login")

const userUpdate=require("../controollers/Update")



// router.post("/v1/users/register", RateLimit, usersign.formUser); // POST /api/v1/auth/v1/users/register
router.post("/v1/users/register",validateSignup, usersign.formUser); // POST /api/v1/auth/v1/users/register





// --- > Login User -- >>
router.post("/loginUser" , userlogin.loginUser)


// -->Simple Update  ---->>
// router.patch("/UpdateUser" , userUpdate.updateUser)

//-->Advance Update --->>

router.patch("/UpdateUser/:id/:email", userUpdate.updateUsers);



module.exports = router;