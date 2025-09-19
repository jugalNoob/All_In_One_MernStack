✅ In System Design Interviews:

If asked about API Rate Limiting → Token Bucket.

🔹 Quick Intuition

Token Bucket = “I’ll allow a few bursts if you saved credits.”


🔹 Token Bucket vs Leaky Bucket (Comparison Table)


| Feature        | Token Bucket ✅                | Leaky Bucket ✅             |
| -------------- | ----------------------------- | -------------------------- |
| Bursts allowed | Yes (if tokens saved)         | No (excess dropped)        |
| Output rate    | Variable (depends on tokens)  | Constant (smooth)          |
| Best for       | APIs, authentication, retries | Networking, streaming, QoS |
| Example use    | GitHub API, AWS rate limiting | Routers, bandwidth shaping |



🔹 1. Token Bucket Algorithm

How it works:

A bucket fills with tokens at a fixed rate (say, 5 tokens/sec).

Each request consumes 1 token.

If tokens are available → request allowed.

If no tokens → request rejected/throttled.

Properties:
✅ Allows bursts (if tokens accumulate).
✅ Smooth average rate.
❌ If traffic is continuous and high, bucket may empty → rejects requests.

Use Cases:

APIs where occasional bursts are acceptable (e.g., user loads 50 images quickly).

Cloud APIs (AWS, GCP, Twitter API).

Payment systems allowing short bursts of retries.

ASCII Diagram: Token Bucket
[ Token Bucket ] <-- steady refill (5/sec)
      |
      v
   [Requests] ---> Allowed if token available


Example flow (bucket size = 10, refill = 2/sec):

t=0: 10 tokens
t=1: 8 tokens (2 requests used)
t=2: 6 tokens (2 requests used)
t=3: 7 tokens (refill +1, used 0)
...


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

