// const express = require('express');
// // const {get} = require('http'); http 

// const {get} =require('https') //https 

// const app = express();
// const port = process.env.PORT || 9000;


// get("https://www.google.com" , (res)=>{

//   res.on('data' , (check)=>{
//     console.log(check)
//   })
//   res.on('end' , ()=>{
//     console.log("no more response")
//   })
  
// })




const express = require('express');
const { get } = require('https');

const app = express();
const port = process.env.PORT || 9000;

app.get('/fetch-google', (req, res) => {
  get("https://www.google.com", (response) => {
    let data = '';

    // Collect data chunks
    response.on('data', (chunk) => {
      data += chunk;
    });

    // On end of response
    response.on('end', () => {
      console.log("No more data");
      res.send(data); // Send the collected data as the response
    });
  }).on('error', (err) => {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

