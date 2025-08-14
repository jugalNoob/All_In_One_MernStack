const express = require('express');
const app = express();
const port = 9000;

const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    console.log(`Master process PID: ${process.pid}`);
    console.log(`Forking ${numCPUs} workers...\n`);

    // Create workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Restart worker if it dies
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
} else {
    // Worker process runs the server
    app.get('/', (req, res) => {
        res.send(`Hello from worker ${process.pid}`);
    });

        app.get('/home', (req, res) => {
        res.send(`Hello from worker ${process.pid}`);
    });


    app.get('/:page', (req, res) => {
    res.send(`Worker ${cluster.worker.id} | PID ${process.pid} handled ${req.path}`);
});



    app.listen(port, () => {
        console.log(`Worker ${process.pid} running on port ${port}`);
    });
}
