const RegisterGet = require("../model/Apistudent");
const axios = require('axios');
const { redisClient } = require("../Redis/redisClient"); // ✅ fix
const zlib = require("zlib");



// -----   Search  start Adavance LLevel ------------------->>>
// db.means.find({ birthDate: "2005-01-28" }) //working
//http://localhost:9000/search?name=Melissa&countrys=Vietnam ---> check anem country
//http://localhost:9000/search?name=Catherine&ageEq=30&emailer=sheri78@gmail.com&bloodG=B  -->Important Search 
//--->>>http://localhost:9000/search?name=Catherine&ageEq=30&emailer=sheri78@gmail.com&bloodG=B&gendering=female 
//-->>>http://localhost:9000/search?name=Catherine&ageEq=30&emailer=sheri78@gmail.com&bloodG=B&gendering=female&truess=false
//--->>>http://localhost:9000/search?agelessValue=29&agegreatValues=30
//--->>http://localhost:9000/search?prices=2738&ones=surfing&twos=gamin
//--->>http://localhost:9000/search?&ones=surfing&twos=gaming
///--->>http://localhost:9000/search?priceless=2617&pricegreat=3136
// ----->>>> http://localhost:9000/search?hoobies=Reading




exports.ApigetQueary = async (req, res) => {
  try {
    const {

        gendering,
      name, // 👈 FIXED: match the query param ?name=Jonathan
      countrys, emailer,bloodG, prices, pricegreat, priceless,
       truess,  ones, twos, hoobies, removes, year ,ageEq,
      agelessValue,         // ✅ FIXED
      agegreatValues
    } = req.query;

    const query = {
      ...(name && { name: { $regex: name, $options: "i" } }), // 👈 FIXED
        ...(countrys && {  country: { $regex: countrys, $options: "i" } }), // 👈 FIXED,
           ...(emailer && {  email: { $regex: emailer, $options: "i" } }),
            ...(    bloodG && {      bloodGroup: { $regex:    bloodG, $options: "i" } }),
                  ...(ageEq !== undefined && { age: { $eq: Number(ageEq) } }),
                 ...(gendering  && { gender: { $eq: gendering } }),
                    ...(truess && { isEligible: { $eq: truess === 'true' } }),
                       ...(hoobies && { hobbies: { $in: [hoobies] } }),
                     ...(removes === 'name' && { name: { $exists: false } }),


                    // ---> hobbies
                         ...(ones && twos && { hobbies: { $in: [ones, twos] } }),
                      ...(prices && { price: {$eq: Number(prices) } }),

                      /// --->price lessThen  and price greantten
                        ...(priceless !== undefined && pricegreat !== undefined && {
        price: {
          $gte: Number(priceless),
          $lte: Number(pricegreat)
        }
    }),
                    //---> age lessThen 20  and age greathen 30
                    // ✅ Fixed: correct range filter
      ...(agelessValue !== undefined && agegreatValues !== undefined && {
        age: {
          $gte: Number(agelessValue),
          $lte: Number(agegreatValues)
        }
      }),        
    };



const data = await RegisterGet.find(query);

    res.status(200).json({ data });
  } catch (error) {
    console.error("❌ Error in Apiget:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

