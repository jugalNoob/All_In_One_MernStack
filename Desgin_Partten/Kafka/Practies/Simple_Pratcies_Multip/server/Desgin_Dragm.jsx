       ┌──────────────┐
       │   Producer   │
       │ (Node.js)    │
       └─────┬────────┘
             │   🔑 key: email
             ▼
       ┌────────────────────────────┐
       │   Kafka Topic: signUp_user │
       └────────────────────────────┘
         │        │         │
         ▼        ▼         ▼
 Partition 0  Partition 1  Partition 2
     │            │           │
     ▼            ▼           ▼
 ┌────────┐  ┌────────┐  ┌────────┐
 │Consumer│  │Consumer│  │Consumer│
 │ Group  │  │ Group  │  │ Group  │
 └────────┘  └────────┘  └────────┘




 ╔══════════════════════════════╗
║       REST API (Node.js)     ║
║    POST /signup (Express)    ║
╚══════════════════════════════╝
              │
              ▼
╔══════════════════════════════╗
║     Kafka Producer (email)   ║
║     ─ key = user.email       ║
╚══════════════════════════════╝
              │
              ▼
╔═════════════════════════════════════════════╗
║         Kafka Topic: signUp_user            ║
║         (3 Partitions: 0, 1, 2)             ║
╠═════════════════════════════════════════════╣
║  ┌────────────┐  ┌────────────┐  ┌────────────┐
║  │ Partition 0│  │ Partition 1│  │ Partition 2│
║  └────┬───────┘  └────┬───────┘  └────┬───────┘
║       │               │               │
║       ▼               ▼               ▼
║  ┌──────────┐   ┌──────────┐   ┌──────────┐
║  │ Consumer │   │ Consumer │   │ Consumer │
║  │ Group    │◄──┼─ signup-group ─┼──► Shared work
║  └──────────┘   └──────────┘   └──────────┘
╚═════════════════════════════════════════════╝


🚀 Real-World Scale Planning (10K–20K Requests/Min)

| Layer          | Optimizations                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| **Producer**   | ✅ Use `async` non-blocking producer (already using) <br> ✅ Scale horizontally (multiple Node.js API instances) |
| **Kafka**      | ✅ Use replication, increase broker count <br> ✅ Tune partitions (3–6 or more depending on consumers)           |
| **Consumer**   | ✅ Use a **consumer group** (already done) <br> ✅ Add more consumer instances to process in parallel            |
| **Throughput** | With proper infra, Kafka handles **100K+ msgs/sec** easily                                                     |




Producer (key = email)
        │
        ▼
 Kafka Topic (3 partitions)
        │
        ▼
Kafka decides partition using hash(email) % 3
        │
        ▼
Assigned to Partition [0,1,2]
        │
        ▼
Consumer Group "signup-group"
Kafka assigns each partition to 1 consumer in the group



Great — we’ll explore multiple scalable architecture examples tomorrow that can handle:

✅ 10,000+ req/min at the API layer (Node.js clustering, Nginx, PM2, etc.)

✅ 50,000+ req/min to MongoDB (replica sets, sharding, indexing)

✅ 100,000+ messages/min in Kafka (partitioning, consumer scaling, batching)

We'll also compare:

Kafka vs Redis Streams vs RabbitMQ

MongoDB vs PostgreSQL vs Cassandra

Options like load balancing, autoscaling, stream processors (e.g. Kafka Streams, Apache Flink)

Let me know if you also want:

Deployment (Docker + Kubernetes)

Monitoring stack (Prometheus + Grafana)

Cloud setup (AWS, GCP, Azure)