How it works
Class: Worker
Event: 'disconnect'
Event: 'error'
Event: 'exit'
Event: 'listening'
Event: 'message'
Event: 'online'



worker.disconnect()
worker.exitedAfterDisconnect
worker.id
worker.isConnected()
worker.isDead()
worker.kill([signal])
worker.process
worker.send(message[, sendHandle[, options]][, callback])
Event: 'disconnect'
Event: 'exit'
Event: 'fork'
Event: 'listening'
Event: 'message'
Event: 'online'
Event: 'setup'
cluster.disconnect([callback])
cluster.fork([env])
cluster.isMaster
cluster.isPrimary
cluster.isWorker
cluster.schedulingPolicy
cluster.settings
cluster.setupMaster([settings])
cluster.setupPrimary([settings])
cluster.worker
cluster.workers


2️⃣ Use autocannon or ab for Load Testing
Install autocannon:

npm install -g autocannon

autocannon -c 20 -d 5 http://localhost:9000/



curl --no-keepalive http://localhost:9000/
curl --no-keepalive http://localhost:9000/home
curl --no-keepalive http://localhost:9000/test



Alright — let’s go full throttle on Node.js Cluster — from zero to interview-ready with both basics and advanced internals.
We’ll cover concepts, code, worker lifecycle, events, methods, scaling strategies, pitfalls, and even ASCII diagrams for clarity.

1. What is Node.js Cluster?
Definition: A core module that allows you to create multiple worker processes sharing the same server port.

Why?
Node.js is single-threaded (per process) for JS code, so only one CPU core is used by default.
Cluster allows you to utilize all CPU cores for parallel handling of requests.

2. Key Idea
Master process runs first → spawns Worker processes.

Workers are separate Node.js processes, each with its own event loop, memory, and V8 instance.

All workers share the same TCP port (through the master’s internal round-robin load balancing, except on Windows where OS-level is used).

3. Basic Architecture
vbnet
Copy
Edit
           ┌───────────────────┐
           │   Master Process   │
           │  PID: 1000         │
           └─────────┬─────────┘
                     │ Fork (numCPUs)
    ┌────────────────┼───────────────────┐
    │                │                   │
┌───▼───┐       ┌────▼────┐         ┌────▼────┐
│Worker │       │ Worker  │         │ Worker  │
│PID:1001       │ PID:1002│         │ PID:1003│
└───────┘       └─────────┘         └─────────┘
   |                 |                   |
Handles /, API   Handles /home        Handles /about
4. Basic Example
js
Copy
Edit
const cluster = require('cluster');
const http = require('http');
const os = require('os');

if (cluster.isPrimary) { // Master
    const numCPUs = os.cpus().length;
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) cluster.fork();

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });

} else { // Worker
    http.createServer((req, res) => {
        res.end(`Handled by PID ${process.pid}`);
    }).listen(3000);
    console.log(`Worker ${process.pid} started`);
}
5. Important Cluster Events

| Event        | Emitted By | Purpose                                 |
| ------------ | ---------- | --------------------------------------- |
| `fork`       | Master     | When a new worker is forked             |
| `online`     | Master     | Worker is ready                         |
| `listening`  | Master     | Worker started listening on port        |
| `disconnect` | Both       | Worker disconnected from master         |
| `exit`       | Master     | Worker process exited                   |
| `message`    | Both       | IPC messaging between master and worker |
| `error`      | Both       | Error in worker or master               |




6. Worker Object Methods & Properties
worker.id → Cluster-assigned ID

worker.process → Child process object

Methods:

worker.send(msg) → Send message to worker

worker.disconnect() → Gracefully disconnect

worker.kill(signal) → Force kill

worker.isConnected() / worker.isDead() → Status checks

Properties:

worker.exitedAfterDisconnect → True if exit was due to .disconnect()

7. Communication (IPC)
Master ↔ Workers can send messages using .send():

js
Copy
Edit
// In master
worker.send({ type: 'init', data: 'Hello' });

// In worker
process.on('message', msg => {
    console.log(`Worker got:`, msg);
});
8. Advanced Patterns
A. Sticky Sessions
Needed for WebSocket or session-based apps (same client always goes to same worker).

Implement via nginx or custom cluster load balancer.

B. Graceful Restart
js
Copy
Edit
cluster.on('exit', (worker) => {
    console.log(`Restarting worker ${worker.id}`);
    cluster.fork();
});
C. Zero-Downtime Deploy
Fork new workers → Wait until they’re online → Disconnect old ones.

9. Pros & Cons
✅ Pros:

Uses all CPU cores

Simple scaling inside Node.js

Built-in worker management

⚠️ Cons:

Workers don’t share memory (except via IPC or external store like Redis)

Not suited for heavy inter-process communication

Master is single point of failure

10. ASCII Request Flow
yaml
Copy
Edit
Client → Master → Worker (Round Robin)
          ┌────→ PID: 2001 → Response
          ├────→ PID: 2002 → Response
          ├────→ PID: 2003 → Response
          └────→ PID: 2004 → Response
11. Handling 100K+ Requests/Minute
Use Cluster with numCPUs workers

Add load balancer (Nginx, HAProxy) in front

Use keep-alive connections

Cache frequently accessed data (Redis)

Use async non-blocking code inside workers

If you want, I can now extend your existing cluster code with
✅ all worker methods,
✅ event logging,
✅ graceful shutdown,
✅ zero-downtime restart pattern,
so it’s production-ready.

Do you want me to make that final advanced cluster template?









Ask ChatGPT

