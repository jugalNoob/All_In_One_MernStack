1. Introduction to MongoDB
What is MongoDB?
NoSQL, document-oriented database.
Stores data in flexible, JSON-like documents.
Comparison with SQL Databases
Schema-less vs. predefined schemas.
Collections vs. tables.
Documents vs. rows.

2. Core MongoDB Concepts
Database: Container for collections.
Collections: Groups of documents, akin to tables in SQL.
Documents: JSON-like records (BSON format).
Fields: Key-value pairs in a document.
Indexes: Structures to optimize query performance.
Replica Set: A group of MongoDB servers that maintain the same data set.
Sharding: Horizontal partitioning of data across servers.


3. Data Modeling in MongoDB
Document Model: Embedded documents and arrays.
Denormalization: Favor embedding documents over references to avoid JOINs.
Schema Design Patterns:
Embedding vs. Referencing.
Bucket Pattern, Attribute Pattern, and Polymorphic Schemas.


4. CRUD Operations
Create:
insertOne(): Inserts a single document.
insertMany(): Inserts multiple documents.

Read:
find(): Retrieves documents from a collection.
Query Filters: Equality, comparison operators ($eq, $gt, $lt), logical operators ($or, $and), and regex.

Update:
updateOne(), updateMany(): Modify documents.
$set, $inc, $unset update operators.
Upserts (update or insert).

Delete:
deleteOne(), deleteMany(): Remove documents.
Projections: Limiting fields returned by a query.
Sorting and Pagination: Using .sort() and .limit().


5. Indexes
Purpose: Speed up read queries.
Types of Indexes:
Single field index.
Compound index.
Multikey index (for arrays).
Text index (for text search).
Geospatial index.
Index Operations: createIndex(), dropIndex().
Indexing Best Practices: Only index fields used frequently in queries.


6. Aggregation Framework
Purpose: Advanced querying and data processing.
Stages in Aggregation Pipeline:
$match: Filters documents.
$group: Groups documents and performs operations like sum, avg.
$project: Reshapes documents.
$sort, $skip, $limit: Sorting and pagination.
$lookup: Joins collections (similar to SQL joins).
$unwind: Deconstructs arrays.


7. Replication
What is Replication?
High availability, disaster recovery.
Replica Sets:
Primary: Handles all write operations.
Secondaries: Replicate data from primary.
Arbiter: Participates in election but does not hold data.
Failover: Automatic election of a new primary in case of failure.


8. Sharding
What is Sharding?
Distributes data across multiple servers for horizontal scaling.
Shard Keys: Determines how data is partitioned.
Sharded Cluster:
Config Servers: Store metadata.
Shards: Actual data storage.
Query Router (mongos): Routes queries to appropriate shards.
Balancing: Redistributes data between shards automatically.


9. Transactions in MongoDB
Single Document Atomicity: MongoDB guarantees atomicity at the document level.
Multi-Document Transactions (Introduced in version 4.0):
Support for ACID transactions.
startTransaction(), commitTransaction(), abortTransaction().


10. MongoDB Performance Tuning
Schema Design Optimization: Denormalization, embedding documents.
Index Optimization: Proper index usage.
Query Optimization: Analyze using explain().
Read/Write Scaling:
Replication for read scaling.
Sharding for write scaling.



11. MongoDB Security
Authentication: Ensuring users are who they claim to be (SCRAM, x.509).
Authorization: Role-based access control (RBAC).
Encryption:
In-transit encryption (SSL/TLS).
Encryption at rest (with MongoDB Enterprise).
Auditing: Tracking and recording database events.
Backup and Restore: Using mongodump, mongorestore, and point-in-time backups.


12. MongoDB Backup and Restore
Backup Strategies:
Logical Backup: Using mongodump and mongorestore.
Physical Backup: Snapshot-based backups.
Cloud Backups: Managed MongoDB services (MongoDB Atlas) provide automated backups.
Restoring Data: Procedures for recovering data from backups.


13. MongoDB Tools
Mongo Shell: The interactive JavaScript interface.
MongoDB Compass: GUI for exploring and managing data.
mongodump and mongorestore: Tools for backing up and restoring.
mongoimport and mongoexport: Importing and exporting data in JSON/CSV.
mongostat and mongotop: Monitoring tools.


14. MongoDB Atlas
What is MongoDB Atlas?: Fully managed cloud database service.
Cluster Management: Scaling, monitoring, and backups.
Global Clusters: Data distribution across multiple geographic regions.
Serverless Instances: Automatically scales resources based on workload.


15. MongoDB Drivers and Integrations
Official Drivers: Available for many languages (Node.js, Python, Java, Go, etc.).
ODM/ORM:
Mongoose for Node.js.
PyMongo for Python.
Integration with Big Data Tools:
Spark Connector, Hadoop Integration.


16. Advanced MongoDB Features
GridFS: For storing large files (exceeding BSON document size limit of 16MB).
TTL Indexes: Automatically expire data.
Change Streams: Track changes to documents in real-time.
Capped Collections: Fixed-size collections that automatically overwrite oldest entries.
Time Series Collections: Optimized for time-series data.


17. MongoDB Cloud and Deployment
MongoDB Atlas: Cloud-hosted MongoDB.
Self-hosting MongoDB: Installation and configuration on various platforms.
Backup and Monitoring Services: Cloud monitoring, alerts, and performance analysis.


18. Best Practices
Schema Design: Favor embedding over referencing when possible.
Indexing: Only index frequently queried fields.
Sharding Considerations: Use a good shard key to avoid uneven distribution.
Monitoring: Use monitoring tools (Atlas, mongostat, mongotop) to track performance.


19. Version-Specific Features
MongoDB 4.x: Introduction of ACID transactions, retryable writes, etc.
MongoDB 5.x: Time-series collections, live resharding, and versioned API.


::::::::::::::::::::::::::::::::::::::::::::::: MongoDB playList ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

....... CRUD Operation :::::::::::::::::::


00:Mongose db DataTypes all ..............................
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,                    // String data type
  age: Number,                     // Number data type
  email: { type: String, unique: true },  // String with unique constraint
  isVerified: Boolean,             // Boolean data type
  createdAt: { type: Date, default: Date.now }, // Date with default value
  profilePicture: Buffer,          // Buffer data type for storing images
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], // ObjectId referencing another model
  meta: mongoose.Schema.Types.Mixed, // Mixed data type for dynamic content
  balance: mongoose.Schema.Types.Decimal128,  // High-precision numbers
  preferences: {                   // Map data type for key-value pairs
    type: Map,
    of: String
  }
});

const User = mongoose.model('User', userSchema);




1:: All Find Operation  In MongoDB.................

..Find all user
 db.dataall.find()
 db.dataall.find({qty:69})
db.dataall.find({qty:{$lte:36}}) // less then 36 show user adata
db.dataall.find().count() // number documents count
db.dataall.find().limit(3)
db.dataall.find({qty:{$gt:36}}) // Greater then 36 show user adata
db.dataall.find({qty:{$gt:36 , $lte:69}}) //less and greater 36 and 69
db.dataall.find().toArray() //show all elemnt
db.collectionName.find().pretty();
db.dataall.find({} , {name:1 , _id:0}) // only all name and remove all id

db.dataall.find().sort()({age:1 , name:1}) -- > asnding check  same and sort
db.dataall.find().sort()({age:-1}) -- > dsending
db.dataall.find().sort({age:1 , name:1}).forEach(x=>printjson(x)) // show all data 
db.dataall.find().sort()({age:1 , name:1}).skip(10) ///skip mena (10) man 
db.posts.find({}, {_id: 0, title: 1, date: 1})
db.dataall.findOne().name
db.dataall.findOne().isFunded
db.dataall.findOne().foundedOn
db.dataall.findOne().foundedoneTimeStamp

var cursor = db.users.find({ roll_no: { $gt: 30 } });
var dataSize = cursor.dataSize();
db.users.dataSize({})
db.users.totalSize()
db.users.storageSize()
db.users.totalIndexSize()
///
one:{
  [true , false]
}

db.dataall.find({'identy.hashADHARcARD:TRUE'})
//
....FindOne // check one User
...db.dataall.findOne({qty:69})


2:::: Insert  and insertMany ......................................


 db.dataall.insertOne({
  item: 'canvas',
  qty: 100,
  tags: ['cotton'],
  size: { h: 28, w: 35.5, uom: 'cm' }
});

////insertMany|||||||||||||||||||

db.clloectyy.insertMany([{_id:"A" , name:"jugal"},{_id:"b" , name:"kinka"}] , {ordered:false}) ///!SECTION

 db.collection.insertMany([
  {
    item: 'canvas',
    qty: 100,
    size: { h: 28, w: 35.5, uom: 'cm' },
    status: 'A'
  },
  {
    item: 'journal',
    qty: 25,
    size: { h: 14, w: 21, uom: 'cm' },
    status: 'A'
  },
  {
    item: 'mat',
    qty: 85,
    size: { h: 27.9, w: 35.5, uom: 'cm' },
    status: 'A'
  },

]);

Q order Option in Insert command in Mongodb ?

db.clloectyy.insertMany([{_id:"A" , name:"jugal"},{_id:"b" , name:"kinka"}] , {ordered:false}) ///!SECTION




3::::::: UpdateOne and UpdateMany .....................

2:::UpdateOne
db.dataall.updateOne({item:"mat"},{$set:{qty:0012}}) ///update qty 0012


3:::UpdateMany

db.dataall.updateMany({qty:25} , {$set:{qty:69}})///qty is 25 what update qty :69

db.dataall.updateMany({qty:{$gte:14}} , {$set:{isEligible:true}}) // add nuw Data and $get is graten then 14


|||||||||Update Advance ||||||||||

$inc
db.dataall.updateMany({} , {$inc:{qty:2}}) //$inc inment your age --> 20 $inc 22
db.dataall.updateMany({} , {$inc:{qty:2}}) //$inc inment your age --> 20 $inc 18


$min::db.dataall.updateMany({item:"jugal"} , {$min:{qty:30}})
$max::db.dataall.updateMany({item:"karan"} , {$max:{qty:30}})

...$mul //multiply
db.dataall.updateOne({item:"mouspad"} , {$mul:{qty:2}}) // 2 is multiply 

...$unset
db.dataall.updateOne({item:"mouspad"} , {$mul:{qty:2}}) ///remover qty 

...rename
db.dataall.updateOne({qty:87} , {$rename:{item:"jugtalsharma"}})
qty
87
jugtalsharma
"mat"
db.dataall.updateOne({} , {$rename:{item:"jugtalsharma"}}) // all user chaing

...$upset
db.dataall.updateOne({name:"coulu"} , {$set:{age:100}} , {upsert:true}) // name "coulu"in show and 

add upsert insert data 


|||||||||||Array  Update ||||||||
db.users.updateMany(
   { name: "amit" },
   { $push: { hobbies: ["youtuber" , "movies"] } }  //add new array  in name amit
)


db.users.updateMany(
   { name: "amit" },
   { $addToSet: { hobbies: ["youtuber" , "movies"] } }
) ///// same value not Push 


db.users.updateMany(
   { name: "amit" },
   { $pull: { hobbies: ["youtuber" , "movies"] } }
) ////Remove this array

db.users.updateMany(
   { name: "amit" },
   { $pop: { hobbies: 1 } } // last arrays delete  -1 first array delete
) ////Remove this array



4::: DeleteOne and DeleteMany .......................

..DeleteOne

db.dataall.deleteOne({item:"canvas"})


...DeleteMany

db.dataall.deleteMany({qty:10})


....DeleteAll 

db.dataall.deleteMany({}) // delteAllUser



5::: select column in MongoDB .................

db.stsudent.find({} , {name:1 , _id:0)} // only show name and remove id  .. 1 mean show and 0 mean remove 


6::: is MongoDb really Schemales ? .....................


7::DataTypes of Mongodb  ? ................................

Number :: insteger32 or numberLong64  or NumberDecimal 


8::: how to delete database in Monhodb ? .....................

1::show dbs
2::use Ones
3::db.alldata.find()
db.users.countDocuments()
db.createCollection("newUser")
db.url.renameCollection("fuckOf")
db.users.deleteMany({}) //  all uses deletes 
//Delete collection

db.dataall.drop()
db.users.getFullName()
ones.users

|||||||collection||||||||
db.dataall.drop()
db.users.getFullName()
db.users.countDocuments()
db.createCollection("newUser")
db.url.renameCollection("Of")
db.newUser.remove({ name: "John" })


mongodb+srv://jugal786:jugal786@cluster0.sgg8t.mongodb.net/ones?retryWrites=true&w=majority


9::: Schema Validation in Mongodb ? .....................................

db.createCollection("newUser" , {
validator:{

$jsonSechema:{

required:['name', 'price'],  ///name and price is required and you add more info
properties:{

name:{
bsonTypes:"string",
description:"must be a string and required"
},

price:{
bsonTypes:"number",
description:"must be a numeber and required"
}
}
}
},validationAction :"error"
})

db.stsudent.insert({name:"way of man" , price:300.10")}

// remove validation mean change .......

db.runcommand({

colMod:"student", // collection name

validator:{

$jsonSechema:{

required:['name', 'price'],  ///name and price is required and you add more info
properties:{

name:{
bsonTypes:"string",
description:"must be a string and required"
},

price:{
bsonTypes:"number",
description:"must be a numeber and required"
}
}
}
},
)}


Q write concern in Mongodb  ?  ----- >Important 

db.ststudent.insertOne({name:"B" ,price:2}  , writeConcren:{w:0}}) // w:1 true or w:0 False

db.ststudent.insertOne({name:"B" ,price:2}  , writeConcren:{w:0 , j:true}}) // j:true deafulte

db.ststudent.insertOne({name:"B" ,price:2}  , writeConcren:{w:0 , j:true , wtimeout:1000}}) //


Q Atomicity in MongoDB ?   ..................

QComparison operator in Mongodb ..................>> Important 
$eq
$gt
$lt
$lte
$in
$nin
$gte
$ne
// Find documents where the "age" field is equal to 30.
{ age: { $eq: 30 } }

// Find documents where the "price" field is greater than 10.
{ price: { $gt: 10 } }

// Find documents where the "quantity" field is less than 100.
{ quantity: { $lt: 100 } }

// Find documents where the "quantity" field is less than or equal to 100.
{ quantity: { $lte: 100 } }

// Find documents where the "score" field is greater than or equal to 90.
{ score: { $gte: 90 } }

// Find documents where the "category" field is in ["A", "B"].
{ category: { $in: ["A", "B"] } }

// Find documents where the "category" field is neither "A" nor "B".
{ category: { $nin: ["A", "B"] } }

// Find documents where the "color" field is not equal to "red".
{ color: { $ne: "red" } }
This covers a variety of use cases with common MongoDB operators like $eq, $gt, $lt, $lte, $gte, $in, $nin, and $ne.


Q Logical Operator in Mongodb> .................. >>> ?


Here are the examples using MongoDB's logical operators ($not, $or, $and, $nor) with a detailed explanation:

1. $or Operator
The $or operator matches documents where at least one of the conditions is true.

js
Copy code
// Find documents where "qty" is less than or equal to 36 OR greater than or equal to 69.
db.dataall.find({
  $or: [
    { qty: { $lte: 36 } },
    { qty: { $gte: 69 } }
  ]
})



2. $nor Operator
The $nor operator matches documents where none of the conditions are true. It is the negation of $or.

js
Copy code
// Find documents where "qty" is neither less than or equal to 36 NOR greater than or equal to 69.
db.dataall.find({
  $nor: [
    { qty: { $lte: 36 } },
    { qty: { $gte: 69 } }
  ]
})


3. $and Operator
The $and operator matches documents where all the conditions are true.

js
Copy code
// Find documents where "qty" is less than or equal to 69 AND "item" is "mousepad".
db.dataall.find({
  $and: [
    { qty: { $lte: 69 } },
    { item: "mousepad" }
  ]
})


4. $not Operator
The $not operator inverts the result of another operator, matching documents where the condition is not true.

js
Copy code
// Find documents where "qty" is NOT less than 36.
db.dataall.find({
  qty: { $not: { $lt: 36 } }
})


Example Summarized:
$or: Matches if qty ≤ 36 or qty ≥ 69.
$nor: Matches if qty is neither ≤ 36 nor ≥ 69.
$and: Matches if qty ≤ 69 and the item is "mousepad".
$not: Matches if qty is not less than 36.


Q What us MongodDb Element Query operation ? .......................>

db.dataall.find({ item: { $exists: true } }) /// check user it true

db.dataall.find({ item: { $exists: true , $type:"string" } }) //type show only tring dataTyees



Q Take Your Mongodb Queries to the Next Level ?

Summary of Operators:
$regex: Searches using regular expressions (e.g., names starting with "A").
$text: Full-text search after creating a text index (e.g., searching for "youtube").
$expr: Compares fields using aggregation expressions.
$jsonSchema: Validates documents against a JSON schema.
$mod: Performs modulo operation (e.g., multiples of 4).
$where: Uses JavaScript expressions for custom queries.

1. $regex Operator
The $regex operator allows you to perform regular expression searches.

js
Copy code
// Find documents where the "name" field starts with the letter "A".
db.users.find({
  name: { $regex: /^A/ }
})



2. $text and $search
The $text operator is used for full-text search, which can be performed on fields that are indexed with the text index.
js
Copy code
// Create a text index on the "bio" field.
db.users.createIndex({ bio: "text" })

// Find documents where the "bio" field contains the word "youtube".
db.users.find({
  $text: { $search: "youtube" }
})

// Another example to find documents in a different collection where the text field contains "youtube".
db.dataall.find({
  $text: { $search: "youtube" }
})



3. $expr Operator
The $expr operator allows the use of aggregation expressions within the query language.

// Find documents where the "qty" field is greater than the "price" field.
db.dataall.find({
  $expr: { $gt: ["$qty", "$price"] }
})


4. $jsonSchema Operator
The $jsonSchema operator validates documents against a JSON Schema.

js
Copy code
// Find documents where the "name" is a string and "age" is a number.
db.users.find({
  $jsonSchema: {
    bsonType: "object",
    required: ["name", "age"],
    properties: {
      name: {
        bsonType: "string"
      },
      age: {
        bsonType: "int"
      }
    }
  }
})


5. $mod Operator
The $mod operator is used to perform modulo operation on a field’s value.

js
Copy code
// Find documents where the "qty" field divided by 4 leaves a remainder of 0 (i.e., multiples of 4).
db.dataall.find({
  qty: { $mod: [4, 0] }
})


6. $where Operator
The $where operator allows you to use JavaScript expressions to query documents.

js
Copy code
// Find documents where the "qty" field is greater than the "price" field using JavaScript.
db.dataall.find({
  $where: function() {
    return this.qty > this.price;
  }
})






..$regex is regular 

db.users.find({name:{$regex:/^A/}}) // check start letter A 


...$search
// ^ means first character of name
db.users.createIndex({bio:"text"}) // first create
db.users.find({$text:{$search:"youtube"}}) // second use This

db.dataall.find({ $text: { $search: "youtube" } })



Q from Beginner to pro: Querying Array in MongoDb ? ..............................>>

$size
$all
$in
$elemMatch 

1. $size Operator
The $size operator matches documents where an array field has a specific number of elements.

js
Copy code
// Find one document where the "experience" array has exactly 3 elements.
db.dataall.findOne({
  experience: { $size: 3 }
})


2. $all Operator
The $all operator matches documents where an array field contains all the specified elements.

js
Copy code
// Find students who have both "jugal" and "sharma" in their "hobbies" array.
db.students.find({
  hobbies: { $all: ['jugal', 'sharma'] }
})


3. $in Operator
The $in operator matches documents where a field’s value is in a specified array.

js
Copy code
// Find students who have either "jugal" or "sharma" in their "hobbies" array.
db.students.find({
  hobbies: { $in: ['jugal', 'sharma'] }
})


4. $elemMatch Operator
The $elemMatch operator is used when you need to match one or more conditions on the same element of an array.

js
Copy code
// Find documents where the "experience" array contains an object with the company "Amazon" and the role "Engineer".
db.dataall.find({
  experience: { 
    $elemMatch: { 
      company: "Amazon", 
      role: "Engineer" 
    }
  }
})


$size:

js
Copy code
// Find one document where the "skills" array has exactly 5 elements.
db.users.findOne({
  skills: { $size: 5 }
})
$all:

js
Copy code
// Find students who have all the specified courses in their "courses" array.
db.students.find({
  courses: { $all: ['math', 'science'] }
})
$in:

js
Copy code
// Find documents where the "tags" array contains either "tech" or "sports".
db.articles.find({
  tags: { $in: ['tech', 'sports'] }
})
$elemMatch:

js
Copy code
// Find users where one of the "projects" they worked on has a "duration" of more than 12 months and the "role" is "Manager".
db.users.find({
  projects: { 
    $elemMatch: { 
      duration: { $gt: 12 }, 
      role: "Manager" 
    }
  }
})




db.dataall.findOne({"experience.company":"Amazon"}
db.dataall.findOne({experience:{$size:3}}) // how user experience work in company and check size

...$all
db.students.find({hobbies: {$all:['jugal','sharma']}}) // all meaning is jugal sharma both is true

..$in 
db.students.find({hobbies: {$in:['jugal','sharma']}}) // all meaning is jugal sharma both is not  true


Summary of Operators:
$size: Matches arrays with a specific number of elements.
$all: Matches arrays containing all specified elements.
$in: Matches if any of the specified elements are present in the field.
$elemMatch: Matches if a single element in an array satisfies multiple conditions.



Q what is Master MongoDb indexing in one Video ?  ---------------------------->>


Q what  master Aggregation?  ....................................>Master 

$group
$sum
$avg
$min
$max
$backut
$join Collection
$project 


Q ...$Capped collection  ................................<><><><><><>
db.createCollection("man", { capped: true, max: 4, size: 1000000 })

Q Mongodb Replication & Sharding Scaling like a Pro ??  ---------------->> Important 


Q Transaction In Mongodb ? ................. Important 

Ans:: A transcation is a set of operation that are executed as a single , atomic unit 
9. Transactions in MongoDB
Single Document Atomicity: MongoDB guarantees atomicity at the document level.
Multi-Document Transactions (Introduced in version 4.0):
Support for ACID transactions.
startTransaction(), commitTransaction(), abortTransaction()



Q Advanced Date Queries  in MongoDb ? ......................>>Impotant  

$year 
$month 
$dateString
1. $year, $month, $dayOfMonth, $hour, $minute, $second
Important MongoDB Date Operators Overview:
$year / $month / $dayOfMonth: Extracts the year, month, or day from a date.
$dateToString: Formats a date as a string.
$dateFromString: Converts a date string back to a date object.
$add / $subtract: Adds or subtracts time from a date.
$dayOfWeek / $week: Extracts the day of the week or week number from a date.
$dateDiff: Computes the difference between two dates.
$currentDate: Updates a field to the current date.


1. $year, $month, $dayOfMonth, $hour, $minute, $second
These operators allow you to extract specific components from a date.

Examples:
js
Copy code
// Find documents where the year is 2024.
db.events.find({
  $expr: { $eq: [{ $year: "$eventDate" }, 2024] }
})

// Find documents where the event happened in March (3rd month).
db.events.find({
  $expr: { $eq: [{ $month: "$eventDate" }, 3] }
})

// Find documents where the event happened on the 15th day of the month.
db.events.find({
  $expr: { $eq: [{ $dayOfMonth: "$eventDate" }, 15] }
})
2. $dateToString
The $dateToString operator converts a date object to a string in a specified format. It's often used in the $project or $group stage of the aggregation pipeline.

Example:
js
Copy code
// Format the "eventDate" field into "YYYY-MM-DD" format.
db.events.aggregate([
  {
    $project: {
      eventDateString: {
        $dateToString: { format: "%Y-%m-%d", date: "$eventDate" }
      }
    }
  }
])
In this case, the eventDateString will be formatted as a string like "2024-09-01".

3. $dateFromString
This operator converts a date string into a Date object.

Example:
js
Copy code
// Convert a string in "YYYY-MM-DD" format back into a date object.
db.events.aggregate([
  {
    $project: {
      actualDate: {
        $dateFromString: { dateString: "2024-09-01" }
      }
    }
  }
])
Here, the actualDate field will contain the MongoDB ISODate("2024-09-01T00:00:00Z") object.

4. $add / $subtract (Add/Subtract Time)
You can use $add or $subtract to perform date arithmetic, such as adding or subtracting a certain number of days, months, etc.

Example:
js
Copy code
// Add 30 days to the "eventDate".
db.events.aggregate([
  {
    $project: {
      newDate: { $add: ["$eventDate", 30 * 24 * 60 * 60 * 1000] }  // Add 30 days in milliseconds
    }
  }
])

// Subtract 7 days from the "eventDate".
db.events.aggregate([
  {
    $project: {
      earlierDate: { $subtract: ["$eventDate", 7 * 24 * 60 * 60 * 1000] }  // Subtract 7 days in milliseconds
    }
  }
])
5. $week, $dayOfWeek, $isoWeek
These operators help in querying based on the week of the year or day of the week.

Examples:
js
Copy code
// Find events that happened in the 12th week of the year.
db.events.find({
  $expr: { $eq: [{ $week: "$eventDate" }, 12] }
})

// Find events that happened on a Sunday (1st day of the week).
db.events.find({
  $expr: { $eq: [{ $dayOfWeek: "$eventDate" }, 1] }
})
6. $dateDiff
The $dateDiff operator allows you to calculate the difference between two dates in various units such as days, months, or years.

Example:
js
Copy code
// Calculate the difference between "startDate" and "endDate" in days.
db.events.aggregate([
  {
    $project: {
      daysDifference: {
        $dateDiff: {
          startDate: "$startDate",
          endDate: "$endDate",
          unit: "day"
        }
      }
    }
  }
])
7. $dayOfYear
This operator extracts the day of the year from a date (i.e., a number between 1 and 365/366).

Example:
js
Copy code
// Find documents where the event happened on the 100th day of the year.
db.events.find({
  $expr: { $eq: [{ $dayOfYear: "$eventDate" }, 100] }
})
8. $toDate
The $toDate operator converts a string, number, or object to a MongoDB Date.

Example:
js
Copy code
// Convert a timestamp to a date object.
db.events.aggregate([
  {
    $project: {
      eventDate: { $toDate: "$timestamp" }
    }
  }
])
9. $currentDate
The $currentDate operator can be used to set the value of a field to the current date.

Example:
js
Copy code
// Update the "lastModified" field to the current date.
db.events.updateMany(
  { status: "active" },
  { $currentDate: { lastModified: true } }
)
10. Querying with Date Ranges
You can directly query date fields using comparison operators such as $gte, $lte, $gt, $lt.

Example:
js
Copy code
// Find documents where the "eventDate" is between January 1, 2024, and December 31, 2024.
db.events.find({
  eventDate: {
    $gte: ISODate("2024-01-01"),
    $lte: ISODate("2024-12-31")
  }
})
Complete Example: Aggregation with Date Fields
This example combines some of the above operators to create a comprehensive aggregation query.

js
Copy code
db.events.aggregate([
  // Filter for events that happened after 2020.
  { $match: { eventDate: { $gte: ISODate("2020-01-01") } } },

  // Add a new field "eventYear" to store the year of the event.
  { $project: { eventYear: { $year: "$eventDate" } } },

  // Group by eventYear and count the number of events in each year.
  { $group: { _id: "$eventYear", eventCount: { $sum: 1 } } },

  // Sort by the year in ascending order.
  { $sort: { _id: 1 } }
])