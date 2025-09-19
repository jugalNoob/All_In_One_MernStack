🔹 3. Advanced Concepts

This is where big tech systems live.

Microservices Architecture – Instead of one large monolithic app, systems are broken into small independent services (auth, payments, orders).
🔹 Example: Amazon runs microservices for product, cart, payment, etc.

Event-Driven Architecture – Services communicate via events instead of direct calls, making the system more decoupled and scalable.
🔹 Example: Uber uses Kafka to stream driver location updates in real time.

Database Scaling –
3.1 Multi-leader replication – multiple DB leaders allow writes in different regions.
3.2 Distributed databases – data is spread globally with automatic sharding and fault tolerance.
🔹 Example: Google Spanner powers Gmail with global consistency.

Distributed Consensus – Algorithms like Raft & Paxos ensure nodes in a cluster agree on state, even if some fail.
🔹 Example: Zookeeper is used in Hadoop & Kafka clusters for leader election.

Caching Strategies – Improves performance by reducing DB calls.

Write-through (cache + DB at same time).

Write-behind (cache first, DB later).

Cache invalidation (removing stale data).
🔹 Example: Reddit uses Redis heavily to handle hot posts & comments.

CQRS (Command Query Responsibility Segregation) – Separate write (commands) and read (queries) models for performance.
🔹 Example: Banking apps use CQRS so money transfers (write-heavy) don’t slow down balance checks (read-heavy).

Event Sourcing – Store every event (e.g., “user deposited $100”) instead of just final state (“balance = $500”).
🔹 Example: Financial systems and audit logs use this.

Real-Time Data Processing – Process data streams live (fraud detection, recommendations).
🔹 Example: Netflix uses Kafka + Flink to recommend shows in real time.

Search Systems – Specialized databases for fast text queries.
🔹 Example: Elasticsearch powers search at LinkedIn and GitHub.

Containerization & Orchestration – Packages apps in containers (Docker) and manages them with orchestration (Kubernetes).
🔹 Example: Spotify runs thousands of microservices on Kubernetes.

High Availability & Fault Tolerance – Redundancy, retries, circuit breakers ensure system keeps working during failures.
🔹 Example: Netflix Chaos Monkey tests this by randomly killing servers.

Rate Limiting & Throttling – Controls how many requests a client can send.
🔹 Example: Twitter API allows only X requests/minute per client.

Data Lakes & Warehousing – Store raw data (lake) and structured analytical data (warehouse).
🔹 Example: Airbnb uses a data lake for logs and Snowflake for BI analytics.

Edge Computing – Move compute closer to users to reduce latency.
🔹 Example: Cloudflare Workers run JavaScript on edge servers worldwide.