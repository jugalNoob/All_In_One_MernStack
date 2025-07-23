

// const express = require("express");
// const statusMonitor = require("express-status-monitor");

// const app = express();
// app.use(statusMonitor());

// app.get("/", (req, res) => res.send("Latency Check!"));

// app.listen(9000, () => {
//     console.log("Server running on http://localhost:9000");
// });




// const express = require("express");
// const client = require("prom-client");

// const app = express();
// const collectDefaultMetrics = client.collectDefaultMetrics;
// collectDefaultMetrics(); // memory, CPU, etc.

// const httpRequestDurationMicroseconds = new client.Histogram({
//     name: 'http_request_duration_ms',
//     help: 'Duration of HTTP requests in ms',
//     labelNames: ['method', 'route', 'code'],
//     buckets: [50, 100, 300, 500, 1000, 2000] // ms
// });

// app.use((req, res, next) => {
//     const end = httpRequestDurationMicroseconds.startTimer();
//     res.on('finish', () => {
//         end({ route: req.route?.path || req.path, code: res.statusCode, method: req.method });
//     });
//     next();
// });

// app.get("/", (req, res) => {
//     setTimeout(() => res.send("Latency OK"), Math.random() * 500);
// });

// app.get("/metrics", async (req, res) => {
//     res.set('Content-Type', client.register.contentType);
//     res.end(await client.register.metrics());
// });

// app.listen(9000, () => {
//     console.log("App running on http://localhost:9000");
// });
