const express = require('express');
const cluster = require('cluster');
const os = require('os');

const PORT = 9000;
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`👑 Master PID: ${process.pid}`);
    console.log(`📌 Starting ${numCPUs} workers...\n`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        const worker = cluster.fork();

        // Send initial message to worker
        worker.send({ type: 'init', message: 'Welcome worker!' });
    }

    // Event: 'fork'
    cluster.on('fork', (worker) => {
        console.log(`⚙️  Worker ${worker.process.pid} is being forked`);
    });

    // Event: 'online'
    cluster.on('online', (worker) => {
        console.log(`✅ Worker ${worker.process.pid} is online`);
    });

    // Event: 'listening'
    cluster.on('listening', (worker, address) => {
        console.log(`📡 Worker ${worker.process.pid} is listening on ${address.address}:${address.port}`);
    });

    // Event: 'disconnect'
    cluster.on('disconnect', (worker) => {
        console.log(`❌ Worker ${worker.process.pid} disconnected`);
    });

    // Event: 'error'
    cluster.on('error', (err) => {
        console.error(`💥 Cluster error:`, err);
    });

    // Event: 'exit'
    cluster.on('exit', (worker, code, signal) => {
        console.log(`💀 Worker ${worker.process.pid} exited (code: ${code}, signal: ${signal})`);
        console.log(`🔄 Restarting worker...`);
        cluster.fork();
    });

    // Event: 'message'
    for (const id in cluster.workers) {
        cluster.workers[id].on('message', (msg) => {
            console.log(`📩 Master received message from worker ${id}:`, msg);
        });
    }

} else {
    // Worker code
    const app = express();

    app.get('/', (req, res) => {
        res.send(`Hello from worker PID: ${process.pid}`);
    });

    app.get('/home', (req, res) => {
        res.send(`Home route served by worker PID: ${process.pid}`);
    });

    app.get('/:page', (req, res) => {
        res.send(`Worker ${cluster.worker.id} | PID ${process.pid} handled ${req.path}`);
    });

    // Handle messages from master
    process.on('message', (msg) => {
        console.log(`📩 Worker ${process.pid} got message from master:`, msg);
    });

    // Simulate crash route for testing restart
    app.get('/crash', () => {
        throw new Error(`Simulated crash in worker ${process.pid}`);
    });

    app.listen(PORT, () => {
        console.log(`🚀 Worker ${process.pid} running on port ${PORT}`);
    });
}



/////////// ----------------->> Adavance 2----------------------->>

const express = require('express');
const cluster = require('cluster');
const os = require('os');

const PORT = 9000;
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`👑 Master PID: ${process.pid}`);
    console.log(`📌 Starting ${numCPUs} workers...\n`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        const worker = cluster.fork();

        // Send initial message to worker
        worker.send({ type: 'init', message: 'Welcome worker!' });
    }

    // Event: 'fork'
    cluster.on('fork', (worker) => {
        console.log(`⚙️  Worker ${worker.process.pid} is being forked`);
    });

    // Event: 'online'
    cluster.on('online', (worker) => {
        console.log(`✅ Worker ${worker.process.pid} is online`);
    });

    // Event: 'listening'
    cluster.on('listening', (worker, address) => {
        console.log(`📡 Worker ${worker.process.pid} is listening on ${address.address}:${address.port}`);
    });

    // Event: 'disconnect'
    cluster.on('disconnect', (worker) => {
        console.log(`❌ Worker ${worker.process.pid} disconnected`);
    });

    // Event: 'error'
    cluster.on('error', (err) => {
        console.error(`💥 Cluster error:`, err);
    });

    // Event: 'exit'
    cluster.on('exit', (worker, code, signal) => {
        console.log(`💀 Worker ${worker.process.pid} exited (code: ${code}, signal: ${signal})`);
        console.log(`🔄 Restarting worker...`);
        const newWorker = cluster.fork();
        newWorker.send({ type: 'restarted', message: `Worker restarted after PID ${worker.process.pid}` });
    });

    // Event: 'message'
    for (const id in cluster.workers) {
        cluster.workers[id].on('message', (msg) => {
            console.log(`📩 Master received message from worker ${id}:`, msg);
        });
    }

    // TEST METHODS — Scheduled actions
    setTimeout(() => {
        const [firstWorker] = Object.values(cluster.workers);
        if (firstWorker) {
            console.log(`⚠️ Calling worker.disconnect() for PID ${firstWorker.process.pid}`);
            firstWorker.disconnect();
            console.log(`isConnected():`, firstWorker.isConnected());
            console.log(`isDead():`, firstWorker.isDead());
        }
    }, 15000);

    setTimeout(() => {
        const workersList = Object.values(cluster.workers);
        if (workersList[1]) {
            console.log(`💣 Killing worker PID ${workersList[1].process.pid}`);
            workersList[1].kill('SIGTERM');
        }
    }, 25000);

} else {
    // Worker code
    const app = express();

    app.get('/', (req, res) => {
        res.send(`Hello from worker PID: ${process.pid}`);
    });

    app.get('/home', (req, res) => {
        res.send(`Home route served by worker PID: ${process.pid}`);
    });

    app.get('/:page', (req, res) => {
        res.send(`Worker ${cluster.worker.id} | PID ${process.pid} handled ${req.path}`);
    });

    // Handle messages from master
    process.on('message', (msg) => {
        console.log(`📩 Worker ${process.pid} got message from master:`, msg);
    });

    // Simulate crash route for testing restart
    app.get('/crash', () => {
        throw new Error(`Simulated crash in worker ${process.pid}`);
    });

    app.listen(PORT, () => {
        console.log(`🚀 Worker ${process.pid} running on port ${PORT}`);
    });

    // Log when worker disconnects itself
    process.on('disconnect', () => {
        console.log(`🔌 Worker ${process.pid} has disconnected from master`);
    });
}
