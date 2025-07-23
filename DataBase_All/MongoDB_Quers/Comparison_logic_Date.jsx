| Category         | Operators / Features                                                  |
| ---------------- | --------------------------------------------------------------------- |
| 🟢 Comparison    | `$eq`, `$gt`, `$lt`, `$lte`, `$gte`, `$ne`, `$in`, `$nin`             |
| 🟡 Logical       | `$and`, `$or`, `$not`, `$nor`                                         |
| 🔵 Dates Extract | `$year`, `$month`, `$dayOfMonth`, `$dayOfWeek`, `$week`, `$dayOfYear` |
| 🔁 Transform     | `$dateToString`, `$dateFromString`, `$toDate`                         |
| ➕ Arithmetic     | `$add`, `$subtract`, `$dateDiff`                                      |
| 🕒 Date Update   | `$currentDate`                                                        |
| 🔍 Range Query   | `ISODate(...)`, `$gte`, `$lte`                                        |


🔁 1. COMPARISON OPERATORS

| Operator | Description                                 | Example                              |
| -------- | ------------------------------------------- | ------------------------------------ |
| `$eq`    | Equals                                      | `{ age: { $eq: 30 } }`               |
| `$ne`    | Not equals                                  | `{ color: { $ne: "red" } }`          |
| `$gt`    | Greater than                                | `{ price: { $gt: 10 } }`             |
| `$gte`   | Greater than or equal to                    | `{ score: { $gte: 90 } }`            |
| `$lt`    | Less than                                   | `{ quantity: { $lt: 100 } }`         |
| `$lte`   | Less than or equal to                       | `{ quantity: { $lte: 100 } }`        |
| `$in`    | Field matches any value in array            | `{ category: { $in: ["A", "B"] } }`  |
| `$nin`   | Field does **not** match any value in array | `{ category: { $nin: ["A", "B"] } }` |


🧠 2. LOGICAL OPERATORS

| Operator | Description                       | Example                                                                           |
| -------- | --------------------------------- | --------------------------------------------------------------------------------- |
| `$or`    | At least one condition must match | `js db.dataall.find({ $or: [ { qty: { $lte: 36 } }, { qty: { $gte: 69 } } ] }) `  |
| `$and`   | All conditions must match         | `js db.dataall.find({ $and: [ { qty: { $lte: 69 } }, { item: "mousepad" } ] }) `  |
| `$not`   | Negates the condition             | `js db.dataall.find({ qty: { $not: { $lt: 36 } } }) `                             |
| `$nor`   | None of the conditions must match | `js db.dataall.find({ $nor: [ { qty: { $lte: 36 } }, { qty: { $gte: 69 } } ] }) ` |



🗓️ 3. DATE QUERIES
🔸 Query with Date Ranges:
js
Copy
Edit
db.events.find({
  eventDate: {
    $gte: ISODate("2024-01-01"),
    $lte: ISODate("2024-12-31")
  }
})
📅 4. ADVANCED DATE OPERATORS
✅ Extract Parts from Date:

| Operator      | Description                        | Example                                                   |
| ------------- | ---------------------------------- | --------------------------------------------------------- |
| `$year`       | Extracts year                      | `{ $expr: { $eq: [{ $year: "$eventDate" }, 2024] } }`     |
| `$month`      | Extracts month                     | `{ $expr: { $eq: [{ $month: "$eventDate" }, 3] } }`       |
| `$dayOfMonth` | Extracts day of month              | `{ $expr: { $eq: [{ $dayOfMonth: "$eventDate" }, 15] } }` |
| `$dayOfWeek`  | 1 = Sunday, 7 = Saturday           | `{ $expr: { $eq: [{ $dayOfWeek: "$eventDate" }, 1] } }`   |
| `$dayOfYear`  | Day count from Jan 1st (1–365/366) | `{ $expr: { $eq: [{ $dayOfYear: "$eventDate" }, 100] } }` |
| `$week`       | Week of the year                   | `{ $expr: { $eq: [{ $week: "$eventDate" }, 12] } }`       |
