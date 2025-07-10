 
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
