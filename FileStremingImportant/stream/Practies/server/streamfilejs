const express = require("express");
const fs = require("fs");
// https://www.npmjs.com/package/http-status
const zlib=require('zlib')
const app = express();
const port = 8000;

const status = require("express-status-monitor");

app.use(status());



// stream Read (Sample.txt) --- > zipper --> fs write  streems

fs.createReadStream('./5MB_file.txt').pipe(zlib.createGunzip().pipe(

    fs.createWriteStream("./5MB_file.txt")
))


// Compress the file (if needed)
fs.createReadStream('./5MB_file.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('./5MB_file.txt.gz'));


// Simple method to read File
app.get("/", (req, res) => {
  const stream = fs.createReadStream('./5MB_file.txt', 'utf-8');

  stream.on('data', (chunk) => {
    // Write the actual chunk data to the response
    res.write(chunk);
  });

  stream.on('end', () => {
    // End the response when the stream ends
    res.end();
  });

  stream.on('error', (error) => {
    // Handle stream errors
    res.status(500).send("Error reading file");
  });
});




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 
