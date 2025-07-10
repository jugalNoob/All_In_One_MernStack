const { hash } = require("bcryptjs")

 1:: static algorithms 

 2::Round Robin algorithms

 3::Round Robin algorithms Demo 

 4::Weighted Round Robin algorithms

 5::Dens Round Robin algorithms

 6::Ip hash algorithms

 7::Url hash algorithms 

 8::Random alloaction 

 9::Dynamic algorithms

 10::Least connection 

 11:Weighted Least connection algorithms

 12::least Respones Time algorithms

 13::Resourse based algorithms

 14Geo loaction based load balancing 

 15::Rate limiting 

 16::session persistence 




 1. Static Algorithms
Definition: Routes traffic based on fixed rules, such as static mapping between client requests and servers.
Use Case: When traffic patterns are predictable and don't change.
Example:
javascript
Copy code
const servers = ["server1", "server2", "server3"];
let serverIndex = 0;
function staticBalancer() {
    return servers[serverIndex];
}
console.log(staticBalancer()); // Always "server1"
2. Round Robin Algorithms
Definition: Distributes requests cyclically across servers.
Use Case: Evenly distributes load when all servers are equally capable.
Example:
javascript
Copy code
const servers = ["server1", "server2", "server3"];
let index = 0;

function roundRobin() {
    const server = servers[index];
    index = (index + 1) % servers.length;
    return server;
}
console.log(roundRobin()); // server1
console.log(roundRobin()); // server2
console.log(roundRobin()); // server3
console.log(roundRobin()); // server1
3. Round Robin Algorithms Demo
Similar to 2, implemented in real scenarios.
4. Weighted Round Robin Algorithms
Definition: Assigns weights to servers based on capacity or performance.
Use Case: Distribute more requests to high-capacity servers.
Example:
javascript
Copy code
const servers = [
    { name: "server1", weight: 3 },
    { name: "server2", weight: 1 },
];
let queue = [];
servers.forEach((server) => queue.push(...Array(server.weight).fill(server.name)));

function weightedRoundRobin() {
    const server = queue.shift();
    queue.push(server); // Reinsert at the end for cyclic rotation.
    return server;
}
console.log(weightedRoundRobin()); // server1
console.log(weightedRoundRobin()); // server1
console.log(weightedRoundRobin()); // server1
console.log(weightedRoundRobin()); // server2
5. Dense Round Robin Algorithms
Definition: Modified round-robin to consider active servers only.
Use Case: Handles dynamic server availability.
6. IP Hash Algorithms
Definition: Maps requests to servers based on client IP.
Use Case: Ensures a client consistently communicates with the same server.
Example:
javascript
Copy code
const servers = ["server1", "server2", "server3"];
function ipHash(ip) {
    const hash = ip.split('.').reduce((sum, num) => sum + parseInt(num), 0);
    return servers[hash % servers.length];
}
console.log(ipHash("192.168.1.1")); // server2
7. URL Hash Algorithms
Definition: Routes requests based on the URL hash.
Use Case: Ensures specific URLs are consistently handled by the same server.
Example:
javascript
Copy code
const servers = ["server1", "server2", "server3"];
function urlHash(url) {
    const hash = url.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return servers[hash % servers.length];
}
console.log(urlHash("/home")); // server2
8. Random Allocation
Definition: Routes requests to random servers.
Use Case: Simple distribution when server capabilities are similar.
Example:
javascript
Copy code
const servers = ["server1", "server2", "server3"];
function randomAllocator() {
    return servers[Math.floor(Math.random() * servers.length)];
}
console.log(randomAllocator()); // Random server
9. Dynamic Algorithms
Definition: Allocates requests based on real-time server load or health.
Use Case: Balances load dynamically.
10. Least Connection
Definition: Routes requests to the server with the fewest active connections.
Use Case: Prevents overloading busy servers.
11. Weighted Least Connection Algorithms
Definition: Combines weights and active connection counts.
Use Case: Advanced load balancing when server capacity varies.
12. Least Response Time Algorithms
Definition: Routes requests to the server with the lowest response time.
Use Case: Improves user experience by reducing latency.
13. Resource-Based Algorithms
Definition: Considers CPU, memory, and other server resources.
Use Case: Optimizes server resource usage.
14. Geo-Location Based Load Balancing
Definition: Routes traffic based on the user's geographic location.
Use Case: Reduces latency and complies with data residency laws.
15. Rate Limiting
Definition: Restricts the number of requests a client can make in a time frame.
Use Case: Protects servers from abuse.
Example:
javascript
Copy code
const rateLimit = {};
const MAX_REQUESTS = 5;

function handleRequest(ip) {
    const now = Date.now();
    if (!rateLimit[ip]) rateLimit[ip] = [];
    rateLimit[ip] = rateLimit[ip].filter((time) => now - time < 60000); // Keep requests within 1 minute.
    if (rateLimit[ip].length < MAX_REQUESTS) {
        rateLimit[ip].push(now);
        return "Request accepted.";
    }
    return "Rate limit exceeded.";
}