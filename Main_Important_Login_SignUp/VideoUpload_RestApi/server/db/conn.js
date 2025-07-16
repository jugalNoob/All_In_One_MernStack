const mongoose = require('mongoose');
const DB = "mongodb+srv://jugal786:jugal786@cluster0.sgg8t.mongodb.net/ones?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    if (!DB) {
      throw new Error("Database URL not provided.");
    }

    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("✅ MongoDB connected successfully.");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Optional: exit on failure
  }
};

module.exports = connectDB;
