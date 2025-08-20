🔹 Basic Redis Questions
1. What is Redis, and why is it called an in-memory data store?

Redis = Remote Dictionary Server.

It’s an open-source, in-memory key-value data store.

Called "in-memory" because all data is stored in RAM, not on disk, which makes it extremely fast (sub-millisecond latency).

It supports persistence (RDB, AOF) but still keeps primary operations in memory.





2. What are the common use cases for Redis?

Caching → Reduce database load, speed up API responses.

Session store → Store user sessions in web apps.

Pub/Sub messaging → Real-time notifications, chat apps.

Rate limiting → Control API usage per user/IP.

Leaderboards & ranking → Using Sorted Sets.

Real-time analytics → Using Streams and HyperLogLog.

Task queues → With libraries like BullMQ, Celery.






3. What data structures does Redis support?

String → Basic key-value.

List → Ordered collection (push, pop, queue).

Set → Unordered unique elements.

Sorted Set (ZSet) → Ordered elements with scores (leaderboards).

Hash → Store objects (like JSON-like key-value pairs).

Streams → Log-like data structure for event processing.

Bitmaps → Efficient storage for binary data.

HyperLogLog → Probabilistic structure for unique counts.
👉 Redis is more than a cache — it’s a multi-model data store.





4. How does Redis persist data? Explain RDB and AOF.

RDB (Redis Database Snapshot):

Takes snapshots of the dataset at intervals (save command).

Fast for backups, smaller file size.

Risk: may lose data since last snapshot.

AOF (Append Only File):

Logs every write operation.

More durable (can replay logs).

Larger file size, slower than RDB.
👉 Many deployments use RDB + AOF together for balance.




5. What is the difference between Redis as a cache vs. Redis as a database?

As Cache:

Temporary storage layer (close to app).

Data may expire or be evicted (not durable).

Used for speed → sessions, hot data.

As Database:

Persistent storage (RDB/AOF enabled).

Data durability matters.

Used when speed + persistence both needed (IoT, analytics).




6. What is the default eviction policy in Redis?

Default = noeviction → If memory is full, Redis returns an error on writes.

Other policies:

volatile-lru (evict least recently used keys with TTL).

allkeys-lru (evict least recently used keys, any key).

volatile-ttl (evict keys with shortest TTL).

allkeys-random (evict random keys).
👉 You configure with maxmemory-policy.




7. How does Redis handle TTL (time-to-live) for keys?

You can set TTL on keys using EXPIRE key seconds or while setting value (SET key value EX 60).

Redis automatically deletes expired keys:

Lazy expiration → Checked when key is accessed.

Active expiration → Redis scans randomly and deletes expired keys.
👉 Ensures expired keys don’t consume memory.




8. What is Pub/Sub in Redis?

Publish/Subscribe messaging model built into Redis.

Publisher → sends messages to a channel.

Subscribers → receive messages from the channel in real-time.

Example:

PUBLISH news "Breaking news!"

SUBSCRIBE news → will receive "Breaking news!".
👉 Useful for real-time chat apps, notifications, event broadcasting.