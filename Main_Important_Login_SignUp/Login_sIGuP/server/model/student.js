const mongoose = require("mongoose");
require('dotenv').config();
const shortid = require('shortid'); // Import shortid library
const keysecret = process.env.SECRET_KEY
var bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken")
const argon2 = require('argon2');
const userInfoLogger = require("./plugins/LoggerReq");

 const jwtPlugin = require("./plugins/TokenGent");

 const sessionTokenGenerator = require("./plugins/UserMobile");
 const hashPassword = require("./plugins/hashPassword");
// Define the student schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  shortId: { type: String, unique: true },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  tokens: [
    {
      token: {
        type: String
      }
    }
  ],
  sessions: [
    {
      token: { type: String, required: true },
      ip: String,
      userAgent: String,
      deviceInfo: String,
      location: String,
      createdAt: { type: Date, default: Date.now },
      expiresAt: Date
    }
  ],
  address: [
    {
      add: { type: String }
    }
  ],
  refreshTokens: [
    {
      token: String,
      expiresAt: Date
    }
  ]
});


// Plugins Integration
studentSchema.plugin(hashPassword);                     // Hash password before saving
studentSchema.plugin(jwtPlugin, { expiresIn: "2h" });   // Generate auth token
studentSchema.plugin(userInfoLogger);                   // Store request info
studentSchema.plugin(sessionTokenGenerator);            // Generate session info

// Create and export the student model
const Register  = mongoose.model("Url", studentSchema);
module.exports = Register ;








//   /// ---->>>>  JWT refersToken ------------------------------>>>

//   studentSchema.methods.generateRefreshToken = async function () {
//   const refreshToken = jwt.sign(
//     { userID: this._id.toString(), email: this.email },
//     keysecret,
//     { expiresIn: "7d" }
//   );

//   this.refreshTokens.push({
//     token: refreshToken,
//     expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//   });

//   await this.save();
//   return refreshToken;
// };


// // -------------------->????rotateRefreshToken 


// studentSchema.methods.rotateRefreshToken = async function (oldRefreshToken) {
//   // Remove the old refresh token
//   this.refreshTokens = this.refreshTokens.filter(rt => rt.token !== oldRefreshToken);

//   // Generate a new one
//   const newRefreshToken = await this.generateRefreshToken();

//   await this.save();
//   return newRefreshToken;
// };


