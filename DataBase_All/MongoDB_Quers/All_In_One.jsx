🔥 MongoDB A-Z: Ultimate Cheat Sheet (Best Practices & Concepts) 🔥
📌 A. Aggregation Pipeline
Powerful ETL (Extract, Transform, Load) for analytics:

javascript
db.orders.aggregate([
  { $match: { status: "A" } },          // Filter docs
  { $group: { _id: "$cust_id", total: { $sum: "$amount" } } }, // Group & sum
  { $sort: { total: -1 } },             // Sort descending
  { $limit: 5 },                        // Top 5 results
  { $project: { _id: 0, customer: "$_id", total: 1 } } // Reshape output
])
Key Stages:
✔ $match (filter) → $group (aggregate) → $sort/$limit → $project (reshape)
✔ $lookup (JOIN), $unwind (flatten arrays), $facet (multi-pipeline)

📌 B. BSON (Binary JSON)
Storage format (faster than JSON for DB ops)

Extra types: ObjectId, Date, Decimal128, BinData

📌 C. CRUD Operations
Operation	Command
Insert	db.collection.insertOne({name: "Alice"})
Find	db.users.find({age: {$gt: 18}}, {name: 1})
Update	db.products.updateOne({_id: 1}, {$inc: {stock: -1}})
Delete	db.logs.deleteMany({status: "expired"})
📌 D. Data Types
javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"), // Unique ID
  name: "MongoDB",                          // String
  price: 0.0,                               // Double
  isActive: true,                           // Boolean
  tags: ["database", "NoSQL"],              // Array
  meta: { version: 6.0 },                   // Nested Object
  createdAt: new Date(),                    // Date
  hash: BinData(0, "aGVsbG8=")              // Binary
}
📌 E. Encryption & Security
Field-Level Encryption (Client-Side)

Authentication:

yaml
security:
  authorization: enabled
Roles: read, readWrite, dbAdmin, userAdmin

📌 F. Find & Query Operators
javascript
// Comparison
db.users.find({ age: { $gt: 25, $lte: 30 } })

// Logical
db.products.find({ $or: [ { price: 0 }, { inStock: true } ] })

// Array
db.blog.find({ tags: { $all: ["mongodb", "database"] } })
📌 G. Geospatial Queries
javascript
db.places.createIndex({ location: "2dsphere" })

// Find places within 1km radius
db.places.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [ -73.97, 40.77 ] },
      $maxDistance: 1000
    }
  }
})
📌 H. Indexing (Speed Up Queries)
javascript
// Single field index
db.users.createIndex({ email: 1 }) // 1 = Ascending

// Compound index
db.orders.createIndex({ customer: 1, date: -1 })

// TTL Index (Auto-delete after 24h)
db.logs.createIndex({ createdAt: 1 }, { expireAfterSeconds: 86400 })
✔ Rule: Index frequently queried fields.

📌 I. Insert Best Practices
javascript
// Single insert
db.products.insertOne({ name: "Laptop", price: 999 })

// Bulk insert (unordered = faster)
db.products.insertMany([...], { ordered: false })
📌 J. JSON Schema Validation
javascript
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      required: ["name", "email"],
      properties: {
        name: { bsonType: "string" },
        email: { pattern: "^.+@.+\..+$" }
      }
    }
  }
})
📌 K. Kafka Integration
MongoDB Kafka Connector → Stream changes to Kafka topics.

📌 L. Lookup (JOIN Collections)
javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "users",           // Collection to join
      localField: "user_id",   // Field in current collection
      foreignField: "_id",     // Field in 'users'
      as: "user_details"       // Output array
    }
  }
])
📌 M. Mongoose (Node.js ODM)
javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 18 }
});
const User = mongoose.model("User", userSchema);
📌 N. Normalization vs Denormalization
Normalized	Denormalized
Less redundancy	Faster reads
More JOINs	Writes slower
📌 O. ObjectId
12-byte unique identifier

Structure: Timestamp | Machine ID | Process ID | Counter

📌 P. Projection (Select Fields)
javascript
// Include only name & email
db.users.find({}, { name: 1, email: 1, _id: 0 })
📌 Q. Query Optimization
Use explain() to analyze queries.

Covered Queries: Use indexes only (projection + index).

📌 R. Replication (High Availability)
Primary + Secondaries (Replica Set)

Automatic failover

📌 S. Sharding (Horizontal Scaling)
Partition data across multiple servers.

Shard Key: Must be carefully chosen.

📌 T. Transactions (ACID)
javascript
const session = db.getMongo().startSession();
session.startTransaction();
try {
  await db.orders.insertOne({ item: "Book" }, { session });
  await db.inventory.updateOne({ item: "Book" }, { $inc: { stock: -1 } }, { session });
  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction();
}
📌 U. Update Operators
javascript
db.users.updateOne(
  { _id: 1 },
  {
    $set: { status: "active" },   // Update field
    $inc: { loginCount: 1 },      // Increment
    $push: { logs: "2023-login" } // Append to array
  }
)
📌 V. Validation
javascript
db.createCollection("products", {
  validator: {
    $jsonSchema: {
      required: ["name", "price"],
      properties: {
        price: { bsonType: "decimal", minimum: 0 }
      }
    }
  }
})
📌 W. Write Concern
javascript
db.orders.insertOne(
  { item: "Laptop" },
  { writeConcern: { w: "majority", j: true } } // Wait for majority write + journal
)
📌 X. XOR Logic
javascript
// (A OR B) BUT NOT (A AND B)
db.users.find({
  $nor: [
    { $and: [{ isStudent: true }, { isEmployee: true }] },
    { $and: [{ isStudent: false }, { isEmployee: false }] }
  ]
})
📌 Y. YAML Config
yaml
storage:
  dbPath: "/data/db"
net:
  port: 27017
security:
  authorization: enabled
📌 Z. Zipping Arrays
javascript
db.sales.aggregate([
  {
    $project: {
      merged: {
        $zip: { inputs: ["$items", "$prices"], useLongestLength: true }
      }
    }
  }
])
🚀 Bonus: MongoDB Tools
Compass (GUI)

Atlas (Cloud DBaaS)

mongodump/mongorestore (Backup & Restore)

✅ Summary
✔ CRUD → insert, find, update, delete
✔ Aggregation → $match, $group, $lookup
✔ Indexes → Faster queries (explain())
✔ Replication → High availability
✔ Sharding → Horizontal scaling
 