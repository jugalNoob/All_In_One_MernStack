✅ MONGODB – Full CRUD & Schema Master Reference
🧠 00. Mongoose Schema Data Types
js
Copy
Edit
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,                          // String
  age: Number,                           // Number
  email: { type: String, unique: true }, // String with constraint
  isVerified: Boolean,                   // Boolean
  createdAt: { type: Date, default: Date.now },  // Date
  profilePicture: Buffer,                // Binary data (Buffer)
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], // ObjectId ref
  meta: mongoose.Schema.Types.Mixed,     // Dynamic Mixed data
  balance: mongoose.Schema.Types.Decimal128,     // Decimal128 (money)
  preferences: { type: Map, of: String }         // Map<Key, String>
});

const User = mongoose.model('User', userSchema);
🔍 1. FIND Operations
🔎 Basic Queries:
js
Copy
Edit
db.dataall.find()                              // All docs
db.dataall.find({ qty: 69 })                   // Match qty = 69
db.dataall.find({ qty: { $lte: 36 } })         // qty ≤ 36
db.dataall.find({ qty: { $gt: 36, $lte: 69 } })// qty > 36 and ≤ 69
db.dataall.findOne({ qty: 69 })                // One matching document
🔢 Pagination + Sorting:
js
Copy
Edit
db.dataall.find().limit(3).skip(10)            // Pagination
db.dataall.find().sort({ age: 1 })             // Ascending
db.dataall.find().sort({ age: -1, name: 1 })    // Multi-field sort
📊 Count & Format:
js
Copy
Edit
db.dataall.find().count()                      // Count
db.dataall.find().pretty()                     // Formatted output
db.dataall.find().toArray()                    // All as array
🎯 Projection (select fields):
js
Copy
Edit
db.students.find({}, { name: 1, _id: 0 })       // Only show name
db.posts.find({}, { _id: 0, title: 1, date: 1 })
🧾 2. SELECT BY Field Presence / Type
js
Copy
Edit
db.dataall.find({ item: { $exists: true } })
db.dataall.find({ item: { $exists: true, $type: "string" } })
✍️ 3. INSERT Operations
🔹 insertOne():
js
Copy
Edit
db.dataall.insertOne({
  item: 'canvas',
  qty: 100,
  tags: ['cotton'],
  size: { h: 28, w: 35.5, uom: 'cm' }
});
🔹 insertMany() with ordered: false:
js
Copy
Edit
db.collection.insertMany([
  { item: 'canvas', qty: 100 },
  { item: 'journal', qty: 25 },
], { ordered: false })
♻️ 4. UPDATE Operations
🔸 updateOne() / updateMany():
js
Copy
Edit
db.dataall.updateOne({ item: "mat" }, { $set: { qty: 12 } })
db.dataall.updateMany({ qty: 25 }, { $set: { qty: 69 } })
🔧 Advanced Update Operators:
js
Copy
Edit
$inc     // Increment
$mul     // Multiply
$min     // Set only if lower
$max     // Set only if greater
$unset   // Remove field
$rename  // Rename field
🔁 upsert Example:
js
Copy
Edit
db.users.updateOne(
  { name: "not-exist" },
  { $set: { age: 100 } },
  { upsert: true }
)


🧺 5. ARRAY UPDATE OPERATIONS


| Operator    | Action                                 |
| ----------- | -------------------------------------- |
| `$push`     | Add new item(s) to array               |
| `$addToSet` | Add only if not already present        |
| `$pull`     | Remove values from array               |
| `$pop`      | Remove first (-1) or last (+1) element |
| `$each`     | Push multiple values                   |



db.users.updateOne({ name: "amit" }, { $push: { hobbies: { $each: ["youtuber", "movies"] } } })
db.users.updateOne({ name: "amit" }, { $addToSet: { hobbies: { $each: ["youtuber", "movies"] } } })
db.users.updateOne({ name: "amit" }, { $pull: { hobbies: { $in: ["youtuber", "movies"] } } })
db.users.updateOne({ name: "amit" }, { $pop: { hobbies: 1 } }) // Last
❌ 6. DELETE Operations
js
Copy
Edit
db.dataall.deleteOne({ item: "canvas" })        // One
db.dataall.deleteMany({ qty: 10 })              // Many
db.dataall.deleteMany({})                       // All
🧪 7. DataTypes in MongoDB


| Type            | Description                       |
| --------------- | --------------------------------- |
| String          | `"John"`                          |
| Integer         | `NumberInt(42)`                   |
| Long            | `NumberLong(1234567890123)`       |
| Double          | `3.14`                            |
| Decimal128      | `NumberDecimal("123.45")`         |
| Boolean         | `true / false`                    |
| Date            | `ISODate("2024-01-01T00:00:00Z")` |
| ObjectId        | `_id: ObjectId("...")`            |
| Array           | `["apple", "banana"]`             |
| Embedded Obj    | `{ name: "jugal", age: 20 }`      |
| Binary / Buffer | Store images, files               |
| Null            | `null`                            |
| Regex           | `/^J/`                            |




✅ 8. Schema Validation in MongoDB
js
Copy
Edit
db.createCollection("newUser", {
  validator: {
    $jsonSchema: {
      required: ["name", "price"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        price: {
          bsonType: "number",
          description: "must be a number and is required"
        }
      }
    }
  },
  validationAction: "error"
})
✅ Remove Validation:

js
Copy
Edit
db.runCommand({
  collMod: "newUser",
  validator: {},
  validationLevel: "off"
})
🧱 9. Capped Collection Example
js
Copy
Edit
db.createCollection("logs", {
  capped: true,
  size: 1000000, // bytes
  max: 4         // max documents
})
🔄 10. Transactions in MongoDB (v4.0+)
MongoDB supports ACID transactions across multiple documents:

js
Copy
Edit
const session = db.getMongo().startSession();
session.startTransaction();

try {
  session.getDatabase("yourDB").collection("users").insertOne({ name: "Jugal" });
  session.getDatabase("yourDB").collection("orders").insertOne({ item: "Laptop" });
  session.commitTransaction();
} catch (e) {
  session.abortTransaction();
}
🧰 11. Scaling with Replication & Sharding
✅ Replication:
Ensures high availability

Automatic failover and redundancy

rs.initiate(), rs.add(), etc.

✅ Sharding:
Enables horizontal scaling

Data distributed across shards

Needs shard key + config servers



