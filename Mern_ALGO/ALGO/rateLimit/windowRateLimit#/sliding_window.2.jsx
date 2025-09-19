sliding window counting for rate Limit 

1. Concept
Sliding Window Counter smooths the request rate by looking at the last N seconds (or minutes) dynamically, instead of only counting inside rigid time boxes.

You keep track of multiple sub-counters from recent windows.

When checking the limit:

Combine the current partial window’s count with a portion of the previous window’s count (weighted by how much of it overlaps with the sliding time frame).

This way, requests that are clustered right at the boundary (end of one window and start of next) are still counted together.


2. Example
Parameters:

Window size = 60 sec

Limit = 100 requests

Timeline example:

Time:       Count
0s → 59s    80 requests
60s → 65s   30 requests (within new window)

Fixed Window → would see 30 (OK)

Sliding Window → sees last 60 seconds:

   - 80 × (overlap fraction) + 30
   - Overlap fraction = 55/60 ≈ 0.916 → about 73 from old + 30 new = 103
   → Limit exceeded!



   3. How it Works
Store request counts per fixed interval (e.g., per second or per minute).

When a request arrives:

Drop counts older than the sliding window.

Calculate total count =
sum of all intervals fully inside the window

fraction of the oldest interval that overlaps with the window.

If total > limit → reject request.


4. Pros & Cons
✅ Pros

Much fairer and smoother than fixed window counter

Reduces burst problem

⚠️ Cons

Slightly more complex than fixed window

Needs storage for multiple counters


const express = require("express");
const app = express();

const WINDOW_SIZE_IN_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

// Map to store request timestamps for each user
const requestLog = new Map();

app.use((req, res, next) => {
    const userIP = req.ip;
    const currentTime = Date.now();

    // Get existing request times or create new
    let timestamps = requestLog.get(userIP) || [];

    // Filter timestamps: keep only those in the current sliding window
    timestamps = timestamps.filter(ts => ts > currentTime - WINDOW_SIZE_IN_MS);

    if (timestamps.length >= MAX_REQUESTS) {
        return res.status(429).json({ message: "Too Many Requests" });
    }

    // Add the current request timestamp
    timestamps.push(currentTime);

    // Save back to map
    requestLog.set(userIP, timestamps);

    next();
});

app.get("/", (req, res) => {
    res.send("Hello from Sliding Window Counter without Redis");
});

app.listen(3000, () => console.log("Server running on port 3000"));



3. How This Works
We keep track of request times for each user.

On every request:

We throw away requests outside the sliding window.

We count the requests inside the last N milliseconds.

If count >= limit → reject.

Else → allow and record.