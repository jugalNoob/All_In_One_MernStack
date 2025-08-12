
const mongoose = require('mongoose');



// 🐞 Custom debug logger

mongoose.set('debug', function (collectionName, method, query, doc) {
  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp}] 📦 Mongoose => ${collectionName}.${method}(${JSON.stringify(query)}, ${JSON.stringify(doc)})`
  );
});



// 🛑 Disable command buffering so you fail fast if not connected
mongoose.set('bufferCommands', false);
mongoose.set('bufferTimeoutMS', 0);

const connectMongo = async () => {
  try {
    await mongoose.connect('mongodb+srv://jugal786:jugal786@cluster0.sgg8t.mongodb.net/ones?retryWrites=true&w=majority', {
      maxPoolSize: 100,
      minPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("✅ MongoDB connected with pooling");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    // Print full error details
    console.error("Full Error Stack:", err.stack);
    process.exit(1);
  }
};

module.exports = connectMongo;
