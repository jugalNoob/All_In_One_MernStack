For a rateLimit algo fixed window counting algo 


1. Concept
The Fixed Window Counter algorithm limits requests by counting how many occur in a fixed time window (e.g., every 1 minute).

You pick:

Window size (e.g., 1 minute = 60 seconds)

Max requests allowed per window (e.g., 100 requests)

You store:

A counter for the number of requests in the current window

When the window resets:

Counter is reset to zero

If a request comes and the counter >= max requests → block the request.



2. Example
If:

Window = 1 minute

Limit = 5 requests

Timeline:


[12:00:00 → 12:00:59]   Max 5 requests allowed
[12:01:00 → 12:01:59]   Counter resets → again 5 requests allowed


12:00:05 → allowed (count=1)
12:00:10 → allowed (count=2)
...
12:00:40 → allowed (count=5)
12:00:41 → blocked (count=5)
12:01:00 → allowed (count=1)


3. Pros & Cons
✅ Pros:

Very simple to implement

Low memory overhead

Predictable request caps per window

⚠️ Cons:

Burst issue at boundaries
Example: if a user sends 5 requests at 12:00:59 and 5 more at 12:01:00 → effectively 10 requests in 2 seconds.



const express = require("express");
const app = express();

const WINDOW_SIZE_IN_SECONDS = 60; // 1 minute
const MAX_REQUESTS = 5;

let requestCounts = {};
let windowStartTimestamp = Date.now();

app.use((req, res, next) => {
    const currentTime = Date.now();

    // If window expired → reset
    if (currentTime - windowStartTimestamp >= WINDOW_SIZE_IN_SECONDS * 1000) {
        requestCounts = {};
        windowStartTimestamp = currentTime;
    }

    const userIP = req.ip;

    // Increase counter
    requestCounts[userIP] = (requestCounts[userIP] || 0) + 1;

    if (requestCounts[userIP] > MAX_REQUESTS) {
        return res.status(429).json({ message: "Too Many Requests" });
    }

    next();
});

app.get("/", (req, res) => {
    res.send("Hello! You're not rate limited yet.");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});



