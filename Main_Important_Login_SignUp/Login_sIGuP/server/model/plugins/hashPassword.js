const argon2 = require("argon2");

module.exports = function hashPassword(schema) {
  schema.pre("save", async function (next) {
    try {
      if (this.isModified("password")) {
        this.password = await argon2.hash(this.password);
      }
      next();
    } catch (error) {
      next(error); // better than throwing directly
    }
  });
};



// studentSchema.pre("save", async function (next) {
//     try {
//       if (this.isModified("password")) {
//         // this.password = await bcrypt.hash(this.password, 12);
//         this.password=await argon2.hash(this.password)
//       }
  
//       next();
//     } catch (error) {
//       throw new Error(error);
//     }
//   });

