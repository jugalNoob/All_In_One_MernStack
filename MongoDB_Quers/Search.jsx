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

