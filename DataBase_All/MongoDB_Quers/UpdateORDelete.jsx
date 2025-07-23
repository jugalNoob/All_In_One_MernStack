ChatGPT said:
You're doing great, Jugal! Here's a cleaned-up, corrected, and well-organized guide to:

✅ updateOne() / updateMany()

✅ Advanced update operators ($inc, $min, $max, $mul, $unset, $rename, $upsert)

✅ Array updates ($push, $addToSet, $pull, $pop)

✅ deleteOne() / deleteMany()

✅ 🚀 Correct syntax fixes + added edge-case tips



✅ MongoDB Update & Delete Commands – Complete Guide
🔧 1. updateOne() and updateMany()
✅ updateOne()

db.dataall.updateOne(
  { item: "mat" },
  { $set: { qty: 12 } }
)



db.dataall.updateMany(
  { qty: 25 },
  { $set: { qty: 69 } }
)

db.dataall.updateMany(
  { qty: { $gte: 14 } },
  { $set: { isEligible: true } }
)


⚙️ 2. Advanced Update Operators
🔼 $inc – Increment
js
Copy
Edit
db.dataall.updateMany({}, { $inc: { qty: 2 } })  // Increase qty by 2
🔽 $min – Only update if lower
js
Copy
Edit
db.dataall.updateMany(
  { item: "jugal" },
  { $min: { qty: 30 } }  // Only updates if qty > 30
)
🔼 $max – Only update if higher
js
Copy
Edit
db.dataall.updateMany(
  { item: "karan" },
  { $max: { qty: 30 } }  // Only updates if qty < 30
)
✖️ $mul – Multiply
js
Copy
Edit
db.dataall.updateOne(
  { item: "mousepad" },
  { $mul: { qty: 2 } }  // Multiply qty by 2
)
🧹 $unset – Remove field
js
Copy
Edit
db.dataall.updateOne(
  { item: "mousepad" },
  { $unset: { qty: "" } }  // Remove `qty` field
)
🏷 $rename – Rename field
js
Copy
Edit
db.dataall.updateOne(
  { qty: 87 },
  { $rename: { item: "jugalsharma" } }
)

// Rename `item` field to `jugalsharma` in all docs
db.dataall.updateMany(
  {},
  { $rename: { item: "jugalsharma" } }
)
🆕 $upsert – Update or Insert
js
Copy
Edit
db.dataall.updateOne(
  { name: "coulu" },
  { $set: { age: 100 } },
  { upsert: true }  // Insert if not found
)
🧺 3. Array Update Operators
➕ $push – Add (even duplicates)
js
Copy
Edit
db.users.updateMany(
  { name: "amit" },
  { $push: { hobbies: { $each: ["youtuber", "movies"] } } }
)
✅ $addToSet – Add only if not exists
js
Copy
Edit
db.users.updateMany(
  { name: "amit" },
  { $addToSet: { hobbies: { $each: ["youtuber", "movies"] } } }
)
➖ $pull – Remove values from array
js
Copy
Edit
db.users.updateMany(
  { name: "amit" },
  { $pull: { hobbies: { $in: ["youtuber", "movies"] } } }
)
🧹 $pop – Remove first or last element
js
Copy
Edit
db.users.updateMany(
  { name: "amit" },
  { $pop: { hobbies: 1 } }   // 1 = remove last, -1 = remove first
)
🗑️ 4. Deleting Documents
❌ deleteOne()
js
Copy
Edit
db.dataall.deleteOne({ item: "canvas" })  // Delete one match
❌ deleteMany()
js
Copy
Edit
db.dataall.deleteMany({ qty: 10 })  // Delete all where qty = 10
❌ Delete All Documents
js
Copy
Edit
db.dataall.deleteMany({})  // Delete all documents
✅ Summary Table: Array Operators



| 🔧 Operator | 💡 Purpose                                        |
| ----------- | ------------------------------------------------- |
| `$push`     | Add item(s) to array (allows duplicates)          |
| `$addToSet` | Add only if not already in array                  |
| `$pull`     | Remove specific value(s) from array               |
| `$pop`      | Remove first or last element                      |
| `$each`     | Used with `$push` or `$addToSet` to push multiple |







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




::::::: Important Arrray Update .............

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
