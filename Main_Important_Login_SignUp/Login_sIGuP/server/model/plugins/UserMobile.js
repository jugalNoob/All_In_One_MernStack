// plugins/sessionTokenGenerator.js


const jwt = require("jsonwebtoken");
const geoip = require("geoip-lite");
const keysecret = process.env.JWT_SECRET || "your-default-key"; // fallback if needed

module.exports = function sessionTokenGenerator(schema) {
  schema.methods.generateSessionToken = async function (req) {
    const token = jwt.sign(
      { userID: this._id.toString(), email: this.email },
      keysecret,
      { expiresIn: "90m" }
    );

    // Extract user context
    let ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
    if (ip === "::1") ip = "103.27.9.41"; // Localhost mock
    else if (ip?.startsWith("::ffff:")) ip = ip.split("::ffff:")[1];

    const userAgent = req.headers["user-agent"] || "Unknown";
    const geo = geoip.lookup(ip);
    const location = geo ? `${geo.city}, ${geo.country}` : "Unknown";

    this.sessions = this.sessions || [];
    this.sessions.push({
      token,
      ip,
      userAgent,
      location,
      expiresAt: new Date(Date.now() + 90 * 60 * 1000) // 90 minutes
    });

    await this.save();
    return token;
  };
};




// studentSchema.methods.generateSessionToken = async function (req) {
//   const jwt = require("jsonwebtoken");
//   const geoip = require("geoip-lite");

//   const token = jwt.sign({ userID: this._id.toString(), email: this.email }, keysecret, {
//     expiresIn: "90m"
//   });

//   // Extract user context
//   let ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
//   if (ip === "::1") ip = "103.27.9.41"; // mock for local
//   else if (ip?.startsWith("::ffff:")) ip = ip.split("::ffff:")[1];

//   const userAgent = req.headers["user-agent"] || "Unknown";
//   const location = geoip.lookup(ip)?.city + ", " + geoip.lookup(ip)?.country;

//   this.sessions.push({
//     token,
//     ip,
//     userAgent,
//     location,
//     expiresAt: new Date(Date.now() + 90 * 60 * 1000)
//   });

//   await this.save();
//   return token;
// };
