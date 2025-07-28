const express = require("express");
const router = new express.Router();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { validateSignup } = require("../middleware/validateSignup");
const githubController = require('../controollers/githubAuthController.js');
const getAllUsers = require('../controollers/admincontroller.js');
const checkAdmin = require('../middleware/Checkadmin.js');

// ---> RateLimit Your ------------>>

const RateLimit = require("../middleware/rate"); // Correct import




 //--- >. Admin checxk --------------->>

 router.get('/admin/users', checkAdmin, getAllUsers);


// ---> gitHub Login system --------------------------


// GitHub OAuth Routes
router.get('/auth/github', githubController.authWithGitHub);
router.get('/auth/github/callback', githubController.authGitHubCallback);

// Auth Status
router.get('/login/success', githubController.loginSuccess);
router.get('/login/failed', githubController.loginFailed);

// Logout
router.get('/logout', githubController.logoutUser);


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