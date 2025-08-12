1. Token Bucket
Key Concept:
Tokens are generated at a fixed rate and added to a bucket up to a maximum capacity.
Users (or requests) consume tokens to proceed; if no tokens are available, the request is rejected or delayed.


Characteristics:

:-:Allows Bursts: Short bursts of activity are allowed as long as
 tokens are available in the bucket.

:-:Flexible: Can handle bursty traffic while enforcing an average
 rate limit.

:-:Token Regeneration: Tokens regenerate over time, allowing 
for a smooth flow of requests.



Use Cases:.....::: 


1::API Rate Limiting:
Allow users to send bursts of requests as long as they are within 
a defined limit.

2::Streaming Services:
Allow bursts of data uploads/downloads without exceeding average
 bandwidth limits.


3::Gaming:
Manage bursty actions like power-ups or abilities within a defined 
limit.



::::::: Buket Token Algo :::::::::::::: ...............

const express = require('express');

const app = express();

const port = 9000;

// Token Bucket configuration
const maxTokens = 5; // Maximum tokens the bucket can hold
const refillRate = 1; // Tokens added to the bucket every second
let tokens = maxTokens; // Current tokens in the bucket

// Refill tokens periodically
setInterval(() => {
    if (tokens < maxTokens) {
        tokens++; // Refill the bucket
        console.log(`Token added. Current tokens: ${tokens}`);
    }
}, 1000); // Refill every 1 second

// Middleware to apply rate limiting
app.use((req, res, next) => {
    if (tokens > 0) {
        tokens--; // Consume a token
        console.log(`Token consumed. Remaining tokens: ${tokens}`);
        next(); // Allow the request to proceed
    } else {
        res.status(429).send("Too Many Requests. Please try again later.");
        console.log("Request rejected. Bucket is empty.");
    }
});

app.get("/", (req, res) => {
    res.send("Request successful!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

