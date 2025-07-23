// // prometheus/prom.js
// const client = require('prom-client');

// // Collect default metrics (e.g., memory, CPU, etc.)
// const collectDefaultMetrics = client.collectDefaultMetrics;
// collectDefaultMetrics({ register: client.register });



// //const client = require("prom-client"); 
// const histogram = new client.Histogram({  
//     name: "http_express_req_res_time_Historgram",
//     help: "This tells how much is taken by req and res",
//     labelNames: ['method', 'route', 'status_code'],
//     buckets: [1, 50, 100, 200, 500, 800, 1000, 2000]
//   });
  



// // Export the client and register
// module.exports = {
//   client,
//   histogram
// };

const responseTime = require('response-time');
const client = require('prom-client');

// Collect default system metrics like memory, CPU, etc.
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

// Counter for total requests
const totalReq = new client.Counter({
  name: 'total_requests',
  help: 'Total number of requests made'
});




const gauge = new client.Gauge({ 
    name: 'metric_name',
     help: 'metric_help' });

 /// ...........Function current Timer check 
//Set value to current time in seconds:
gauge.setToCurrentTime();
// Record Duration :


// Record Duration :
const end = gauge.startTimer();


// Histogram for request/response duration
const histogram = new client.Histogram({
  name: 'http_express_req_res_time_Histogram',
  help: 'Request/response time histogram',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [1, 50, 100, 200, 500, 800, 1000, 2000] // ms
});

// Summary for request durations
const requestDurationSummary = new client.Summary({
  name: 'request_duration_summary',
  help: 'Summary of request durations',
  labelNames: ['method', 'route', 'status_code'],
  percentiles: [0.5, 0.9, 0.99]
});

// Gauge for active connections (optional)
const activeConnections = new client.Gauge({
  name: 'active_connections',
  help: 'Current number of active connections',
  labelNames: ['service']
});

// Middleware to record response time and metrics
const monitorMiddleware = responseTime((req, res, time) => {
  const method = req.method;
  const route = req.route?.path || req.path; // avoid undefined
  const statusCode = res.statusCode;

  // Record metrics
  totalReq.inc();

    console.log("Total Requests:",  totalReq.hashMap[''].value);


     //check Current time of Function 
 console.log(end() , "end")
 end();


  histogram.labels(method, route, statusCode).observe(time);
  requestDurationSummary.labels(method, route, statusCode).observe(time);
  activeConnections.labels({ service: 'your_service_name' }).set(1); // Adjust dynamically if needed

  // -->Time check respone Time

      console.log(`Request Time (ms): ${time}, Method: ${req.method}, Route: ${req.url}, Status: ${res.statusCode}`);
});

// Route to expose metrics to Prometheus
const metricsRoute = async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
};

module.exports = {
  monitorMiddleware,
  metricsRoute
};
