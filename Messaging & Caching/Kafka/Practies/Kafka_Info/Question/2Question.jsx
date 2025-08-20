🔹 Intermediate Kafka Questions
1. What is the difference between Kafka Producer acks=0, acks=1, and acks=all?

acks=0 → Producer does not wait for any acknowledgment.

Fastest but risky (messages may be lost).

acks=1 → Producer waits for acknowledgment from the leader only.

Safe if leader is alive, but data may be lost if leader crashes before replication.

acks=all (or -1) → Producer waits for acknowledgment from all ISR (In-Sync Replicas).

Highest durability guarantee, but slower throughput.





2. What is the difference between at-most-once, at-least-once, and exactly-once delivery semantics in Kafka?

At-most-once → Messages may be lost but are never redelivered.

At-least-once → Messages are never lost but may be delivered more than once (duplicates possible).

Exactly-once → Each message is delivered once and only once.

Achieved via idempotent producers + transactions + consumer offset management.





3. How does Kafka handle fault tolerance when a broker crashes?

Partitions are replicated across brokers.

If a broker (leader) crashes:

A new leader is elected from the ISR (in-sync replicas).

Producers/consumers automatically switch to the new leader.

No data is lost if acks=all and replication is properly configured.





4. What is ISR (In-Sync Replica) in Kafka?

ISR = In-Sync Replica set → List of replicas fully caught up with the leader.

Only ISR replicas can become leaders during a failover.

Ensures consistency and durability.




5. How does Kafka handle leader election for partitions?

Each partition has one leader and multiple followers.

ZooKeeper (pre-KRaft) or Raft (KRaft mode) manages leader election.

If a leader fails, a new leader is chosen from the ISR.

Election ensures no partition stays unavailable for long.




6. What is the difference between Kafka Log Compaction and Log Retention?

Log Retention: Deletes old messages after a configured time (retention.ms) or size (retention.bytes).

Example: Keep logs for 7 days.

Log Compaction: Keeps the latest value for each key, deletes older values.

Useful for maintaining the current state (e.g., user profile updates).





7. How does Kafka guarantee ordering of messages?

Ordering is guaranteed within a partition (messages are appended sequentially).

Across partitions, ordering is not guaranteed.

To enforce ordering → use a keyed partitioner, so all messages for the same key go to the same partition.





8. What are Kafka Producer Partitioner strategies?

Round-robin (default, no key): Distributes messages evenly across partitions.

Key-based partitioning: Messages with the same key always go to the same partition (ensures ordering per key).

Custom partitioner: Developer can implement custom logic (e.g., route based on region, customer ID).




9. What is idempotence in Kafka Producers, and why is it important?

Idempotent producer ensures retries don’t cause duplicate messages.

Enabled with enable.idempotence=true.

Producer assigns a unique PID (Producer ID) + sequence numbers.

Broker deduplicates messages based on PID + sequence.

Guarantees exactly-once delivery to a partition (when combined with transactions).





10. What are Kafka Transactions, and how do they ensure exactly-once processing?

Kafka Transactions allow multiple writes (to different partitions/topics) and offset commits to be atomic.

Use case:

Consume → Process → Produce results, while committing offsets in the same transaction.

Ensures:

Either all operations succeed, or none do.

No duplicates, no data loss.

Requires transactional.id in producer config.






11. What’s the role of Kafka Connect?

Kafka Connect is a framework to stream data in/out of Kafka without custom code.

Provides source connectors (pull data from DBs, APIs, etc.) and sink connectors (push to DBs, S3, Elastic, etc.).

Handles offset management, fault tolerance, and scaling automatically.

Example: Use JDBC source to stream from MySQL → Kafka, then S3 sink to push Kafka → S3.





12. What is Kafka Streams, and how does it differ from Flink or Spark Streaming?

Kafka Streams: Lightweight Java library for real-time stream processing directly on Kafka topics.

Runs inside your application (no cluster needed).

Good for per-event processing, joins, aggregations, stateful transformations.

Flink / Spark Streaming: General-purpose stream processing frameworks.

Flink: Low-latency, event-time processing, richer APIs.

Spark Streaming: Micro-batch approach, integrates with Spark ecosystem.

Difference:

Kafka Streams = simpler, embedded in app, great for Kafka-centric workflows.

Flink/Spark = more powerful for cross-system, large-scale analytics.