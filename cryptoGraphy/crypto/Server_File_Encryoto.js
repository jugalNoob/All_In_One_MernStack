const express=require("express")

const fs=require("fs")
var CryptoJS = require("crypto-js");


const app=express()



const CreateFile=async()=>{

    // --- Step 1: Original plain text ---
const originalText = "my name is jocker";

const encrypted = CryptoJS.AES.encrypt(originalText, "secret-key").toString();
console.log("Encrypted:", encrypted);

// --- Step 3: Write the encrypted text to file ---
fs.writeFile("jugal.txt", encrypted, (err) => {
    if (err) {
        console.error("Write Error:", err);
    } else {
        console.log("Encrypted text written to jugal.txt", encrypted);

}
}
)}


CreateFile()

const Redfile=async()=>{
    fs.readFile("jugal.txt", "utf-8", (err, data) => {
        if (err) {
            console.error("Read Error:", err);
        } else {
            // console.log("Original Data:", data);

            
                // --- Step 5: Decrypt the data ---
                const bytes = CryptoJS.AES.decrypt(data, "secret-key");
                const decrypted = bytes.toString(CryptoJS.enc.Utf8);
                console.log("Decrypted:", decrypted);
    
       }
    })
}


Redfile()
   

   // --- Step 2: Read the file after writing ---
 
app.get("/" , (req,res)=>{

    res.send("hello world")
})



app.listen(port=9000 , ()=>{

    console.log(port)
})