🔹 Basic Kafka Questions


1. What is Apache Kafka, and why is it used?

Apache Kafka is a distributed streaming platform used for building real-time data pipelines and event-driven systems.

It allows applications to publish (produce), subscribe (consume), store, and process streams of records in a fault-tolerant and scalable way.

Why it’s used:

High-throughput & low-latency messaging.

Decouples producers and consumers.

Horizontal scalability (millions of messages/sec).

Persistence of messages (durable log storage).

Widely used for event-driven microservices, analytics, logging, and real-time data streaming.



2. Explain the difference between Kafka, RabbitMQ, and ActiveMQ.

Kafka:

Distributed commit log, designed for high throughput, streaming, and event-driven architectures.

Best for big data, real-time analytics, and event sourcing.

Messages are persisted on disk.

RabbitMQ / ActiveMQ:

Traditional message brokers.

Designed for message queueing (task distribution) with complex routing patterns.

Good for short-lived, transactional messaging.

Key difference:

Kafka = streaming platform (long-term storage + pub/sub).

RabbitMQ/ActiveMQ = queue-based message brokers (point-to-point or pub/sub, but not optimized for huge scale).




3. What are Kafka Topics, Partitions, and Offsets?

Topic: A category/feed name where records are published.

Partition: A topic is split into partitions for scalability & parallelism. Each partition is an ordered, immutable log.

Offset: A unique sequential ID assigned to each record within a partition. Consumers track offsets to know their position in the log.

📌 Example: Topic orders with 3 partitions → messages distributed across P0, P1, P2. Each partition has its own offsets (0,1,2...).







4. What is a Producer and a Consumer in Kafka?

Producer: Publishes data (messages) to Kafka topics. Can decide which partition to send to (by key or round-robin).

Consumer: Subscribes to one or more topics, reads records in order per partition. Keeps track of its offset.




5. What is a Consumer Group in Kafka, and why is it important?

A Consumer Group is a set of consumers working together to consume data from a topic.

Kafka ensures each partition is consumed by exactly one consumer in the group.

Importance:

Enables parallel processing (multiple consumers across partitions).

Provides fault tolerance (if one consumer fails, others take over).

Useful for scaling — add more consumers to process more data.




6. What is a Kafka Broker?

A broker is a Kafka server that stores data and serves clients (producers & consumers).

A cluster typically has multiple brokers:

Each broker handles a set of partitions.

Producers send messages to brokers, consumers read from them.

One broker acts as the controller (manages partition leadership & metadata).




7. What is ZooKeeper’s role in Kafka (and how does KRaft mode remove it)?

ZooKeeper’s role (pre-Kafka 2.8):

Manages metadata (brokers, topics, partitions).

Handles leader election for partitions.

Tracks cluster membership (which brokers are alive).

KRaft mode (Kafka Raft Metadata mode, Kafka 2.8+):

Removes ZooKeeper dependency.

Uses Raft consensus algorithm for metadata management.

Simplifies deployment, improves scalability, and unifies architecture.





8. How does Kafka achieve durability and reliability?

Durability:

Messages are written to disk (commit log).

Replication across multiple brokers.

Reliability:

Acks from brokers (acks=1, acks=all) ensure data safety.

If one broker fails, replicas ensure data isn’t lost.

ISR (In-Sync Replica) list guarantees data consistency.

Kafka is fault-tolerant, ensuring “at least once” delivery (configurable to “exactly once”).