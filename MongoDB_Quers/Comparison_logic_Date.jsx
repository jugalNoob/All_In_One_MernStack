
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


::::::::::::::::: Date and Time series >>>>>>>>>>>>


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