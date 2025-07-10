const mongoose = require("mongoose");
require('dotenv').config();
const shortid = require('shortid'); // Import shortid library
const keysecret = process.env.SECRET_KEY
var bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken")
const argon2 = require('argon2');
// Define the student schema
const studentSchema = new mongoose.Schema({
    name: { type: String  ,required:true},
    email: { type: String , required:true , unique:true}, //unique email address
    password: { type: String, required:true},
    date: { type: Date, default: Date.now }, // Default date time
    shortId: { type: String, unique: true }, // Ensure shortId is unique
    tokens:[
        {
            token:{
                type:String
            },
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

 

 
});


//You can generate and track a session like this:

studentSchema.methods.generateSessionToken = async function (req) {
  const jwt = require("jsonwebtoken");
  const geoip = require("geoip-lite");

  const token = jwt.sign({ userID: this._id.toString(), email: this.email }, keysecret, {
    expiresIn: "90m"
  });

  // Extract user context
  let ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
  if (ip === "::1") ip = "103.27.9.41"; // mock for local
  else if (ip?.startsWith("::ffff:")) ip = ip.split("::ffff:")[1];

  const userAgent = req.headers["user-agent"] || "Unknown";
  const location = geoip.lookup(ip)?.city + ", " + geoip.lookup(ip)?.country;

  this.sessions.push({
    token,
    ip,
    userAgent,
    location,
    expiresAt: new Date(Date.now() + 90 * 60 * 1000)
  });

  await this.save();
  return token;
};

// ----> User Important ass IN sigup importantion  --------------------->>

studentSchema.methods.generateUserInfomration = async function (href, ip, hostname, pathname, protocol, connection, host, secChUaPlatform, acceptLanguage, secChUa) {
    const token = {
        href,
        'IP Address': ip,
        Host: hostname,
        Pathname: pathname,
        Protocol: protocol,
        Connection: connection,
        'Host Header': host,
        'Sec-CH-UA-Platform': secChUaPlatform,
        'Accept-Language': acceptLanguage,
        'Sec-CH-UA': secChUa
    }; // Example token, this should be generated securely
    this.address.push({ add: JSON.stringify(token) });
    await this.save();
    return token;
};





studentSchema.methods.generateAuthtokens = async function () {

    try {
      let token23 = jwt.sign({
        userID:this._id.toString(),
      email:this.email}, keysecret)
  
  
      this.tokens = this.tokens.concat({ token: token23 });
      await this.save();
      return token23;
  } catch (error) {
      res.status(422).json(error)
  } 
  };
  

// Create cryptography 

studentSchema.pre("save", async function (next) {
    try {
      if (this.isModified("password")) {
        // this.password = await bcrypt.hash(this.password, 12);
        this.password=await argon2.hash(this.password)
      }
  
      next();
    } catch (error) {
      throw new Error(error);
    }
  });





// Create and export the student model
const Register  = mongoose.model("Url", studentSchema);
module.exports = Register ;




