const express = require("express");
const app = express();

let count = 0;

// Middleware only for `/home`
const homeMiddleware = (req, res, next) => {
    count++;
    // console.log("Request count for /home:", count);

   
    const log = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.originalUrl,
        count,
    };

    console.log(`[HOME] ${log.timestamp} | ${log.method} ${log.url} | Visit #: ${log.count}`);


      // Optionally write to log file
      fs.appendFile("home_logs.txt", JSON.stringify(log) + "\n", (err) => {
        if (err) console.error("Log write failed:", err);
    });


     // Measure response time
     const start = Date.now();
     res.on("finish", () => {
         const duration = Date.now() - start;
         console.log(`[HOME] Response took ${duration}ms`);
     });

    next();
};

app.get("/", (req, res) => {
    res.send("Jugal Sharma");
});

app.get("/home", homeMiddleware, (req, res) => {
    res.send("Jugal Sharma home");
});

app.listen(9000, () => {
    console.log("Server running on port 9000");
});
