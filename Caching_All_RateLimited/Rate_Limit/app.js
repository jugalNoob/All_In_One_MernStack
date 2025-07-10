const express=require("express")

const app=express()

const port=9000



// simple code rate Limit 

// let count = 0;

// app.get("/", (req, res) => {
//     count++;

//     if (count > 5) {
//         return res.status(429).send("Too Many Requests. Please try again later.");
//     }

//     res.send(`Hello, World! Count: ${count}`);
// });


// Updgrade rate Code :::::::::::::::::

let count = 0;
let lastResetTime = Date.now();
const WINDOW_MS = 10000; // 10 seconds
const MAX_REQUESTS = 5;

const rateLimit = (req, res, next) => {
  const now = Date.now();

  if (now - lastResetTime > WINDOW_MS) {
    count = 0;
    lastResetTime = now;
  }

  count++;
  if (count > MAX_REQUESTS) {
    return res.status(429).send("Too Many Requests. Please try again later.");
  }

  next();
};


:::::::: Algo code ::::::::::::::::::::::::::::::


/// Simple Rate Limit start ::::::::::::::::

const express = require('express');

const app = express();

const port = 9000;

let one = 0; // Declare outside to persist across requests
let resetInProgress = false; // To avoid multiple resets at the same time

app.get("/", (req, res) => {
    if (one >= 5) {
        if (!resetInProgress) {
            resetInProgress = true;
            console.log("Reset will occur in 5 seconds.");
            setTimeout(() => {
                one = 0;
                resetInProgress = false;
                console.log("Counter reset.");
            }, 5000); // 5-second delay
        }
        res.send(`Limit reached: ${one}`);
        console.log(`Limit reached: ${one}`);
    } else {
        res.send(`Hello World ${one}`);
        console.log(one);
        one++;
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



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



app.get("/", rateLimit, (req, res) => {
    res.send(`Hello, World! Count: ${count}`);
});


app.listen(port, ()=>{

    console.log(`Server is running on port ${port}`)

})