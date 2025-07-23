Q Take Your Mongodb Queries to the Next Level ?

Summary of Operators:
$regex: Searches using regular expressions (e.g., names starting with "A").
$text: Full-text search after creating a text index (e.g., searching for "youtube").
$expr: Compares fields using aggregation expressions.
$jsonSchema: Validates documents against a JSON schema.
$mod: Performs modulo operation (e.g., multiples of 4).
$where: Uses JavaScript expressions for custom queries.



✅ MongoDB Query Operators: From Beginner to Pro
🔍 1. Advanced Field Operators


| Operator      | Purpose                                                        |
| ------------- | -------------------------------------------------------------- |
| `$regex`      | Pattern matching (like `LIKE` in SQL)                          |
| `$text`       | Full-text search across one or more fields                     |
| `$expr`       | Use aggregation logic in find queries                          |
| `$jsonSchema` | Validate documents against a defined JSON schema               |
| `$mod`        | Match numbers based on modulo condition (e.g., multiples of 4) |
| `$where`      | Run custom JavaScript logic for advanced filtering             |




🧪 $regex – Regular Expression Search
js
Copy
Edit
db.users.find({ name: { $regex: /^A/ } })  // Starts with A
db.users.find({ name: { $regex: /arma$/ } }) // Ends with "arma"
db.users.find({ name: { $regex: /ug/, $options: 'i' } }) // Case-insensitive "ug"
🔎 $text – Full-Text Search
js
Copy
Edit
db.users.createIndex({ bio: "text" })
db.users.find({ $text: { $search: "youtube" } })
🔥 Note: $text only works on fields with a text index.

🧠 $expr – Use Aggregation Logic in Queries
js
Copy
Edit
db.dataall.find({ $expr: { $gt: ["$qty", "$price"] } }) // qty > price
db.products.find({ $expr: { $eq: ["$status", "$review"] } }) // status == review
📜 $jsonSchema – Schema Validation
js
Copy
Edit
db.users.find({
  $jsonSchema: {
    bsonType: "object",
    required: ["name", "age"],
    properties: {
      name: { bsonType: "string" },
      age: { bsonType: "int" }
    }
  }
})
🧮 $mod – Modulo Matching

db.dataall.find({ qty: { $mod: [4, 0] } }) // qty % 4 == 0
db.users.find({ age: { $mod: [2, 1] } })   // odd numbers only


🧑‍💻 $where – JavaScript Logic (⚠️ Slower)

db.dataall.find({
  $where: function() {
    return this.qty > this.price;
  }
})
⚠️ Avoid in production unless absolutely needed — runs JS on server.

🧺 2. Querying Arrays in MongoDB


| Operator     | Purpose                                                         |
| ------------ | --------------------------------------------------------------- |
| `$size`      | Match arrays with exact number of elements                      |
| `$all`       | Match if all specified values exist in the array                |
| `$in`        | Match if **any** value from list exists in array                |
| `$elemMatch` | Match if a **single array element** matches multiple conditions |


📏 $size – Exact Array Length
js
Copy
Edit
db.users.find({ skills: { $size: 5 } })
db.dataall.find({ experience: { $size: 3 } })
📋 $all – Must Contain All Values
js
Copy
Edit
db.students.find({ hobbies: { $all: ["jugal", "sharma"] } }) // both required
📌 $in – Any Value Match


db.students.find({ hobbies: { $in: ["jugal", "sharma"] } }) // any one
🧩 $elemMatch – Match One Array Element with Multiple Conditions


db.users.find({
  projects: {
    $elemMatch: {
      duration: { $gt: 12 },
      role: "Manager"
    }
  }
})

db.dataall.find({
  experience: {
    $elemMatch: {
      company: "Amazon",
      role: "Engineer"
    }
  }
})
💡 Bonus: Querying Nested Fields in Arrays

db.dataall.find({ "experience.company": "Amazon" }) // Match nested object field
db.students.find({ "hobbies.0": "jugal" })          // First element of array
🧠 Summary Table: When to Use Which


| ✅ **Operator** | 💡 **When to Use**                                 |
| -------------- | -------------------------------------------------- |
| `$regex`       | Partial string match (e.g., name starts with "A")  |
| `$text`        | Full-text search across fields                     |
| `$expr`        | Compare two fields dynamically                     |
| `$jsonSchema`  | Validate structure and types of documents          |
| `$mod`         | Multiples, parity checks (even/odd)                |
| `$where`       | Custom JS condition (less performant)              |
| `$size`        | Exact number of array elements                     |
| `$all`         | All values must exist in array                     |
| `$in`          | Any value match from array                         |
| `$elemMatch`   | One array element must satisfy multiple conditions |



🔧 Optional Additions You Can Explore Later


| Feature       | Description                                           |
| ------------- | ----------------------------------------------------- |
| `$not`        | Negate condition (e.g., not equal, not in array)      |
| `$exists`     | Check if a field exists                               |
| `$type`       | Check data type of a field (e.g., string, array, int) |
| `$bitsAllSet` | Bitwise operation (useful for flags)                  |


| 🧩 **Feature** | 📝 **Description**                                     | 💻 **MongoDB Shell Command Example**                                                       |
| -------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `$not`         | Negates a condition (like NOT in SQL)                  | `db.users.find({ age: { $not: { $gt: 30 } } })` – Age NOT greater than 30                  |
| `$exists`      | Checks if a field exists or not                        | `db.users.find({ middleName: { $exists: false } })` – Field does NOT exist                 |
| `$type`        | Matches fields with specific BSON type                 | `db.users.find({ age: { $type: "int" } })` – Field is of type int                          |
| `$bitsAllSet`  | Bitwise match where **all bits** in a mask must be set | `db.flags.find({ permissions: { $bitsAllSet: 6 } })` – Bits 2 and 1 are set (binary `110`) |




📘 Explanation Examples:
🔄 $not
js
Copy
Edit
// Find users NOT aged above 30
db.users.find({ age: { $not: { $gt: 30 } } })
🧩 $exists
js
Copy
Edit
// Find documents that DO NOT have the "middleName" field
db.users.find({ middleName: { $exists: false } })
📂 $type
js
Copy
Edit
// Find where the field "age" is an integer
db.users.find({ age: { $type: "int" } })

// Use BSON numbers too
// 2 = string, 3 = object, 4 = array, 16 = int32, 18 = int64
db.users.find({ skills: { $type: 4 } }) // Field is an array
🧠 $bitsAllSet
js
Copy
Edit
// Bit mask: find docs where permissions has BOTH bit 2 and 1 set
// 6 = 110 (bit 2 and 1)
db.flags.find({ permissions: { $bitsAllSet: 6 } })
Useful for systems with binary flags, like user permissions or settings.