
const Register = require("../model/student");
const shortid = require('shortid'); // Import shortid library
const argon2 = require('argon2');
const bcrypt = require("bcryptjs");
const geoip = require("geoip-lite");

//Login add  methods --->> b::::::::::::::::::::::::::::::::::::::::::::::::




// -->>> User Login Jwt And Loaction ---------------------->>

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please provide email and password" });
  }

  try {
    const userValid = await Register.findOne({ email });

    if (!userValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // const isMatch = await bcrypt.compare(password, userValid.password);

    const isMatch=await argon2.verify( userValid.password,password)
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const existingToken = userValid.token || (userValid.tokens?.[0]?.token);
    if (!existingToken) {
      return res.status(403).json({ error: "Token not found. Please sign up again." });
    }



    // sessions Validtion user Devices  Information ------------->>



    const now = new Date();

// Extract IP from request
let ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
if (ip === "::1") ip = "103.27.9.41"; // dev fallback
else if (ip?.startsWith("::ffff:")) ip = ip.split("::ffff:")[1];

// Extract user-agent
const userAgent = req.headers["user-agent"] || "Unknown";

// Find a valid matching session
const activeSession = userValid.sessions.find(session =>
  session.token && 
  session.ip === ip &&
  session.userAgent === userAgent &&
  session.expiresAt > now
);

if (!activeSession) {
  console.log(`[${now.toISOString()}] No valid session for ${userValid.email} (IP or UA mismatch)`);
  return res.status(403).json({ error: "Session expired or device mismatch. Please log in again." });
}

// Optional: Log session match info
console.log(`[${now.toISOString()}] Session matched for: ${userValid.email}`);
console.log(`Token: ${activeSession.token}`);
console.log(`IP: ${activeSession.ip}, UA: ${activeSession.userAgent}, Location: ${activeSession.location}`);

//    if (!userValid.sessions || userValid.sessions.length === 0) {
//   console.log(`[${new Date().toISOString()}] No active sessions found for user: ${userValid.email}`);
//   return res.status(403).json({ error: "No active sessions. Please sign up again." });
// }





    // ✅ Set JWT token in HTTP-only cookie
    res.cookie("jwttoken", existingToken, {
      expires: new Date(Date.now() + 90 * 60 * 1000), // 90 minutes
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only over HTTPS in production
      sameSite: "strict"
    });
   
 


    console.log("Your login was successful");
console.log(`[${new Date().toISOString()}] Login attempt: email=${email}, success=${isMatch}`);

    return res.status(200).json({
      success: true,
      user: {
        name: userValid.name,
        email: userValid.email,
        shortId: userValid.shortId,
        token: existingToken
      }
    });

  } catch (err) {
    console.error("Login error:", err);

    // Optional: handle specific known errors (these may not apply here but show the right pattern)
    if (err.message === "All fields are required") {
      return res.status(400).json({ error: 'Bad Request: ' + err.message });
    }

    if (err.message === "User email already exists") {
      return res.status(422).json({ error: 'Unprocessable Entity: ' + err.message });
    }

    // Default fallback for other errors
    return res.status(500).json({ error: "Internal server error" });
  }
};



// --->>> Bcript password jwt login adavance  0--=----------------->>

exports.loginUsert = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please provide email and password" });
  }

  try {
    const userValid = await Register.findOne({ email });

    if (!userValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // const isMatch = await bcrypt.compare(password, userValid.password);

    const isMatch=await argon2.verify( userValid.password,password)
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const existingToken = userValid.token || (userValid.tokens?.[0]?.token);
    if (!existingToken) {
      return res.status(403).json({ error: "Token not found. Please sign up again." });
    }

    // ✅ Set JWT token in HTTP-only cookie
    res.cookie("jwttoken", existingToken, {
      expires: new Date(Date.now() + 90 * 60 * 1000), // 90 minutes
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only over HTTPS in production
      sameSite: "strict"
    });




    console.log("Your login was successful");
console.log(`[${new Date().toISOString()}] Login attempt: email=${email}, success=${isMatch}`);

    return res.status(200).json({
      success: true,
      user: {
        name: userValid.name,
        email: userValid.email,
        shortId: userValid.shortId,
        token: existingToken
      }
    });

  } catch (err) {
    console.error("Login error:", err);

    // Optional: handle specific known errors (these may not apply here but show the right pattern)
    if (err.message === "All fields are required") {
      return res.status(400).json({ error: 'Bad Request: ' + err.message });
    }

    if (err.message === "User email already exists") {
      return res.status(422).json({ error: 'Unprocessable Entity: ' + err.message });
    }

    // Default fallback for other errors
    return res.status(500).json({ error: "Internal server error" });
  }
};


/// ---------------------->> Login With Paasword and Jwt ---------------->?>>?>

exports.loginUsersw = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please provide email and password" });
  }

  try {
    const userValid = await Register.findOne({ email });

    
    console.log(userValid)

  // Step 3: Compare plain text password
    if (password !== userValid.password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // ✅ Use existing token saved during signup
    const existingToken = userValid.token || (userValid.tokens?.[0]?.token);

    if (!existingToken) {
      return res.status(403).json({ error: "Token not found. Please sign up again." });
    }

    // ✅ Send user info with existing token
    return res.status(200).json({
      success: true,
      user: {
        name: userValid.name,
        email: userValid.email,
        shortId: userValid.shortId,
        token: existingToken
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


/// Simple Login Vaildtion 

exports.loginUserss = async (req, res) => {
  const { email, password } = req.body;

  // Step 1: Check input
  if (!email || !password) {
    return res.status(422).json({ error: "Please provide email and password" });
  }

  try {
    // Step 2: Find user
    const userValid = await Register.findOne({ email });
    if (!userValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Step 3: Compare plain text password
    if (password !== userValid.password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Step 4: Success response
    return res.status(200).json({
      message: "Login successful",
      user: {
        name: userValid.name,
        email: userValid.email
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
