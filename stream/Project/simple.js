const express = require("express");
const fs = require("fs");
// https://www.npmjs.com/package/http-status
// cls


const app = express();
const port = 8000;

const status=require("express-status-monitor")



app.use(status())


// Simple method read File 

app.get("/", (req, res) => {
  fs.readFile('./5MB_file.txt', "utf-8", (error, data) => {
    if (error) {
      res.status(500).send("Error reading file");
      return;
    }
    res.end(data);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
