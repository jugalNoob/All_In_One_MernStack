Q what  master Aggregation?  ....................................>Master 

$group
$sum
$avg
$min
$max
$backut
$join Collection
$project 




Aggregation to write query 

$group $limit $project $sort $match $addField $count $lookup $out


1::DB.collection.Aggregation(pipeline , option)

...$match
db.users.aggregate([{$match:{gender:"female"}}]) //check gender with match


...$group 
db.users.aggregate([{$group:{ }}] )
db.users.aggregate([{$group:{_id:"$roll_no" }}] )
db.users.aggregate([{$group:{_id:"$roll_no" , namee:{$push:"$name"}}}] ) // with age and name

db.users.aggregate([{$group:{_id:"$roll_no" , namee:{$push:"$$ROOT"}}}] )///!SECTION
is show differnt side  AGE is show full document $$ROOT  and namee is show your users


db.users.aggregate([
  {$match: {
      gender: "male"
    }
  },
  {$group: {
      _id: "$roll_no",
      countOfTeacher: {
        $sum: 1
      }
    }
  }
])

...$unwind
db.users.aggregate([{{$unwind:"Hobbies"},$group:{_id:"$roll_no",subject:{$push:"$subject"}}}])


...$count
db.users.aggregate([
  {
    $match: {
      gender: "male"
    }
  },
  {
    $count: "femaleCount"
  }
])  // count user how many male in your document



 ....$limit
 db.users.aggregate([
  {
    $match: {
      gender: "male" // Replace "male" with the desired value for gender filtering
    }
  },
  {
    $limit: 2 // Replace 10 with the desired number of documents to limit to
  }
])


...$filter



|||||Bucket Aggregation||||||||||||

Ans::When you want 

convert to grouping 

db.users.aggregate([
  { $match: {
      gender: "male"
    }
{ 
    $sort: { "accommodates": -1 } 
  },
  },
  {
    $bucket: {
      groupBy: "$roll_no",
      boundaries: [0, 50, 90,], // Define the boundaries for your custom buckets
      default: "greater than 100 wala group",
      output: {
        count: { $sum: 1 },names:{$push:"name"}
      }
    }
  }
])


...$Projects

db.users.aggregate([{$project:{ _id:0}}]).pretty() //remove id   

db.users.aggregate([{$project:{ _id:0,name:1 }}]).pretty()  // 0 mean is remove and 1 mean is show
db.users.aggregate([{$project:{ _id:1,name:0 }}]).pretty()  //id show and name is remove


db.posts.aggregate([
  // Stage 1: Only find documents that have more than 1 like
  {
    $match: { likes: { $gt: 1 } }
  },
  // Stage 2: Group documents by category and sum each categories likes
  {
    $group: { _id: "$category", totalLikes: { $sum: "$likes" } }
  }
])



///////LookUp Aggregation LookUp

db.comments.aggregate([
  {
    $lookup: {
      from: "movies",
      localField: "movie_id",
      foreignField: "_id",
      as: "movie_details",
    },
  },
  {
    $limit: 1
  }
])

db.yourCollection.aggregate([
  {
    $match: {
      "identity.hashPanCard": false,
      "identity.hashAdhaarCard": true
    }
  }
]);


:::::::::: ..................>>>  .....................................................:::>>>>>>>>>>>>>>



Aggregation Stages and Operators:
1. $match (Filter Documents)
Filters the documents to pass only those that match the given condition to the next stage.
Similar to the find method but more efficient as it's part of the aggregation pipeline.
Example:

js
Copy code
db.orders.aggregate([
  { $match: { status: "shipped" } }  // Only process documents with "shipped" status
])
2. $group (Group Documents)
Groups documents by a specified field and allows you to calculate aggregates (sum, average, etc.) for each group.
Example:

js
Copy code
db.orders.aggregate([
  { $group: { _id: "$customerId", totalAmount: { $sum: "$amount" } } }
])
3. $project (Reshape Documents)
Reshapes each document by including, excluding, or adding new fields.
Example:

js
Copy code
db.users.aggregate([
  { $project: { name: 1, yearOfBirth: { $subtract: [2024, "$age"] } } }  // Add calculated field "yearOfBirth"
])
4. $sort (Sort Documents)
Sorts the documents by one or more fields.
Example:

js
Copy code
db.orders.aggregate([
  { $sort: { orderDate: -1 } }  // Sort orders by date in descending order
])
5. $limit and $skip (Limit and Skip Results)
$limit: Limits the number of documents passed to the next stage.
$skip: Skips over a specified number of documents.
Example:

js
Copy code
db.orders.aggregate([
  { $sort: { orderDate: -1 } },
  { $limit: 10 },  // Only return the top 10 recent orders
  { $skip: 5 }  // Skip the first 5 documents
])
6. $unwind (Deconstruct Arrays)
Deconstructs an array field into multiple documents, one for each element.
Example:

js
Copy code
db.users.aggregate([
  { $unwind: "$hobbies" }  // Each document will represent one hobby from the array
])
7. $lookup (Join Collections)
Performs a left outer join with another collection.
Example:

js
Copy code
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",  // Join with "customers" collection
      localField: "customerId",  // Match "customerId" from "orders"
      foreignField: "_id",  // with "_id" from "customers"
      as: "customerInfo"
    }
  }
])
8. $addFields (Add or Modify Fields)
Adds new fields or modifies existing ones within the pipeline.
Example:

js
Copy code
db.users.aggregate([
  { $addFields: { fullName: { $concat: ["$firstName", " ", "$lastName"] } } }
])
9. $out (Write to a Collection)
Writes the results of the aggregation to a new or existing collection.
Example:

js
Copy code
db.orders.aggregate([
  { $match: { status: "complete" } },
  { $out: "completedOrders" }  // Write results to "completedOrders" collection
])
10. $count (Count Documents)
Counts the number of documents passing through the pipeline.
Example:

js
Copy code
db.orders.aggregate([
  { $match: { status: "shipped" } },
  { $count: "shippedOrders" }  // Returns the count of shipped orders
])
Other Important Aggregation Operators:
- $sum: Adds up values.
js
Copy code
{ $group: { _id: "$category", totalSales: { $sum: "$sales" } } }
- $avg: Calculates the average of values.
js
Copy code
{ $group: { _id: "$category", avgPrice: { $avg: "$price" } } }
- $min and $max: Returns the minimum or maximum value.
js
Copy code
{ $group: { _id: "$category", minPrice: { $min: "$price" }, maxPrice: { $max: "$price" } } }
- $first and $last: Returns the first or last value in a group.
js
Copy code
{ $group: { _id: "$category", firstOrder: { $first: "$orderDate" } } }
- $merge: Writes aggregation results to a collection, updating existing documents or inserting new ones.
Common Use Cases for Aggregation:
Data summarization: Summarizing large datasets (e.g., total sales per category).
Reporting: Generating reports like top products, revenue by region, etc.
Data transformation: Changing the shape of the data (e.g., renaming fields or calculating new fields).
Joining collections: Combining data from multiple collections.
Data filtering: Applying complex filters to retrieve specific documents.
Best Practices for Aggregation:
Optimize $match early: Place the $match stage early in the pipeline to reduce the number of documents processed in later stages.
Indexes: Ensure proper indexing for fields used in the aggregation stages, especially $match.
Limit data with $project: Use $project to include only necessary fields, reducing memory usage.
Aggregation performance: Monitor and optimize pipelines that process a large number of documents.








||||Improtant Roe class

...$Capped collection
db.createCollection("man", { capped: true, max: 4, size: 1000000 })