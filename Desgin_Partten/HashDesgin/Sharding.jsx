1️⃣ Mongoose Model (model/student.js)

const mongoose = require('mongoose');
const shortid = require('shortid');

const jobSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, index: true }, // index to help shard key
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
  shortId: { type: String, unique: true }
});

// IMPORTANT: Ensure shard key has an index
jobSchema.index({ email: 1 });

const Register = mongoose.model("Restapi", jobSchema);
module.exports = Register;


2️⃣ MongoDB Connection (db/connect.js)

const mongoose = require('mongoose');

// Debug logging for MongoDB queries
mongoose.set('debug', function (collectionName, method, query, doc) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 📦 Mongoose => ${collectionName}.${method}(${JSON.stringify(query)}, ${JSON.stringify(doc)})`);
});

mongoose.set('bufferCommands', false);
mongoose.set('bufferTimeoutMS', 0);

const connectMongo = async () => {
  try {
    // Connect to your SHARDED cluster (Atlas URI)
    await mongoose.connect(
      'mongodb+srv://jugal786:jugal786@cluster0.sgg8t.mongodb.net/ones?retryWrites=true&w=majority',
      {
        maxPoolSize: 100,
        minPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log("✅ MongoDB connected (Sharded Cluster)");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    console.error("Full Error Stack:", err.stack);
    process.exit(1);
  }
};

module.exports = connectMongo;


3️⃣ Express Router (routes/userRoutes.js)

const express = require("express");
const shortid = require("shortid");
const Register = require("../model/student");

const router = new express.Router();

// POST route - Create new user
router.post("/post", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    // Create a new record
    const newUser = new Register({
      name,
      email,
      password,
      shortId: shortid.generate()
    });

    await newUser.save();

    console.log("✅ User saved to MongoDB (Sharded Collection)");
    res.status(201).json({ message: "User registered successfully", user: newUser });

  } catch (error) {
    console.error("❌ Error in POST /post:", error);

    if (error.code === 11000) {
      return res.status(400).json({ error: "Email or shortId already exists" });
    }

    res.status(500).json({ error: "Failed to register user" });
  }
});

// GET route - Query by email (shard key for fast lookup)
router.get("/get/:email", async (req, res) => {
  try {
    const user = await Register.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Error in GET /get/:email:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

module.exports = router;


4️⃣ Server Entry Point (server.js)

const express = require("express");
const connectMongo = require("./db/connect");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

// Routes
app.use("/api", userRoutes);

// Start server & connect DB
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectMongo();
  console.log(`🚀 Server running on port ${PORT}`);
});


5️⃣ Sharding Configuration (MongoDB Shell)

Once your cluster is running, log in to MongoDB shell (mongosh) and run:

// Enable sharding for the database
sh.enableSharding("ones");

// Shard the collection using 'email' as shard key
sh.shardCollection("ones.restapis", { email: 1 });


✅ How it works now:

POST /api/post inserts into the correct shard based on email.

GET /api/get/:email queries exactly one shard for fast lookup.

Mongoose automatically connects to your sharded Atlas cluster.

Indexes are in place to match the shard key for performance.


1️⃣ Understand what a sharded cluster is doing
When you enable sharding, MongoDB:

Splits your collection into chunks based on the shard key.

Distributes those chunks across multiple shards (which are themselves replica sets).

Routes every query via a mongos router, which decides which shard(s) to query.

Each shard can be on a different machine (or in your case, possibly using multiple CPU cores in cloud/Atlas).



000....sh.status()



You should see:

Your database (ones) is sharded.

Your collection (restapis) has { email: 1 } as a shard key.

A list of shards (shard01, shard02, shard03…).

Chunk distribution per shard.



Shards:
    shard01 at shard01/10.0.0.1:27017
    shard02 at shard02/10.0.0.2:27017

Collections:
    ones.restapis
        shard key: { "email" : 1 }
        unique: false
        balancing: true
        chunks:
            shard01: 120
            shard02: 110



3️⃣ Insert sample data & see distribution

You can run this in Node.js to force shard distribution test:


const mongoose = require("mongoose");
const shortid = require("shortid");
const Register = require("./model/student");

(async () => {
  await mongoose.connect("mongodb+srv://<user>:<pass>@cluster0.sgg8t.mongodb.net/ones");

  // Insert multiple users with varying emails
  for (let i = 0; i < 1000; i++) {
    await Register.create({
      name: `User${i}`,
      email: `user${i}@example.com`,
      password: "pass123",
      shortId: shortid.generate()
    });
  }

  console.log("✅ Inserted 1000 test users");
  process.exit();
})();


4️⃣ Check real-time queries hitting shards

If you have shell access to each shard node:


mongostat --host shard01 --rowcount 5

mongostat --host shard02 --rowcount 5

5️⃣ Relating this to CPU usage
In Atlas or a self-hosted cluster:

Each shard can be hosted on its own server (so you use more CPU cores in total).

If you have an 8 CPU machine but only 1 shard, you’re not really leveraging sharding for parallel processing.

With multiple shards, MongoDB spreads read/write load → more CPUs working in parallel → higher throughput.

6️⃣ Quick architecture mental picture

Without sharding → All data in one replica set → Only 1 primary does writes.

With sharding → Each shard has its own primary → Writes are spread out.

This means an 8-CPU machine per shard gives you 8 CPUs × N shards worth of processing.



