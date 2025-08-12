const express = require("express");
const router = new express.Router();
const Register = require("../model/student"); // Adjust path to your model
// const Apigetuser=require("../controollers/SignUp")

router.post("/post", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    // Create a new record with shortId
    const newUser = new Register({
      name,
      email,
      password,
      shortId: shortid.generate()
    });

    // Save to MongoDB
    await newUser.save();

    console.log("✅ User saved to MongoDB");
    res.status(201).json({ message: "User registered successfully", user: newUser });

  } catch (error) {
    console.error("❌ Error in POST /post:", error);

    // Handle duplicate email or shortId
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email or shortId already exists" });
    }

    res.status(500).json({ error: "Failed to register user" });
  }
});

module.exports = router;