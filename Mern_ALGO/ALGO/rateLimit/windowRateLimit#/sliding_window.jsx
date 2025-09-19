sliding window log algo for rate Limit 


1. Concept
The Sliding Window Log algorithm stores the exact timestamp of each request for a user.

When a new request comes in:

Remove all timestamps older than the window size (e.g., 60 seconds).

Count the remaining timestamps.

If the count is >= limit → reject the request.

Otherwise → add the current timestamp and allow.




2. Why It’s Different
Fixed Window Counter: resets every fixed period → burst problem.

Sliding Window Counter: averages request count with partial overlap of previous window.

Sliding Window Log: tracks every request exactly — no averaging, no estimation.

This makes it most accurate, but also more memory-intensive.


3. Example
Window: 60s
Limit: 5 requests

If requests come at:

t=0s, 5s, 20s, 40s, 59s → count = 5 → OK
t=61s → remove t=0s, count = 4 → allow


4. Node.js Implementation (In-memory)

const express = require("express");
const app = express();

const WINDOW_SIZE_IN_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

// Stores logs per user (IP → [timestamps])
const requestLogs = new Map();

app.use((req, res, next) => {
    const userIP = req.ip;
    const currentTime = Date.now();

    // Get logs for this user
    let timestamps = requestLogs.get(userIP) || [];

    // Remove old timestamps outside the window
    timestamps = timestamps.filter(ts => ts > currentTime - WINDOW_SIZE_IN_MS);

    if (timestamps.length >= MAX_REQUESTS) {
        return res.status(429).json({ message: "Too Many Requests" });
    }

    // Log the new request
    timestamps.push(currentTime);
    requestLogs.set(userIP, timestamps);

    next();
});

app.get("/", (req, res) => {
    res.send("Hello from Sliding Window Log rate limiter");
});

app.listen(3000, () => console.log("Server running on port 3000"));
