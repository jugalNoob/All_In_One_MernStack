
const Register = require("../model/student");
const shortid = require('shortid'); // Import shortid library
const argon2 = require('argon2');






// Email password Update request  Advance User  Update  ----------->>
exports.updateUsers = async (req, res) => {
  try {

    // ---> update With Id Only  ------------------->>
    // const { email, password } = req.body;
    // const _id = req.params.id;
    //     const  _email  = req.params;


    // --- >> Update With Email and Id  --->>

      const { password } = req.body;
    const { id, email } = req.params;

    // Validate input
    if ( !password ) {
      return res.status(400).json({ error: "Email, password, and ID are required" });
    }

    // Hash new password
    const hashpassword = await argon2.hash(password);

    // Update only if both ID and Email match
    const updatedUser = await Register.findOneAndUpdate(
      { _id:id, email }, // match both ID and email
      { password: hashpassword }, // only update password
      { new: true } // return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found or email doesn't match" });
    }

    console.log("User updated: advance");
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



// $argon2id$v=19$m=65536,t=3,p=4$1tv7arfb9RDlmb5iMTL4Fw$FC9GUP2HIXn4UaQ5dHlJdasruL/AuMpcb2JoLAxASsw
//$argon2id$v=19$m=65536,t=3,p=4$1tv7arfb9RDlmb5iMTL4Fw$FC9GUP2HIXn4UaQ5dHlJdasruL/AuMpcb2JoLAxASsw


// Email password Update request  simple Update  ----------->>
exports.updateUserss = async (req, res) => {
    try {
      const email = req.body.email; 
      console.log(email , "first email");
  
      let password = req.body.password;
    //   console.log(password , "password");
  
      let hashpassword = await argon2.hash(password);
    //   console.log(hashpassword, "hashed password");
  
      const updatedUser = await Register.findOneAndUpdate(
        { email: email }, 
        { password: hashpassword }, 
        { new: true }
      );
  
      
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" }); /// 
      }
  
      console.log("User updated:");
      res.status(200).send(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
// $argon2id$v=19$m=65536,t=3,p=4$1tv7arfb9RDlmb5iMTL4Fw$FC9GUP2HIXn4UaQ5dHlJdasruL/AuMpcb2JoLAxASsw