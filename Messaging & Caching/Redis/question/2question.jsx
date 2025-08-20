🔹 Intermediate Redis Questions
1. What are Redis transactions, and how do MULTI/EXEC/DISCARD work?

Redis transactions allow executing a sequence of commands atomically.

MULTI → starts the transaction, queues commands.

EXEC → executes all queued commands.

DISCARD → cancels the transaction.

Redis transactions don’t support rollback (if one fails, others still run).
👉 Used when you need atomic batch execution.

2. What is Redis pipelining, and how does it improve performance?

Normally: client → server → response → next command.

With pipelining: multiple commands are sent at once without waiting for responses, then read all replies together.

Reduces round-trip latency (network overhead).
👉 Example: insert 1000 keys in one round trip instead of 1000 trips.

3. How does Redis clustering work?

Redis Cluster = sharded setup where data is split across nodes.

Uses hash slots (0–16383) → keys are mapped to slots → slots assigned to nodes.

Provides horizontal scaling + high availability.

Supports replication per shard for fault tolerance.
👉 Example: 3 masters + 3 replicas = data distributed + fault recovery.

4. What is Redis Sentinel, and why is it needed?

Redis Sentinel provides high availability for Redis standalone/replicated setups.

Responsibilities:

Monitoring → checks if master is alive.

Failover → promotes a replica to master.

Notification → alerts clients about role changes.

Without Sentinel, if master crashes, system requires manual recovery.

5. How do you implement distributed locking in Redis (SET NX + EX)?

Use SET key value NX EX <time>:

NX → set only if key doesn’t exist (ensures lock).

EX → expiry to avoid deadlocks.

Clients acquire lock → do work → release lock (DEL key).
👉 Prevents multiple processes from modifying same resource.

6. What is Redlock algorithm? Why is it controversial?

Redlock = distributed locking algorithm by Redis creator (Salvatore Sanfilippo).

Works by acquiring locks in majority of Redis nodes (e.g., 3/5) with expiry.

Ensures safety even if some nodes fail.

Controversy: Some researchers argue it doesn’t guarantee strict correctness under network partitions (CAP theorem issues).
👉 In practice: used widely, but consensus-based systems (e.g., ZooKeeper, etcd) are stronger for critical locks.

7. How does Redis handle replication (master-replica setup)?

Redis supports asynchronous replication:

Master → Replicas replicate all writes.

Replicas can serve read queries (scaling reads).

On failover (via Sentinel/Cluster), replica promoted to master.
👉 Limitation: replication lag possible (not strongly consistent).

8. What is the difference between Redis standalone, Sentinel, and Cluster mode?

Standalone → single instance, simple, no HA.

Sentinel → provides HA + auto-failover for master-replica setups.

Cluster → provides HA + auto-sharding + replication for large-scale deployments.

9. What is the difference between lazy expiration and active expiration in Redis?

Lazy expiration → key is deleted only when accessed after expiry. Saves CPU, but memory may grow with expired keys.

Active expiration → Redis randomly samples keys and deletes expired ones periodically. Keeps memory clean.
👉 Redis uses both together for balance.

10. How does Redis Streams differ from Kafka?

Redis Streams:

In-memory, lightweight, built into Redis.

Suitable for smaller event-driven architectures.

Retention is time/size-based, not partition-heavy.

Kafka:

Distributed, disk-based, optimized for very high throughput.

Supports partitions, consumer groups, exactly-once semantics.
👉 Kafka = enterprise-grade event streaming, Redis Streams = lightweight queue/log.

11. What is the difference between Redis pub/sub and Redis streams?

Pub/Sub:

Fire-and-forget.

No message history (missed messages are gone).

Real-time only.

Streams:

Persistent log of events.

Consumers can replay messages from history.

Supports consumer groups.
👉 Streams = durable, replayable; Pub/Sub = ephemeral, real-time.

12. What is the difference between LRU, LFU, and FIFO eviction policies?

LRU (Least Recently Used) → removes keys not accessed recently.

LFU (Least Frequently Used) → removes keys with lowest access frequency.

FIFO (First In First Out) → removes oldest inserted key.
👉 Choice depends on workload: LRU is default, LFU useful for hot-spot caching.