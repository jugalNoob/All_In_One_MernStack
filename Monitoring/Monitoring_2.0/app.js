const express = require('express');
const router = require('./routes/router');
// const startServer = require('./Cluster/load');
const morgan = require('morgan');
const start=process.hrtime()




const app = express();
const port = 9000;

app.use(router);


app.use(morgan('combined'))  /// morgan for respones:: get information 

// startServer(app, port);  /// function loadbalance use for cluster management 
const end=process.hrtime(start)

const latencyInMs=end[0]*1000+end[1]/1e6;

console.log(`Latency: ${latencyInMs} ms`)  //check if latency



app.listen(port, () => {
    console.log(`Worker ${process.pid} is running at http://localhost:${port}`);
});
// Start the server using cluster management
// module.exports = app;
