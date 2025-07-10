
const express = require('express');
const http2 = require('http2');

const app = express();
const port = process.env.PORT || 8000;

// Making an HTTP/2 request
const client = http2.connect('https://www.google.com');

// Create a request
const req = client.request({ ':path': '/' });

let data = '';

// Collect data chunks
req.on('data', (chunk) => {
  data += chunk;
});

// End event fires when the complete response has been received
req.on('end', () => {
  console.log("Response received from Google:");
  console.log(data);
  console.log("No more response");
  client.close(); // Close the HTTP/2 session
});

// Error handling
req.on('error', (error) => {
  console.error(`Error: ${error.message}`);
});

// End the request
req.end();

// Start the Express server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});