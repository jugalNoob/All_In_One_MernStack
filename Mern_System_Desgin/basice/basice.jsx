🔹 1. Basic Concepts (Foundation Layer)

These are the building blocks — you must understand them before moving forward.

Client–Server Model – Clients (browsers, apps) send requests; servers respond with data.
🔹 Example: When you open Facebook, your browser (client) requests data from Facebook’s servers.

HTTP Basics – Defines how clients & servers talk:

Methods: GET, POST, PUT, DELETE.

Headers: extra info (auth, cookies).

Status codes: 200 (OK), 404 (Not Found), 500 (Error).
🔹 Example: REST APIs use HTTP everywhere.

DNS (Domain Name System) – Converts domain names to IP addresses.
🔹 Example: google.com → 142.250.190.14.

Latency vs Throughput –

Latency = speed of response.

Throughput = how many requests handled per second.
🔹 Example: WhatsApp optimizes for low latency in messaging.

Scalability – Ability to handle growth.

Vertical: add more CPU/RAM.

Horizontal: add more servers.
🔹 Example: Instagram scales horizontally with load balancers.

Load Balancing – Distribute requests across servers.
🔹 Example: Amazon ELB balances millions of requests daily.

Caching – Store frequently used data closer to users.

Browser cache

CDN (Cloudflare, Akamai)

Server-side cache (Redis, Memcached).
🔹 Example: Netflix CDN caches movies for faster streaming.

Database Basics –

SQL vs NoSQL

Indexing speeds up queries

Primary vs secondary indexes

Transactions ensure ACID consistency.
🔹 Example: MySQL for transactions, MongoDB for flexible docs.