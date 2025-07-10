2:::: Insert  and insertMany ......................................


 db.dataall.insertOne({
  item: 'canvas',
  qty: 100,
  tags: ['cotton'],
  size: { h: 28, w: 35.5, uom: 'cm' }
});



////insertMany||||||||||||||||||| ........................................


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

 // Q order Option in Insert command in Mongodb ?

db.clloectyy.insertMany([{_id:"A" , name:"jugal"},{_id:"b" , name:"kinka"}] , {ordered:false}) ///!SECTION



Q write concern in Mongodb  ?  ----- >Important 

db.ststudent.insertOne({name:"B" ,price:2}  , writeConcren:{w:0}}) // w:1 true or w:0 False

db.ststudent.insertOne({name:"B" ,price:2}  , writeConcren:{w:0 , j:true}}) // j:true deafulte

db.ststudent.insertOne({name:"B" ,price:2}  , writeConcren:{w:0 , j:true , wtimeout:1000}}) //


