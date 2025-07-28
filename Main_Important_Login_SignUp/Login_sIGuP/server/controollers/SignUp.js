const Register = require("../model/student");
const shortid = require('shortid'); // Import shortid library

exports.formUser=async(req,res)=>{

try {
    
  
  // all fields are required  :::
    const { name, email, password } = req.body;
    console.log(name, email, password);

    if (!name ||!email ||!password) {
        throw new Error("All fields are required");
    }

    // check if email is valid unique email address 

    const userExist = await Register.findOne({ email: email });
    if (userExist) {
        return res.status(422).json({ error: 'User email already exists' });
    }


    //create a shortId 

    const shortId = shortid.generate();
    console.log(shortId)



    const addData = new Register({
        name,
        email,
        password,
        shortId, // Ensure this field is included in your schema
       
    });


    // save data in MongoDb
    const result = await addData.save();
    console.log(result)

       // Generate JWT token and store in MongoDB
const token = await result.generateAuthToken(); // ✅ Fixed method name
    console.log(token)

    const DeviceInfo = await result.generateSessionToken(req);

    console.log(DeviceInfo)





    // 8. Generate User Environment Info
    const userInfo = await result.generateUserInfomration(
      req.headers.referer || req.originalUrl,
      req.ip,
      req.hostname,
      req.originalUrl,
      
      req.protocol,
      req.headers['connection'],
      req.headers['host'],
      req.headers['sec-ch-ua-platform'],
      req.headers['accept-language'],
      req.headers['sec-ch-ua']
    );


    // check result with user information 

    if (result) {
      res.status(200).json({
        success: true,
        user: {
          name: result.name,
          email: result.email,
          shortId: result.shortId,
         // token: token, // Optional: only include if needed on client]
           userInfo:userInfo
        }
      });
    } else {
      return res.status(500).json({ error: 'Failed to create user' });
    }


} catch (error) {
console.log(error)

res.status(400).send({'error': error}) 



  // Handle client-side errors (Bad Request 400)
  if (error.message === "All fields are required") {
    return res.status(400).json({ error: 'Bad Request: ' + error.message });
  }


 // Duplicate email found in the database
 if (error.message === "User email already exists") {
  return res.status(422).json({ error: 'Unprocessable Entity: ' + error.message });
}

  // Handle unexpected server-side errors (Internal Server Error 500)
  res.status(500).json({ error: 'Internal Server Error: Something went wrong!' });

}
}
