const { z } = require("zod");

// Validation schema
const userSchema = z.object({
  _id: z.string().uuid("Invalid UUID"),
  
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must not exceed 50 characters")
    .trim(),

  price: z
    .number()
    .min(0, "Price must be positive"),

  country: z.string().min(2, "Country must be at least 2 characters"),

  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    errorMap: () => ({ message: "Invalid blood group" }),
  }),

  email: z
    .string()
    .email("Invalid email address")
    .max(100)
    .toLowerCase(),

  birthDate: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    "Invalid birth date"
  ),

  age: z
    .number()
    .int("Age must be an integer")
    .min(0, "Age must be >= 0")
    .max(120, "Age must be <= 120"),

  hobbies: z.array(z.string()).nonempty("Must have at least one hobby"),

  bio: z.string().max(500, "Bio too long"),

  isEligible: z.boolean(),

  gender: z.enum(["male", "female", "other"]),
});

// Middleware for validation
exports.validateUser = (req, res, next) => {
  try {
    userSchema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }
};
