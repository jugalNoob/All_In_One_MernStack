🔹 Advanced Redis Questions
1. How does Redis achieve high performance (event loop, single-threaded model)?

Redis is single-threaded (per process) but extremely fast because:

Uses epoll/kqueue event loop (non-blocking I/O).

In-memory data structures → O(1)/O(logN) operations.

Avoids context-switching overhead of multi-threading.

Network I/O handled asynchronously.

Redis 6+ introduced I/O threading for networking, but command execution is still single-threaded.
👉 This design minimizes race conditions and makes Redis predictable under load.





2. What are Redis modules (e.g., RedisJSON, RedisSearch, RedisBloom)?

Redis modules extend Redis beyond basic key-value store:

RedisJSON → store/query JSON documents (NoSQL-like).

RedisSearch → full-text search, secondary indexing.

RedisBloom → probabilistic data structures (Bloom filters, Count-Min sketch).

RedisTimeSeries → optimized for time-series data.
👉 Modules turn Redis into a multi-model database while keeping high performance.





3. How do you implement a rate limiter in Redis?

Common approaches:

Fixed Window Counter → INCR a key with expiry → block if exceeds limit.

Sliding Window / Leaky Bucket → use sorted sets (timestamps) to track requests within time window.
👉 Example:

INCR user:123:requests
EXPIRE user:123:requests 60


Limits user 123 to N requests per 60s.
👉 Used for API rate limiting, login protection, DDoS prevention.




4. How would you implement a leaderboard using Redis Sorted Sets?

Use Sorted Set (ZSET) where:

Member = userId

Score = points/rank

Commands:

ZADD leaderboard 100 user1 → add/update score.

ZRANGE leaderboard 0 9 WITHSCORES → top 10 players.

ZREVRANK leaderboard user1 → rank of user.
👉 Sorted Sets = perfect for gaming leaderboards, trending items, top-N queries.




5. How do you monitor Redis performance (latency, memory fragmentation, cache hit ratio)?

Tools:

INFO command → stats about memory, clients, hits/misses.

MONITOR → logs all commands (debugging).

redis-cli --latency → track latency.

Memory fragmentation ratio → reported by INFO memory (used_memory_rss / used_memory).

Cache hit ratio → keyspace_hits / (keyspace_hits+keyspace_misses).

External: RedisInsight, Prometheus + Grafana.




6. How do you handle cache stampede in Redis?

Cache stampede = when many requests hit DB because cache expired. Solutions:

Mutex lock → first request regenerates cache, others wait.

Cache pre-warming → refresh cache proactively.

Staggered TTL → add randomness to expiry times to avoid mass expiry.

Read-through / Write-through caching → keep cache always updated automatically.




7. What is the difference between cold cache, warm cache, and cache-aside strategies?

Cold cache → cache starts empty → high DB load until warmed.

Warm cache → cache pre-populated before use → fast from start.

Cache-aside (lazy loading):

App checks cache → if miss → fetch DB → write to cache.

Most common in Redis.
👉 Example: use cache-aside for DB queries, write-through for real-time consistency.




8. How does Redis handle persistence + HA in Kubernetes or cloud environments?

Persistence:

RDB snapshots or AOF logs stored in PVCs (Persistent Volumes).

HA:

Redis Sentinel or Redis Cluster for failover.

Cloud providers (AWS Elasticache, GCP Memorystore, Azure Cache) offer managed HA.

Kubernetes:

StatefulSets + Helm charts (Bitnami/Redis Operator).

Pod disruption budgets + anti-affinity rules for node failure handling.





9. What are Redis transactions vs Lua scripting – when to use which?

Transactions (MULTI/EXEC) → batch of commands executed sequentially. No rollback.

Lua scripting (EVAL) → run custom logic atomically on Redis server.

Eliminates round-trips.

Useful for complex operations (e.g., conditional updates, distributed locks).
👉 Use Lua when you need atomic + custom logic in one execution.




10. How would you debug and fix a Redis OOM command not allowed error?

Happens when:

Redis reaches maxmemory and eviction policy doesn’t allow more inserts.

Fixes:

Check memory via INFO memory.

Set eviction policy (maxmemory-policy allkeys-lru etc.).

Increase memory limit.

Optimize data structures (use Hashes for small objects, compression).
👉 Example: In caching mode, set allkeys-lru so Redis evicts least-used keys instead of throwing OOM.

✅ That’s a solid Advanced Redis set — covers performance internals, scaling, HA, cache patterns, debugging.


::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


Design a Redis caching layer for a Node.js API that handles 50k requests/min.

Which cache invalidation strategy would you choose?

How would you prevent stale data?

How would you use Redis to store session data for millions of users?

How would you design a Redis pub/sub system for sending live notifications?

How do you design a Redis cluster for high availability and partition tolerance?

If Redis crashes, what happens to the data? How do you make it durable?

How would you design a real-time chat app using Redis pub/sub vs Redis streams?

If you have a 10GB dataset but Redis memory is only 4GB, what’s your approach?

How do you prevent race conditions when multiple clients update the same key?

What happens if Redis replication lags behind? How do you handle consistency?

How do you design a Redis + Kafka pipeline for real-time event processing?