

2. Leaky Bucket ::::::::::::::::::::::
Key Concept:

:-:Requests are added to a "bucket" at any rate, but they are 
processed (or leave the bucket) at a constant rate.

:-:Excess requests are discarded if the bucket is full.



3::Characteristics:

:-:Smooth Flow: Enforces a strict, constant rate of processing.
:-:No Bursts: Does not allow bursts of traffic; all requests are evenly spaced.
:-:Request Queueing: Requests may be queued if the bucket is not full.



4::Use Cases:

:-:Network Traffic Shaping:
Ensure consistent packet delivery, avoiding congestion in communication networks.


:-:Video Streaming:
Deliver data at a steady rate for uninterrupted playback.


:-:Payment Gateways:
Process transactions at a uniform rate to avoid overloading backend systems.




When to Use Which? ::::::::::::::::::
Token Bucket:

Use when you need flexibility and want to allow short-term bursts.
Ideal for user-facing APIs, where occasional bursts of activity should not be penalized.
Leaky Bucket:

Use when you need a constant rate of processing to avoid overloading systems.
Suitable for backend services like video streaming, where consistency is critical.



Analogy: ::::::::::::::-------------
Token Bucket: Think of a parking lot with a maximum capacity. Cars (requests) can park as long as there are available spots (tokens), and new spots open up at a steady rate.
Leaky Bucket: Think of a faucet dripping water at a constant rate. No matter how much water is poured into the faucet, it always drips at a fixed pace.



:::::::::: Leak Buket :::::::::::::::::

const express = require('express');

const app = express();

const port = 9000;

// Leaky Bucket configuration
const bucketCapacity = 5; // Maximum capacity of the bucket
const leakRate = 1; // Number of requests allowed to be processed per second
let currentLevel = 0; // Current number of requests in the bucket

// Leak the bucket at a fixed interval
setInterval(() => {
    if (currentLevel > 0) {
        currentLevel--; // Process one request (leak one unit)
        console.log(`Leaked 1 request. Current level: ${currentLevel}`);
    }
}, 1000 / leakRate); // Leak rate in milliseconds

app.use((req, res, next) => {
    if (currentLevel < bucketCapacity) {
        currentLevel++; // Add request to the bucket
        console.log(`Request added. Current level: ${currentLevel}`);
        next(); // Allow the request to proceed
    } else {
        res.status(429).send("Too Many Requests. Please try again later.");
        console.log("Request rejected. Bucket overflow.");
    }
});

app.get("/", (req, res) => {
    res.send("Request successful!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
