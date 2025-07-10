const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const Register=require('./models/student')
const app = express();
const port = 9000;
require('./db/conn')


// Multer configuration

app.use(express.json());
app.use(cors())



app.use(express.json())



const imgconfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/');
  },
  filename:(req,file,callback)=>{
    callback(null,`imgae-${Date.now()}. ${file.originalname}`)
}
});


//image filter

const isImage = (req,file,callback)=>{
  if(file.mimetype.startsWith("image")){
      callback(null,true)
  }else{
      callback(new Error("only images is allowd"))
  }
}

// const upload = multer({ storage });
const upload = multer({
  storage:imgconfig,
  fileFilter:isImage
});
// Routes
app.get('/', (req, res) => {
  res.send('Welcome to file upload demo');
});

app.post("/register", upload.single('file'), async(req, res) => {

  const {filename} = req.file;

  const {fname} = req.body;

  if(!fname || !filename){
      res.status(401).json({status:401,message:"fill all the data"})
  }

  try {

 

      const uploaddata= new Register({
          fname:fname,
          imgpath:filename,
     
      });

      const finaldata = await  uploaddata.save();
      console.log(finaldata)

      res.status(201).json({status:201,finaldata});

  } catch (error) {
      res.status(401).json({status:401,error})
  }



// user data get
// router.get("/getdata",async(req,res)=>{
//   try {
//       const getUser = await users.find();

//       res.status(201).json({status:201,getUser})
//   } catch (error) {
//       res.status(401).json({status:401,error})
//   }
// });


// // delete user data
// router.delete("/:id",async(req,res)=>{

//   try {
//       const {id} = req.params;

//       const dltUser = await users.findByIdAndDelete({_id:id});

//       res.status(201).json({status:201,dltUser});

//   } catch (error) {
//       res.status(401).json({status:401,error})
//   }

// })


/// --> without data base

  // // 'file' should match the name attribute in your form input field
  // console.log(req.file); // File information
  // console.log(req.body)
  // res.send('File uploaded successfully');
});


// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



/// Simple Upload Image in Multer ------------------------<><><<><><><>

// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors');
// const app = express();
// const port = 9000;

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
//   }
// });

// const upload = multer({ storage });

// // Routes
// app.get('/', (req, res) => {
//   res.send('Welcome to file upload demo');
// });

// app.post('/upload', upload.single('file'), (req, res) => {
//   // 'file' should match the name attribute in your form input field
//   console.log(req.file); // File information
//   console.log(req.body)
//   res.send('File uploaded successfully');
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
