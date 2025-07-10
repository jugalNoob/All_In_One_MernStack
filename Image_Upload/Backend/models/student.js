const mongoose=require("mongoose");
const shortid = require('shortid');
// const keysecret=process.env.SECRETY_KEY;




const Students=new mongoose.Schema({ 
    fname:{
        type:String,
        required:true
    },
    imgpath:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now // Default value for date
      },
      shortId: {
        type: String,
        unique: true,
        default: shortid.generate
      }
    
})


const Register = new mongoose.model("Usersdata", Students,)
    // Error handler function
  module.exports = Register;