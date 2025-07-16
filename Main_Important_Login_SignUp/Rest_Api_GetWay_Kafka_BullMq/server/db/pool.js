const mongoose = require('mongoose');

const connectMongo = async () => {
  try {
    await mongoose.connect('mongodb+srv://jugal786:jugal786@cluster0.sgg8t.mongodb.net/ones?retryWrites=true&w=majority', {
      // Connection Pooling Settings
      maxPoolSize: 100,        // default is 100 (MongoDB 4.2+)
      minPoolSize: 10,         // optional
      serverSelectionTimeoutMS: 5000, // fail fast if not connected
      socketTimeoutMS: 45000,
      family: 4,               // IPv4

      // Optional but recommended
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected with pooling");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectMongo;
