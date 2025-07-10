
var responseTime = require('response-time') //  response time for requests in HTTP servers.
const client = require('prom-client'); // Metric collection

// Collect default metrics such as CPU, RAM usage
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });



// var http = require('http')

// console.log(http.METHODS) // Outputs all available HTTP methods


// console.log(http.METHODS.indexOf('CONNECT') !== -1) // true if 'CONNECT' exists



// Counter for total requests
//Gauges are similar to Counters but a Gauge's value can be decreased.
const totalReq = new client.Counter({
    name: "total_requests",
    help: "Total number of requests made"
});
const gauge = new client.Gauge({ 
    name: 'metric_name',
     help: 'metric_help' });




 /// ...........Function current Timer check 
//Set value to current time in seconds:
gauge.setToCurrentTime();
// Record Duration :
const end = gauge.startTimer();



//const client = require("prom-client"); 
const histogram = new client.Histogram({  
    name: "http_express_req_res_time_Historgram",
    help: "This tells how much is taken by req and res",
    labelNames: ['method', 'route', 'status_code'],
    buckets: [1, 50, 100, 200, 500, 800, 1000, 2000]
  });
  

 
  // Summary for request durations
const requestDurationSummary = new client.Summary({  //
    name: "request_duration_summary",
    help: "Summary of request durations",
    labelNames: ['method', 'route' ,'status_code'],
    percentiles: [0.5, 0.9, 0.99],
  });


  
  // Gauge for active connections
const activeConnections = new client.Gauge({
    name: "active_connections",
    help: "Number of active connections",
    labelNames: ['service','method', 'statusCode'],
  });
  
  


// Middleware to track response time and increment request counter
const monitorMiddleware =responseTime((req, res, time) => {

    const method = req.method || "GET" || "POST" || "PATCH" || "Delete"
    const route = req.url;
    const statusCode = res.statusCode;

    //check histogram graph
    // Observe the request-response time using the provided parameters
    histogram.labels(method, route, statusCode).observe(time);
    
      histogram.zero({ method: 'GET' });
      histogram.zero({ method: 'POST' });

         // Increment the activeConnections gauge for the service when a new connection is established
    activeConnections.labels({ service: 'your_service_name' }).inc();



      // check summary information foor

      requestDurationSummary.labels(
        req.method  || "GET" || "POST" || "PATCH" || "Delete",
           req.url ,// You can use 'req.url' as the route label
           res.statusCode
         ).observe(time);
       



    totalReq.inc(); // Increment counter for each request
    activeConnections.labels({ service: 'your_service_name' }).inc();
    activeConnections.labels('GET' , "POST" , '200').set(100);

    console.log("Total Requests:",  totalReq.hashMap[''].value);
   // gauge.set(time / 1000); // Record response time in seconds (time is in ms by default)
 //check Current time of Function 
 console.log(end() , "end")
 end();

    

    // Log the response time
    // console.log(`Request Time (in seconds): ${time }`);
    // Log request metrics
    console.log(`Request Time (ms): ${time}, Method: ${req.method}, Route: ${req.url}, Status: ${res.statusCode}`);



    // Decrement active connections gauge when response ends
//   res.on('finish', () => {
//     activeConnections.labels({ service: 'your_service_name', method, status_code: statusCode }).dec();
//   });


    // totalReq.inc(); // Increment counter for each request
    // gauge.set(time / 1000); // Record response time in seconds (time is in ms by default)
    
    // // Log the response time
    // console.log(`Request Time (in seconds): ${time / 1000}`);
});



const metricsRoute = async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    const metrics = await client.register.metrics();
    res.end(metrics);
};

// Export both the middleware and the metrics route
module.exports = { monitorMiddleware, metricsRoute };





// Midllerware   ........................... :::::::::::::::::::::::::::::::::::::::::::::

// const monitorMiddleware =responseTime((req, res, time) => {

//     //check histogram graph
//     // Observe the request-response time using the provided parameters
//     histogram.labels({
//         method: req.method || "GET" || "POST" || "PATCH" || "Delete",
//         route: req.url,
//         status_code: res.statusCode
//       }).observe(time);
    
//       histogram.zero({ method: 'GET' });
//       histogram.zero({ method: 'POST' });

//          // Increment the activeConnections gauge for the service when a new connection is established
//     activeConnections.labels({ service: 'your_service_name' }).inc();


//       // check summary information foor

//       requestDurationSummary.labels(
//         req.method  || "GET" || "POST" || "PATCH" || "Delete",
//            req.url ,// You can use 'req.url' as the route label
//            res.statusCode
//          ).observe(time);
       



//     totalReq.inc(); // Increment counter for each request
//     activeConnections.labels({ service: 'your_service_name' }).inc();
//     activeConnections.labels('GET' , "POST" , '200').set(100);
//     console.log("Total Requests:",  totalReq.hashMap[''].value);
//    // gauge.set(time / 1000); // Record response time in seconds (time is in ms by default)
//  //check Current time of Function 
//  console.log(end() , "end")
//  end();

    

//     // Log the response time
//     console.log(`Request Time (in seconds): ${time }`);




//     // totalReq.inc(); // Increment counter for each request
//     // gauge.set(time / 1000); // Record response time in seconds (time is in ms by default)
    
//     // // Log the response time
//     // console.log(`Request Time (in seconds): ${time / 1000}`);
// });
