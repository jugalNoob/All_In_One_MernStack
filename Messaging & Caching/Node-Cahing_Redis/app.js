const express = require('express');
const NodeCache = require("node-cache");
const app = express();

const port = process.env.PORT || 3000;
const myCache = new NodeCache();

// Cache setting route
app.get("/", (req, res) => {
    const obj = { my: "Special", variable: 42 };

    // Set cache with a TTL of 10000 seconds 2.4 hours
    const success = myCache.set("myKey", obj, 10000);
    res.send({ success, message: "Data cached!" });

     

});

// Cache retrieval route
app.get("/cache", (req, res) => {
    const cachedData = myCache.get("myKey");
    if (cachedData) {
        res.send({ cachedData });
    } else {
        res.send({ message: "Cache expired or not set!" });
    }
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});




// Explanation
// Express Server: The server listens on port 3000 or any port specified in process.env.PORT.
// Node Cache: node-cache is used to store a simple object in memory with a TTL (time-to-live) of 10,000 seconds.
// Route: When you access the root route (/), an object { my: "Special", variable: 42 } is stored in the cache under the key "myKey", and the success status (true or false) is sent as a response.
// Suggested Improvements
// Set the TTL Correctly: Note that 10000 represents 10,000 seconds (about 2.7 hours), so double-check if that’s the intended cache duration.

// Add a Cache Retrieval Route: Since you’re only setting the cache in this example, you might want to retrieve it to verify that the data is actually stored.

// Check for Cache Existence: Before setting the cache each time, you could check if the data already exists and only update if necessary.