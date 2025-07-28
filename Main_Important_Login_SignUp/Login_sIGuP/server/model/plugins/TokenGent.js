
// //  ---->>>> Jwt GenearteAuthtoken ==============>>>>>
// studentSchema.methods.generateAuthtokens = async function () {
//   try {
//     const token = jwt.sign(
//       {
//         userID: this._id.toString(),
//         email: this.email
//       },
//       keysecret,
//       {
//         expiresIn: '90m' // ⏰ Set token to expire in 90 minutes
//       }
//     );

//     this.tokens = this.tokens.concat({ token });
//     await this.save();

//     return token;
//   } catch (error) {
//     console.error("Token generation error:", error);
//     throw new Error("Failed to generate token");
//   }
// };




const jwt = require("jsonwebtoken");

module.exports = function jwtPlugin(schema, options = {}) {
  const secretKey = "myVerySecretHardcodedKey123"; // 🔐 Embedded secret key

  schema.methods.generateAuthToken = async function () {
    try {
      const token = jwt.sign(
        {
          userID: this._id.toString(),
          role: this.role,
          email: this.email,
        },
        secretKey,
        {
          expiresIn: options.expiresIn || "90m", // Optional expiry passed via options
        }
      );

      this.tokens = this.tokens || [];
      this.tokens.push({ token });
      await this.save();

      return token;
    } catch (error) {
      console.error("JWT Plugin Error:", error);
      throw new Error("Token generation failed");
    }
  };
};
