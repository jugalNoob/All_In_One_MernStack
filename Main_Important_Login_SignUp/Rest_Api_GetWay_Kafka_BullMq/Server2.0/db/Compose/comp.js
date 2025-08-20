// const mongoose = require('mongoose');

// const connectMongo = async () => {
//   const MONGO_URI = 'mongodb://localhost:27017/apiProject';

//   try {
//     console.log(`🔍 Trying to connect to MongoDB at: ${MONGO_URI}`);

//     await mongoose.connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000, // Fail fast if server is unreachable
//       socketTimeoutMS: 45000,        // Close sockets after 45s inactivity
//       maxPoolSize: 20                // Adjust connection pooling for performance
//     });

//     console.log(`✅ Connected to MongoDB: ${mongoose.connection.name}`);
//     console.log(`📦 Database: ${mongoose.connection.db.databaseName}`);
//     console.log(`🖥️ Host: ${mongoose.connection.host}`);
//     console.log(`🔌 Port: ${mongoose.connection.port}`);

//     // Optional: Log all queries in dev
//     if (process.env.NODE_ENV !== 'production') {
//       mongoose.set('debug', true);
//     }

//     // Handle disconnection events
//     mongoose.connection.on('disconnected', () => {
//       console.error('⚠️ MongoDB disconnected. Attempting to reconnect...');
//     });

//     mongoose.connection.on('error', (err) => {
//       console.error('❌ MongoDB connection error:', err.message);
//     });

//   } catch (err) {
//     console.error('❌ Initial MongoDB connection error:', err.message);
//     console.error('Full Stack:', err.stack);

//     // Optional: retry after delay
//     setTimeout(connectMongo, 5000);
//   }
// };

// module.exports = connectMongo;
