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




1:: All Find Operation  In MongoDB................. ::::::::::::::::::::::::::

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



5::: select column in MongoDB .................

db.stsudent.find({} , {name:1 , _id:0)} // only show name and remove id  .. 1 mean show and 0 mean remove 



Q What us MongodDb Element Query operation ? .......................>

db.dataall.find({ item: { $exists: true } }) /// check user it true

db.dataall.find({ item: { $exists: true , $type:"string" } }) //type show only tring dataTyees



6::: is MongoDb really Schemales ? .....................



7::DataTypes of Mongodb  ? ................................

Number :: insteger32 or numberLong64  or NumberDecimal 



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




DataTypes in Mongoes ::DB:::::::::::::::::::::::::::::::::::::::::::::::::

....String: Stores textual data. Example: "Hello, MongoDB!"

I...nteger: Represents whole numbers. Example: 42

..Double: Stores floating-point numbers. Example: 3.14

...Boolean: Represents true or false values.

...ObjectId: A unique identifier for each document, typically created automatically by MongoDB when a document is inserted.

...Date: Stores dates and timestamps. Example: ISODate("2023-11-27T08:30:00Z")

...Array: Holds an ordered list of values. Example: ["apple", "banana", "orange"]

...Object: Stores embedded documents. Example: {"name": "John", "age": 30}

...Null: Represents a null value.

....Binary data: Stores binary data.

....Regular Expression: Stores regular expression patterns
