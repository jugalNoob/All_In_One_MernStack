🔹 2. Leaky Bucket Algorithm

How it works:

A bucket leaks at a constant rate (say, 5 requests/sec).

Incoming requests go into the bucket (queue).

If bucket overflows (too many requests at once) → requests dropped.

Properties:
✅ Smooths traffic to fixed rate (like a water tap).
✅ Predictable server load.
❌ Bursts are not allowed — excess gets dropped.

Use Cases:

Traffic shaping in networks.

Streaming video/audio.

Protecting downstream services from spikes.

ASCII Diagram: Leaky Bucket
[ Incoming Requests ] --> [ Bucket ] --> Leak out steadily (5/sec)
                               |
                         Overflow = Drop requests


Example flow (leak rate = 5/sec, bucket size = 10):

t=0: 0 in bucket
t=1: 8 arrive → bucket=8 → leak 5 → left=3
t=2: 7 arrive → bucket=10 (full) → leak 5 → left=5, 2 dropped
...
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

Leaky Bucket = “I’ll drip requests out at a fixed speed, no bursts.”


If asked about Network traffic shaping → Leaky Bucket.

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
